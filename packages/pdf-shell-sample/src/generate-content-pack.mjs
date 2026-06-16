/**
 * Content pack generator — reads a JSON manifest and renders a multi-page PDF.
 *
 * Page structure:
 *   Page 1:  Cover     — split-panel: black left column (title + statement) + photo right column
 *   Page 2:  Intro     — how to use, fill-ins, Identity Kit note
 *   Pages 3+: Flow     — all categories and templates flowing continuously without forced page
 *                        breaks. Category strips are inline dividers. @react-pdf paginates
 *                        naturally so pages stay dense with no blank space at the bottom.
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
const pack = JSON.parse(readFileSync(manifestPath, 'utf8'))

const outDir = join(__dirname, '..', 'output')
const outFile = join(outDir, `${pack.slug}-v${pack.version}.pdf`)

// Cover photo — placeholder lifestyle image. Replace with a pack-specific asset
// by adding "coverPhoto": "path/to/image.jpg" to the manifest.
const DEFAULT_COVER_PHOTO = join(repoRoot, 'public', 'pdf-assets', 'cafe-photos-collage-sample.png')
const coverPhotoPath = pack.coverPhoto
  ? join(__dirname, '..', pack.coverPhoto)
  : DEFAULT_COVER_PHOTO

// ─── Colors ───────────────────────────────────────────────────────────────────

const CATEGORY_BAND_COLORS = [
  BRAND_PDF_PARENT_UI.gray900,
  BRAND_PDF_PARENT_UI.gray700,
  BRAND_PDF_PARENT_UI.gray600,
  BRAND_PDF_PARENT_UI.gray500,
  BRAND_PDF_PARENT_UI.gray900,
  BRAND_PDF_PARENT_UI.gray700,
]

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

  // Full-width image — fills the rest of the cover page
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
  // White section below — grows to fill remaining height between panel and footer.
  introInstructionsSection: {
    flex: 1,
    paddingHorizontal: 44,
    paddingTop: 22,
    paddingBottom: 8,
  },
  // Instruction blocks — no border, generous padding lets the small-caps
  // label do the structural work on its own.
  introInstructionBlock: {
    paddingTop: 20,
    paddingBottom: 20,
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
    marginTop: 16,
  },
  categoryStripNum: {
    fontSize: 6.5,
    fontFamily: 'Inter',
    fontWeight: 700,
    letterSpacing: 1.2,
    color: 'rgba(255,255,255,0.4)',
    width: 22,
    flexShrink: 0,
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
    fontSize: 8,
    fontFamily: 'Inter',
    fontWeight: 300,
    fontStyle: 'italic',
    lineHeight: 1.5,
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

function IntroPage() {
  const hookParas = pack.intro.openingHook.split('\n\n')

  return h(
    Page,
    { size: 'LETTER', style: S.page },

    // Dark editorial panel — para 1 at regular size sets up the scene;
    // para 2 sentences stack large as the visual peak; para 3 drops to
    // small muted Inter as the informational description.
    h(
      View,
      { style: S.introHookPanel },
      ...hookParas.map((para, i) => {
        const isLast = i === hookParas.length - 1
        if (isLast) {
          return h(Text, { key: `hook-${i}`, style: S.introHookParaDesc }, para)
        }
        if (para.includes('\n')) {
          // Sentence-stack: each \n-separated line gets its own large Text
          const lines = para.split('\n')
          return h(View, { key: `hook-${i}`, style: S.introHookStack },
            ...lines.map((line, li) =>
              h(Text, { key: li, style: S.introHookStackLine }, line),
            ),
          )
        }
        return h(Text, { key: `hook-${i}`, style: S.introHookPara }, para)
      }),
    ),

    // White instructions section — flex: 1 fills remaining height above footer
    h(
      View,
      { style: S.introInstructionsSection },
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

    h(PageFooterChrome),
  )
}

/**
 * All categories and templates in a single continuously paginated section.
 * No forced page breaks — @react-pdf fills each physical page as densely
 * as content allows. Category strips are inline visual dividers only.
 */
function TemplateFlowSection() {
  let globalNum = 0

  return h(
    Page,
    { size: 'LETTER', style: S.page },

    ...pack.categories.flatMap((cat, catIdx) => {
      const bandColor = CATEGORY_BAND_COLORS[catIdx % CATEGORY_BAND_COLORS.length]

      const header = h(
        View,
        { key: `hdr-${cat.id}`, wrap: false },
        h(
          View,
          { style: [S.categoryStrip, { backgroundColor: bandColor }] },
          h(Text, { style: S.categoryStripNum }, padNum(catIdx + 1)),
          h(Text, { style: S.categoryStripTitle }, cat.title.toUpperCase()),
        ),
        h(Text, { style: S.categoryDesc }, cat.description),
      )

      const rows = cat.templates.map((template) => {
        globalNum += 1
        const num = globalNum
        // Number is an inline span inside the same Text element — the two
        // can never be separated across a physical page boundary, and no
        // wrap: false is needed (so the page fills as densely as possible).
        const parts = template.text.split(/(\[[^\]]+\])/)
        return h(
          View,
          { key: template.id, style: S.templateBlock },
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

      return [header, ...rows]
    }),

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
    h(TemplateFlowSection),
  )
}

// ─── Render ───────────────────────────────────────────────────────────────────

registerBrandPdfFonts()
const buf = await renderToBuffer(h(ContentPackDocument))
mkdirSync(outDir, { recursive: true })
writeFileSync(outFile, buf)
console.log(`Wrote ${outFile}`)
