import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { createElement as h } from 'react'

import { onColor } from '@brand-alchemy/pdf-layout-primitives'
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

const { renderToBuffer, Document, Image, Page, Text, View, StyleSheet } = await import(
  pathToFileURL(reactPdfEntry).href,
)

const outDir = join(__dirname, '..', 'output')
const outFile = join(outDir, 'spa-3-photos.pdf')
const appIconPath = join(repoRoot, 'public', 'camentra-app-icon-ios.png')
/** Single composite for the right column; swap file or path in `content.collageImageSrc`. */
const defaultCollagePath = join(repoRoot, 'public', 'pdf-assets', 'spa-photos-collage-sample.png')
/** Native pixels of `spa-photos-collage-sample.png` — update if you replace the asset. */
const COLLAGE_PX_W = 485
const COLLAGE_PX_H = 1024
const COLLAGE_COL_W_PT = 212
const COLLAGE_COL_H_PT = Math.round((COLLAGE_COL_W_PT * COLLAGE_PX_H) / COLLAGE_PX_W)

/** One tint per angle (review-style section strip, column-local). */
const angleBandColors = ['#DDEEE4', '#F3EECF', '#E8EEF4']

const S = StyleSheet.create({
  page: {
    paddingTop: 28,
    paddingHorizontal: 0,
    paddingBottom: pdfPageBottomPadding,
    fontFamily: 'Inter',
    fontWeight: 300,
  },
  gutter: { paddingHorizontal: 44 },
  /** Slightly smaller than default to keep long vertical titles on one line. */
  titleHeadline: {
    fontSize: 13.25,
    fontFamily: 'Source Serif 4',
    fontWeight: 400,
    lineHeight: 1.22,
    color: BRAND_PDF_COLORS.black,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 9.5,
    fontFamily: 'Inter',
    fontWeight: 400,
    lineHeight: 1.55,
    color: BRAND_PDF_COLORS.bodyText,
    marginBottom: 8,
  },
  twoCol: {
    flexDirection: 'row',
    alignItems: 'stretch',
    flexGrow: 1,
    paddingHorizontal: 44,
    marginBottom: 10,
    /** Match collage column height so the left column can spread sections into that space. */
    minHeight: COLLAGE_COL_H_PT,
  },
  leftCol: {
    flex: 1,
    paddingRight: 12,
    minWidth: 0,
    justifyContent: 'space-between',
    paddingTop: 6,
    paddingBottom: 28,
  },
  rightCol: {
    width: COLLAGE_COL_W_PT,
    flexShrink: 0,
    alignItems: 'center',
  },
  collageImage: {
    width: COLLAGE_COL_W_PT,
    height: COLLAGE_COL_H_PT,
    objectFit: 'contain',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  angleSection: {
    marginBottom: 0,
  },
  miniBand: {
    alignSelf: 'stretch',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 2,
    marginBottom: 8,
  },
  miniBandLabel: {
    fontSize: 7.5,
    fontFamily: 'Inter',
    fontWeight: 700,
    letterSpacing: 2.0,
  },
  angleBody: {
    paddingLeft: 2,
  },
  angleLine: {
    fontSize: 8.4,
    lineHeight: 1.52,
    color: BRAND_PDF_COLORS.bodyText,
    fontFamily: 'Inter',
    fontWeight: 300,
    marginBottom: 3,
  },
  angleLineLead: {
    fontFamily: 'Inter',
    fontWeight: 700,
    color: BRAND_PDF_COLORS.black,
  },
  calloutWrap: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 3,
    padding: 10,
    backgroundColor: '#FAFAFA',
  },
  promoPlacement: { flexGrow: 0, justifyContent: 'flex-end' },
  promoLeadText: {
    fontSize: 14,
    lineHeight: 1.28,
    color: BRAND_PDF_COLORS.black,
    fontFamily: 'Source Serif 4',
    fontWeight: 400,
    textAlign: 'left',
    marginBottom: 4,
  },
  promoSupportText: {
    fontSize: 9.1,
    lineHeight: 1.55,
    color: BRAND_PDF_COLORS.bodyText,
    fontFamily: 'Inter',
    fontWeight: 300,
    textAlign: 'left',
  },
  promoEmphasisSoft: {
    fontFamily: 'Inter',
    fontWeight: 600,
    color: '#1F2937',
  },
  promoBottomRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginBottom: 9,
  },
  promoLeftCol: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 12,
  },
  promoAppIcon: {
    width: 44,
    height: 44,
    borderRadius: 11,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    flexShrink: 0,
  },
  promoAppIconImage: {
    width: 44,
    height: 44,
    objectFit: 'cover',
  },
  promoTrialText: {
    flex: 1,
    fontSize: 8.9,
    lineHeight: 1.52,
    color: BRAND_PDF_COLORS.bodyText,
    fontFamily: 'Inter',
    fontWeight: 300,
  },
  promoTrialLead: {
    fontFamily: 'Inter',
    fontWeight: 700,
    color: BRAND_PDF_COLORS.black,
  },
  promoRightCol: {
    width: 118,
    paddingLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoQrLabel: {
    fontSize: 6.5,
    fontFamily: 'Inter',
    fontWeight: 700,
    letterSpacing: 1.0,
    color: BRAND_PDF_COLORS.subText,
    textAlign: 'center',
    marginBottom: 4,
  },
  promoQrPlaceholder: {
    width: 78,
    height: 78,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#A16207',
    backgroundColor: '#FDE047',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    paddingHorizontal: 4,
  },
  promoQrPlaceholderText: {
    fontSize: 7,
    fontFamily: 'Inter',
    fontWeight: 700,
    color: '#713F12',
    textAlign: 'center',
    lineHeight: 1.2,
  },
  promoFallbackText: {
    fontSize: 7.2,
    lineHeight: 1.4,
    color: BRAND_PDF_COLORS.bodyText,
    fontFamily: 'Inter',
    fontWeight: 300,
    textAlign: 'center',
  },
  promoBonusRow: {
    borderTopWidth: 0.5,
    borderTopColor: '#E4E4E7',
    paddingTop: 8,
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  promoBonusIconWrap: {
    width: 54,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    flexShrink: 0,
  },
})

