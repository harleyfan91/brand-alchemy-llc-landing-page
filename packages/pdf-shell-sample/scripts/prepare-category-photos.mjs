/**
 * Build portrait category photos for social content pack PDFs.
 *
 * - 480×720 JPEG (2:3), cover-cropped — matches sidebar slot in generate-content-pack.mjs
 * - Quality steps down to stay under 120 KB per asset (keeps PDF lean)
 * - Café: mostly identity-kit moodboard bank masters (re-cropped)
 * - Salon: curated Unsplash portrait sources (bank gap)
 *
 * Usage (from repo root):
 *   npm run prepare:category-photos --workspace=@brand-alchemy/pdf-shell-sample
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..', '..', '..')
const identityKitBankDir = join(repoRoot, '..', 'identity-kit', 'packages', 'generation', 'dev', 'image-bank', 'assets')

const manifest = JSON.parse(readFileSync(join(__dirname, 'category-photo-sources.json'), 'utf8'))
const { widthPx, heightPx, maxBytes, jpegQualityStart, jpegQualityMin, jpegQualityStep } = manifest.spec

async function loadSourceBuffer(entry) {
  if (entry.bankAsset) {
    const bankPath = join(identityKitBankDir, `${entry.bankAsset}.jpg`)
    return readFileSync(bankPath)
  }
  if (entry.sourceUrl) {
    const res = await fetch(entry.sourceUrl)
    if (!res.ok) throw new Error(`Fetch failed ${res.status}: ${entry.sourceUrl}`)
    return Buffer.from(await res.arrayBuffer())
  }
  throw new Error('Category entry needs bankAsset or sourceUrl')
}

async function encodePortraitJpeg(input) {
  const base = sharp(input, { failOn: 'none' })
    .rotate()
    .resize(widthPx, heightPx, { fit: 'cover', position: 'centre' })

  for (let quality = jpegQualityStart; quality >= jpegQualityMin; quality -= jpegQualityStep) {
    const buffer = await base
      .clone()
      .jpeg({
        quality,
        progressive: true,
        chromaSubsampling: '4:2:0',
        mozjpeg: true,
      })
      .toBuffer()

    if (buffer.length <= maxBytes) {
      return { buffer, quality, bytes: buffer.length }
    }
  }

  throw new Error(`Could not compress under ${Math.round(maxBytes / 1024)} KB`)
}

const report = []

for (const [packKey, pack] of Object.entries(manifest.packs)) {
  const outDir = join(repoRoot, pack.outputDir)
  mkdirSync(outDir, { recursive: true })

  for (const [categoryId, entry] of Object.entries(pack.categories)) {
    const input = await loadSourceBuffer(entry)
    const { buffer, quality, bytes } = await encodePortraitJpeg(input)
    const outFile = join(outDir, `${categoryId}.jpg`)
    writeFileSync(outFile, buffer)
    report.push({
      pack: packKey,
      categoryId,
      file: join(pack.outputDir, `${categoryId}.jpg`),
      kb: Math.round(bytes / 1024),
      quality,
    })
    console.log(`${packKey}/${categoryId}.jpg — ${Math.round(bytes / 1024)} KB · q${quality}`)
  }
}

const reportPath = join(__dirname, 'category-photo-report.json')
writeFileSync(reportPath, JSON.stringify({ generatedAt: new Date().toISOString(), assets: report }, null, 2))
console.log(`\nWrote ${report.length} assets. Report: ${reportPath}`)
