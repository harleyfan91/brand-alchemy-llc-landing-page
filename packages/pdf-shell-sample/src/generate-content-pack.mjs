/**
 * Content pack generator — reads a JSON manifest and renders a multi-page PDF.
 *
 * Page structure:
 *   Page 1:  Cover
 *   Page 2:  Intro     — hook + how-to (own page)
 *   Page 3+: Templates — categories + captions (continuous flow)
 *
 * Usage:
 *   node src/generate-content-pack.mjs [pack-slug]
 *   node src/generate-content-pack.mjs social-content-pack   (default)
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { createElement as h } from 'react'

import { BRAND_PDF_PARENT_UI } from '@brand-alchemy/pdf-layout-primitives'
import {
  BRAND_PDF_COLORS,
  PageFooterChrome,
  pdfPageBottomPadding,
  registerBrandPdfFonts,
} from '@identity-kit/pdf-chrome'

// ─── Setup ────────────────────────────────────────────────────────────────────

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..', '..', '..')
const identityKitRoot = join(repoRoot, '..', 'identity-kit')
const reactPdfEntry = join(identityKitRoot, 'node_modules/@react-pdf/renderer/lib/react-pdf.js')

const { renderToBuffer, Document, Image, Page, Text, View, StyleSheet } = await import(
  pathToFileURL(reactPdfEntry).href
)

const packSlug = process.argv[2] ?? 'social-content-pack'
const manifestPath = join(__dirname, '..', 'content', `${packSlug}.json`)
const socialIntroPath = join(__dirname, '..', 'content', 'shared', 'social-pack-intro.json')

function loadPack() {
  const raw = JSON.parse(readFileSync(manifestPath, 'utf8'))
  const isSocial =
    raw.packType === 'social' || String(raw.slug ?? '').startsWith('social-content-pack')
  if (!isSocial) return raw

  const sharedIntro = JSON.parse(readFileSync(socialIntroPath, 'utf8'))
  return {
    ...raw,
    intro: {
      ...raw.intro,
      hookStack: sharedIntro.hookStack,
      hookPivot: sharedIntro.hookPivot,
    },
  }
}

const pack = loadPack()

const outDir = join(__dirname, '..', 'output')
const outFile = join(outDir, `${pack.slug}.pdf`)

// Cover photo — placeholder lifestyle image. Replace with a pack-specific asset
// by adding "coverPhoto": "path/to/image.jpg" to the manifest.
const DEFAULT_COVER_PHOTO = join(repoRoot, 'public', 'pdf-assets', 'cafe-photos-collage-sample.png')
const coverPhotoPath = pack.coverPhoto
  ? join(__dirname, '..', pack.coverPhoto)
  : DEFAULT_COVER_PHOTO

// ─── Colors ───────────────────────────────────────────────────────────────────

const CATEGORY_BAND_COLORS = BRAND_PDF_PARENT_UI.navSegmentRamp

// ─── Styles ───────────────────────────────────────────────────────────────────

// Cover: text panel on top (~148pt), image fills the remaining page height.
const COVER_TOP_H = 148
const COVER_IMAGE_H = 792 - COVER_TOP_H  // 644pt — large, dominant

const S = StyleSheet.create({
  page: {
    paddingTop: 0,
    paddingHorizontal: 0,
    paddingBottom: pdfPageBottomPadding,
    fontFamily: 'Inter',
    fontWeight: 300,
  },

  // ── Cover ─────────────────────────────────────────────────────────────────

  // Top text panel: white background, all cover text
  coverPanel: {
    height: COVER_TOP_H,
    paddingHorizontal: 44,
    paddingTop: 28,
    paddingBottom: 18,
    justifyContent: 'space-between',
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E7',
  },
  coverEyebrow: {
    fontSize: 6.5,
    fontFamily: 'Inter',
    fontWeight: 700,
    letterSpacing: 2.2,
    color: BRAND_PDF_COLORS.subText,
  },
  coverTitle: {
    fontSize: 26,
    fontFamily: 'Source Serif 4',
    fontWeight: 400,
    color: BRAND_PDF_COLORS.black,
    lineHeight: 1.12,
  },
  coverStatement: {
    fontSize: 10.5,
    fontFamily: 'Source Serif 4',
    fontWeight: 400,
    fontStyle: 'italic',
    color: BRAND_PDF_COLORS.bodyText,
    lineHeight: 1.45,
  },

  // Full-width image — fills the rest of the cover page (612×644pt; crop assets to match)
  coverImage: {
    width: 612,
    height: COVER_IMAGE_H,
    objectFit: 'cover',
    objectPosition: 'center',
  },

  // ── Intro page ─────────────────────────────────────────────────────────────

  // Dark editorial panel — occupies the top portion of the page.
  // The hard zone change (dark → white) replaces the need for a divider.
  introHookPanel: {
    paddingHorizontal: 44,
    paddingTop: 52,
    paddingBottom: 44,
    backgroundColor: '#111111',
  },
  // Regular hook paragraph — setup / context. Slightly smaller and muted
  // so the stacked sentences below read as the visual peak.
  introHookPara: {
    fontSize: 16,
    fontFamily: 'Source Serif 4',
    fontWeight: 400,
    color: 'rgba(255,255,255,0.82)',
    lineHeight: 1.65,
    marginBottom: 26,
  },
  // Sentence-stack block wrapper — holds the stacked single-line sentences.
  introHookStack: {
    marginBottom: 26,
  },
  // Each stacked sentence: large, full white, tight leading.
  // At 25pt, short sentences (≤ ~28 chars) each fall on their own line.
  introHookStackLine: {
    fontSize: 25,
    fontFamily: 'Source Serif 4',
    fontWeight: 400,
    color: '#FFFFFF',
    lineHeight: 1.28,
  },
  // Pivot line after the stack — same scale, Inter for contrast; marginTop ≈ one stack line.
  introHookStackPivot: {
    fontSize: 25,
    fontFamily: 'Inter',
    fontWeight: 300,
    color: '#FFFFFF',
    lineHeight: 1.28,
    marginTop: 32,
  },
  // Final paragraph: the solution. Prominent serif — a second focal point
  // after the stacked problem sentences. Generous marginTop signals the pivot.
  introHookParaDesc: {
    fontSize: 17,
    fontFamily: 'Source Serif 4',
    fontWeight: 400,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 1.65,
    marginTop: 32,
  },
  // White section below — instructions only.
  introInstructionsSection: {
    paddingHorizontal: 44,
    paddingTop: 22,
    paddingBottom: 0,
  },
  // Instruction blocks — no border, generous padding lets the small-caps
  // label do the structural work on its own.
  introInstructionBlock: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  introLabel: {
    fontSize: 6.5,
    fontFamily: 'Inter',
    fontWeight: 700,
    letterSpacing: 1.6,
    color: BRAND_PDF_COLORS.subText,
    marginBottom: 8,
  },
  introBody: {
    fontSize: 10.5,
    fontFamily: 'Inter',
    fontWeight: 300,
    lineHeight: 1.72,
    color: BRAND_PDF_COLORS.bodyText,
  },

  // ── Category header strips (inline dividers within the flow) ───────────────

  categoryStrip: {
    paddingHorizontal: 44,
    paddingTop: 11,
    paddingBottom: 11,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categorySectionGap: {
    height: 16,
  },
  categoryStripTitle: {
    fontSize: 8.5,
    fontFamily: 'Inter',
    fontWeight: 700,
    letterSpacing: 1.1,
    color: '#FFFFFF',
    flex: 1,
  },
  categoryDesc: {
    paddingHorizontal: 44,
    paddingTop: 6,
    paddingBottom: 10,
    fontSize: 9.5,
    fontFamily: 'Inter',
    fontWeight: 300,
    fontStyle: 'italic',
    lineHeight: 1.55,
    color: BRAND_PDF_COLORS.subText,
  },

  // ── Template blocks ─────────────────────────────────────────────────────────

  // Single View per template — no flex row. Number is an inline span within
  // the Text so the number and text are always in the same element and can
  // never be split across a physical page boundary.
  templateBlock: {
    paddingHorizontal: 44,
    paddingTop: 9,
    paddingBottom: 9,
  },
  templateText: {
    fontSize: 10.5,
    fontFamily: 'Inter',
    fontWeight: 300,
    lineHeight: 1.66,
    color: BRAND_PDF_COLORS.black,
  },
  templateNumInline: {
    fontSize: 7.5,
    fontFamily: 'Inter',
    fontWeight: 700,
    letterSpacing: 0.3,
    color: BRAND_PDF_COLORS.subText,
  },
  templateFill: {
    fontFamily: 'Inter',
    fontWeight: 700,
    color: BRAND_PDF_COLORS.black,
  },
})

// ─── Helpers ──────────────────────────────────────────────────────────────────

function padNum(n) {
  return String(n).padStart(2, '0')
}

// ─── Pages ────────────────────────────────────────────────────────────────────

function CoverPage() {
  const templateCount = pack.categories.reduce((n, c) => n + c.templates.length, 0)
  const statement =
    pack.coverStatement ?? `${templateCount} captions. No marketing vocabulary required.`

  return h(
    Page,
    { size: 'LETTER', style: [S.page, { paddingBottom: 0 }] },

    // Text panel — top of page, white background
    h(
      View,
      { style: S.coverPanel },
      h(Text, { style: S.coverEyebrow }, 'BRAND ALCHEMY'),
      h(Text, { style: S.coverTitle }, pack.title),
      h(Text, { style: S.coverStatement }, statement),
    ),

    // Image — full width, fills the rest of the page
    h(Image, { src: coverPhotoPath, style: S.coverImage }),
  )
}

function IntroHookPanel() {
  const { hookStack, hookPivot, hookDescription, openingHook } = pack.intro

  if (hookStack?.length && hookDescription) {
    return h(
      View,
      { key: 'intro-hook', style: S.introHookPanel },
      h(View, { key: 'hook-stack', style: { marginBottom: 0 } },
        ...hookStack.map((line, i) =>
          h(Text, { key: `stack-${i}`, style: S.introHookStackLine }, line),
        ),
      ),
      hookPivot
        ? h(Text, { key: 'hook-pivot', style: S.introHookStackPivot }, hookPivot)
        : null,
      h(Text, { key: 'hook-desc', style: S.introHookParaDesc }, hookDescription),
    )
  }

  const hookParas = openingHook.split('\n\n')

  return h(
    View,
    { key: 'intro-hook', style: S.introHookPanel },
    ...hookParas.map((para, i) => {
      const isLast = i === hookParas.length - 1
      if (isLast) {
        return h(Text, { key: `hook-${i}`, style: S.introHookParaDesc }, para)
      }
      if (para.includes('\n')) {
        const lines = para.split('\n')
        return h(View, { key: `hook-${i}`, style: S.introHookStack },
          ...lines.map((line, li) =>
            h(Text, { key: li, style: S.introHookStackLine }, line),
          ),
        )
      }
      return h(Text, { key: `hook-${i}`, style: S.introHookPara }, para)
    }),
  )
}

function IntroContent() {
  return [
    IntroHookPanel(),
    h(
      View,
      { key: 'intro-instructions', style: S.introInstructionsSection },
      h(View, { style: S.introInstructionBlock },
        h(Text, { style: S.introLabel }, 'HOW TO USE IT'),
        h(Text, { style: S.introBody }, pack.intro.howToUse),
      ),
      h(View, { style: S.introInstructionBlock },
        h(Text, { style: S.introLabel }, 'FILL-INS'),
        h(Text, { style: S.introBody }, pack.intro.fillInNote),
      ),
      h(View, { style: S.introInstructionBlock },
        h(Text, { style: S.introLabel }, 'IF YOU HAVE AN IDENTITY KIT'),
        h(Text, { style: S.introBody }, pack.intro.identityKitNote),
      ),
    ),
  ]
}

/**
 * Intro on its own page (page 2) — hook + how-to instructions.
 */