/**
 * Three angles on the left; one composite image on the right (e.g. a pre-built collage).
 * @type {{
 *   title: string
 *   subtitle: string
 *   collageImageSrc: string
 *   angles: Array<{ title: string; frame: string; light: string; tip?: string }>
 * }}
 */
const content = {
  title: '3 Photos You Must Upload This Month: Spa/Salon',
  subtitle: 'A visual blueprint for Google Maps & Yelp Presence',
  collageImageSrc: defaultCollagePath,
  angles: [
    {
      title: 'Transformation Shot (Before & After)',
      frame:
        'Consistent eye-level or slight 45° angle; capture same client position for both before & after.',
      light: 'Even, bright lighting; use natural light or ring light for color accuracy.',
      tip: 'Keep background neutral and clutter-free so results stand out.',
    },
    {
      title: 'Bright, Inviting Interior',
      frame:
        'Wide shot showing salon/spa layout (mirrors, chairs, or treatment beds).',
      light: 'Turn on interior lights; ensure colors appear true to life.',
    },
    {
      title: 'Detail Close-Up',
      frame:
        'Macro shot of nails, lashes, or hair texture.',
      light: 'Use soft, diffused light; ensure sharp focus on service detail.',
      tip: 'Use a plain towel or neutral backdrop to make details pop.',
    },
  ],
}

function AngleLine({ lead, body }) {
  return h(
    Text,
    { style: S.angleLine },
    h(Text, { style: S.angleLineLead }, `${lead}: `),
    body,
  )
}

function MiniSectionBand({ label, bandColor }) {
  const textColor = onColor(bandColor)
  return h(
    View,
    { style: [S.miniBand, { backgroundColor: bandColor }] },
    h(Text, { style: [S.miniBandLabel, { color: textColor }] }, label.toUpperCase()),
  )
}

function AngleTextSection({ title, bandColor, frame, light, tip }) {
  return h(
    View,
    { style: S.angleSection, wrap: false },
    h(MiniSectionBand, { label: title, bandColor }),
    h(
      View,
      { style: S.angleBody },
      h(AngleLine, { lead: 'Frame', body: frame }),
      h(AngleLine, { lead: 'Light', body: light }),
      tip ? h(AngleLine, { lead: 'Tip', body: tip }) : null,
    ),
  )
}

function CollageColumn({ src }) {
  return h(
    View,
    { style: S.rightCol },
    h(Image, {
      src,
      style: S.collageImage,
    }),
  )
}

function SpaPhotosDoc() {
  return h(
    Document,
    { title: content.title },
    h(
      Page,
      { size: 'LETTER', style: S.page },
      h(
        View,
        { style: S.gutter },
        h(Text, { style: S.titleHeadline }, content.title),
        h(Text, { style: S.subtitle }, content.subtitle),
      ),
      h(
        View,
        { style: S.twoCol },
        h(
          View,
          { style: S.leftCol },
          ...content.angles.map((a, idx) =>
            h(AngleTextSection, {
              key: a.title,
              title: a.title,
              bandColor: angleBandColors[idx % angleBandColors.length],
              frame: a.frame,
              light: a.light,
              tip: a.tip,
            }),
          ),
        ),
        h(CollageColumn, { src: content.collageImageSrc }),
      ),
      h(
        View,
        { style: [S.gutter, S.promoPlacement] },
        h(
          View,
          { style: S.calloutWrap },
          h(
            View,
            { style: S.promoBottomRow },
            h(
              View,
              { style: S.promoLeftCol },
              h(Text, { style: S.promoLeadText }, 'Stop DIYing. Get the System that Scales.'),
              h(
                Text,
                { style: S.promoSupportText },
                'Instantly unlock the full 30-script playbook, the Weekly Routine, and 12 Pro Angles ',
                h(Text, { style: S.promoEmphasisSoft }, 'with our full Local Ranking Kit.'),
              ),
            ),
            h(
              View,
              { style: S.promoRightCol },
              h(Text, { style: S.promoQrLabel }, 'SCAN TO OPEN LOCAL RANKING KIT'),
              h(
                View,
                { style: S.promoQrPlaceholder },
                h(Text, { style: S.promoQrPlaceholderText }, 'KIT LINK\nQR TODO'),
              ),
              h(Text, { style: S.promoFallbackText }, 'Or visit URL from your device'),
            ),
          ),
          h(
            View,
            { style: S.promoBonusRow },
            h(
              View,
              { style: S.promoBonusIconWrap },
              h(
                View,
                { style: S.promoAppIcon },
                h(Image, {
                  src: appIconPath,
                  style: S.promoAppIconImage,
                }),
              ),
            ),
            h(
              Text,
              { style: S.promoTrialText },
              h(Text, { style: S.promoTrialLead }, 'Bonus with purchase: Get the Camentra App FREE for 14 Days. '),
              '\nMake your photos look professional, consistent, and intentional across your entire online presence.',
            ),
          ),
        ),
      ),
      h(PageFooterChrome),
    ),
  )
}

registerBrandPdfFonts()
const buf = await renderToBuffer(h(SpaPhotosDoc))
mkdirSync(outDir, { recursive: true })
writeFileSync(outFile, buf)
console.log(`Wrote ${outFile}`)
