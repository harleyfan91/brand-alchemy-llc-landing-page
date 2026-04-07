/**
 * Loads @react-pdf/renderer from the sibling identity-kit install so Font.register (inside
 * @identity-kit/pdf-chrome) and renderToBuffer share one module instance.
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { createElement as h } from 'react'

import { BRAND_PDF_PARENT_UI, createLayoutPrimitives } from '@brand-alchemy/pdf-layout-primitives'
import {
  BRAND_PDF_COLORS,
  PageFooterChrome,
  pdfPageBottomPadding,
  registerBrandPdfFonts,
} from '@identity-kit/pdf-chrome'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..', '..', '..')
const identityKitRoot = join(repoRoot, '..', 'identity-kit')
const reactPdfEntry = join(identityKitRoot, 'node_modules/@react-pdf/renderer/lib/react-pdf.js')

const { renderToBuffer, Document, Page, Text, View, StyleSheet } = await import(
  pathToFileURL(reactPdfEntry).href,
)

const outDir = join(__dirname, '..', 'output')
const outFile = join(outDir, 'sample-layout-primitives.pdf')

const L = createLayoutPrimitives({
  h,
  Text,
  View,
  StyleSheet,
  BRAND: BRAND_PDF_COLORS,
})

const pageBase = {
  size: 'LETTER',
  style: {
    paddingTop: 0,
    paddingHorizontal: 0,
    paddingBottom: pdfPageBottomPadding,
    fontFamily: 'Inter',
    fontWeight: 300,
  },
}

const gutter = { paddingHorizontal: 44 }

/** Parent-brand gray ramp (`brand-tokens.css`); Identity Kit customer PDFs use survey palettes instead. */
const navSegments = BRAND_PDF_PARENT_UI.navSegmentRamp.map((backgroundColor, i) => ({
  id: `seg-${i}`,
  label: `Nav ${String.fromCharCode(65 + i)}`,
  backgroundColor,
}))