function IntroPage() {
  return h(
    Page,
    { size: 'LETTER', style: S.page },
    ...IntroContent(),
    h(PageFooterChrome),
  )
}

function CategoryBlocks() {
  let globalNum = 0

  return pack.categories.flatMap((cat, catIdx) => {
    const bandColor = CATEGORY_BAND_COLORS[catIdx % CATEGORY_BAND_COLORS.length]

    const header = [
      catIdx > 0 ? h(View, { key: `gap-${cat.id}`, style: S.categorySectionGap }) : null,
      h(
        View,
        { key: `strip-${cat.id}`, style: [S.categoryStrip, { backgroundColor: bandColor }], wrap: false },
        h(Text, { style: S.categoryStripTitle }, cat.title.toUpperCase()),
      ),
      h(Text, { key: `desc-${cat.id}`, style: S.categoryDesc }, cat.description),
    ]

    const rows = cat.templates.map((template) => {
      globalNum += 1
      const num = globalNum
      const parts = template.text.split(/(\[[^\]]+\])/)
      return h(
        View,
        { key: `${cat.id}-${template.id}`, style: S.templateBlock },
        h(
          Text,
          { style: S.templateText },
          h(Text, { style: S.templateNumInline }, padNum(num) + '   '),
          ...parts.map((part, i) =>
            part.startsWith('[') && part.endsWith(']')
              ? h(Text, { key: i, style: S.templateFill }, part)
              : part,
          ),
        ),
      )
    })

    return [...header, ...rows]
  })
}

/**
 * Templates on a separate page (page 3+) so the first category band starts flush
 * at the top — avoids dead space from intro pagination + wrap:false headers.
 */
function TemplatesFlowPage() {
  return h(
    Page,
    { size: 'LETTER', style: S.page },
    ...CategoryBlocks(),
    h(PageFooterChrome),
  )
}

// ─── Document ─────────────────────────────────────────────────────────────────

function ContentPackDocument() {
  return h(
    Document,
    { title: `Brand Alchemy — ${pack.title}` },
    h(CoverPage),
    h(IntroPage),
    h(TemplatesFlowPage),
  )
}

// ─── Render ───────────────────────────────────────────────────────────────────

registerBrandPdfFonts()
const buf = await renderToBuffer(h(ContentPackDocument))
mkdirSync(outDir, { recursive: true })
writeFileSync(outFile, buf)
console.log(`Wrote ${outFile}`)