function SampleDocument() {
  return h(
    Document,
    { title: 'Brand Alchemy — PDF layout primitives (reference)' },
    h(
      Page,
      pageBase,
      h(
        View,
        { style: { ...gutter, paddingTop: 28, paddingBottom: 8 } },
        h(
          Text,
          {
            style: {
              fontSize: 20,
              fontFamily: 'Source Serif 4',
              fontWeight: 400,
              color: BRAND_PDF_COLORS.black,
              marginBottom: 8,
            },
          },
          'PDF layout primitives',
        ),
        h(
          Text,
          {
            style: {
              fontSize: 9.5,
              lineHeight: 1.55,
              color: BRAND_PDF_COLORS.bodyText,
              marginBottom: 6,
            },
          },
          'Placeholder copy only — swap in your lead magnet or product content. Use the export names below when composing new PDFs.',
        ),
        h(
          Text,
          {
            style: {
              fontSize: 8,
              lineHeight: 1.5,
              color: BRAND_PDF_COLORS.subText,
              marginBottom: 6,
            },
          },
          'Colors: BRAND_PDF_PARENT_UI (this file) + BRAND_PDF_COLORS for type — black/gray ramp from brand-tokens. Identity Kit outputs use customer palette swatches for nav/bands; lead magnets should stay on parent-brand neutrals.',
        ),
      ),
      h(L.KitNavStrip, { segments: navSegments, activeId: 'seg-1' }),
      h(View, { style: { height: 12 } }),
      h(
        View,
        { style: gutter },
        h(L.PrimitiveReferenceHeading, {
          name: 'KitNavStrip',
          description:
            'Colored segment nav (active tab shows label). Props: segments { id, label, backgroundColor }[], activeId.',
        }),
      ),
      h(View, { style: { height: 8 } }),
      h(
        View,
        { style: gutter },
        h(L.PrimitiveReferenceHeading, {
          name: 'SectionEyebrowBand + SectionBody',
          description: 'Eyebrow strip (Inter caps) + padded body. Props: label, bandColor; SectionBody wraps children.',
        }),
      ),
      h(L.SectionEyebrowBand, { label: 'Sample section', bandColor: BRAND_PDF_PARENT_UI.primary }),
      h(
        L.SectionBody,
        null,
        h(
          Text,
          { style: L.styles.sectionBodyText },
          'Section body: Inter light body text. Replace this paragraph with real content.',
        ),
      ),
      h(View, { style: { height: 8 } }),
      h(
        View,
        { style: gutter },
        h(L.PrimitiveReferenceHeading, {
          name: 'TwoColumnWithVerticalRule',
          description: 'Two text columns with vertical hairline. Props: leftText, rightText.',
        }),
      ),
      h(
        View,
        { style: { ...gutter, marginBottom: 8 } },
        h(L.TwoColumnWithVerticalRule, {
          leftText:
            'Left column placeholder — use for comparisons, split lists, or paired explanations without importing Identity Kit copy.',
          rightText:
            'Right column placeholder — same typography as left; rule is decorative only.',
        }),
      ),
      h(PageFooterChrome),
    ),
    h(
      Page,
      pageBase,
      h(View, { style: { ...gutter, paddingTop: 28 } }),
      h(
        View,
        { style: gutter },
        h(L.PrimitiveReferenceHeading, {
          name: 'DoAvoidLargeWordRow',
          description:
            'Large Source Serif anchor + symbol column. Stack two rows for Do / Avoid. Props: anchorWord, lines[], bulletSymbol, anchorColor.',
        }),
      ),
      h(
        View,
        { style: { ...gutter, marginBottom: 4 } },
        h(L.DoAvoidLargeWordRow, {
          anchorWord: 'Do',
          bulletSymbol: '✓',
          anchorColor: BRAND_PDF_PARENT_UI.doAnchor,
          symbolColor: BRAND_PDF_PARENT_UI.doAnchor,
          lines: ['First line placeholder.', 'Second line placeholder.'],
        }),
      ),
      h(
        View,
        { style: { ...gutter, marginBottom: 12 } },
        h(L.DoAvoidLargeWordRow, {
          anchorWord: 'Avoid',
          bulletSymbol: '✗',
          anchorColor: BRAND_PDF_PARENT_UI.avoidAnchor,
          symbolColor: BRAND_PDF_PARENT_UI.avoidAnchor,
          lines: ['First caution placeholder.', 'Second caution placeholder.'],
        }),
      ),
      h(
        View,
        { style: gutter },
        h(L.PrimitiveReferenceHeading, {
          name: 'ToneDescriptorChipRow',
          description: 'Label + value chips (gray pill). Props: chips { label, value }[].',
        }),
      ),
      h(
        View,
        { style: { ...gutter, marginBottom: 10 } },
        h(L.ToneDescriptorChipRow, {
          chips: [
            { label: 'Field A', value: 'Low / Mid / High' },
            { label: 'Field B', value: 'Descriptor' },
          ],
        }),
      ),
      h(
        View,
        { style: gutter },
        h(L.PrimitiveReferenceHeading, {
          name: 'ValuePillRow',
          description: 'Rounded pills with accent text color. Props: pills[], accentHex.',
        }),
      ),
      h(
        View,
        { style: { ...gutter, marginBottom: 10 } },
        h(L.ValuePillRow, {
          pills: ['Tag one', 'Tag two', 'Tag three'],
          accentHex: BRAND_PDF_PARENT_UI.pillText,
        }),
      ),
      h(
        View,
        { style: gutter },
        h(L.PrimitiveReferenceHeading, {
          name: 'MiniCapsHeader',
          description: 'Small uppercase gray mini-header. Props: label, optional marginBottom.',
        }),
      ),
      h(
        View,
        { style: { ...gutter, marginBottom: 8 } },
        h(L.MiniCapsHeader, { label: 'Storytelling serif' }),
      ),
      h(
        View,
        { style: gutter },
        h(L.PrimitiveReferenceHeading, {
          name: 'BoxedMiniHeader',
          description:
            'Rectangular mini-header chip used in Before/After columns. Props: label, backgroundColor, textColor.',
        }),
      ),
      h(
        View,
        { style: { ...gutter, marginBottom: 8 } },
        h(L.BoxedMiniHeader, {
          label: 'Before',
          backgroundColor: '#F4F4F5',
          textColor: BRAND_PDF_COLORS.subText,
        }),
      ),
      h(
        View,
        { style: gutter },
        h(L.PrimitiveReferenceHeading, {
          name: 'NumberedBulletGroup',
          description: 'Optional group label + 01, 02, … rows. Props: groupLabel?, lines[].',
        }),
      ),
      h(
        View,
        { style: { ...gutter, marginBottom: 8 } },
        h(L.NumberedBulletGroup, {
          groupLabel: 'Sample group',
          lines: ['First numbered item placeholder.', 'Second numbered item placeholder.'],
        }),
      ),
      h(
        View,
        { style: gutter },
        h(L.PrimitiveReferenceHeading, {
          name: 'MessagingThemeNumberedBlock',
          description:
            'Voice Playbook pattern: uppercase gray preheader row followed by numbered list. Props: preheader, lines[].',
        }),
      ),
      h(
        View,
        { style: { ...gutter, marginBottom: 8 } },
        h(L.MessagingThemeNumberedBlock, {
          preheader: 'Message theme',
          lines: ['First messaging point placeholder.', 'Second messaging point placeholder.'],
        }),
      ),
      h(
        View,
        { style: gutter },
        h(L.PrimitiveReferenceHeading, {
          name: 'BeforeAfterColumns',
          description:
            'Two columns with boxed mini-headers (Before/After) and divider; matches kit formatting pattern.',
        }),
      ),
      h(
        View,
        { style: { ...gutter, marginBottom: 8 } },
        h(L.BeforeAfterColumns, {
          beforeText: 'Before text placeholder appears in lighter, italicized body style.',
          afterText: 'After text placeholder appears in serif style with stronger emphasis.',
          afterHeaderBg: '#E5E7EB',
          afterHeaderText: BRAND_PDF_COLORS.black,
        }),
      ),
      h(
        View,
        { style: { ...gutter, paddingTop: 6 } },
        h(
          Text,
          {
            style: {
              fontSize: 7.5,
              fontFamily: 'Inter',
              fontStyle: 'italic',
              color: BRAND_PDF_COLORS.subText,
              lineHeight: 1.45,
            },
          },
          'PrimitiveReferenceHeading is for this reference PDF only — optional helper to label each block.',
        ),
      ),
      h(PageFooterChrome),
    ),
  )
}

registerBrandPdfFonts()
const buf = await renderToBuffer(h(SampleDocument))
mkdirSync(outDir, { recursive: true })
writeFileSync(outFile, buf)
console.log(`Wrote ${outFile}`)
