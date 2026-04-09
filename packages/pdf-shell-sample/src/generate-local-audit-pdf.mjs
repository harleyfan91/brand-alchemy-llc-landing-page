import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { createElement as h } from 'react'

import { createLayoutPrimitives } from '@brand-alchemy/pdf-layout-primitives'
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

const L = createLayoutPrimitives({
  h,
  Text,
  View,
  StyleSheet,
  BRAND: BRAND_PDF_COLORS,
})

const outDir = join(__dirname, '..', 'output')
const outFile = join(outDir, '3-minute-local-business-audit.pdf')
const appIconPath = join(repoRoot, 'public', 'camentra-app-icon-ios.png')

const pageBase = {
  size: 'LETTER',
  style: {
    paddingTop: 28,
    paddingHorizontal: 0,
    paddingBottom: pdfPageBottomPadding,
    fontFamily: 'Inter',
    fontWeight: 300,
  },
}

/** Page 2: column layout so a flex spacer can sit above the CTA (avoids a large dead zone below the CTA). */
const pageBaseAuditTwo = {
  size: 'LETTER',
  style: {
    ...pageBase.style,
    flexDirection: 'column',
    height: '100%',
  },
}

const S = StyleSheet.create({
  gutter: { paddingHorizontal: 44 },
  title: {
    fontSize: 20,
    fontFamily: 'Source Serif 4',
    fontWeight: 400,
    color: BRAND_PDF_COLORS.black,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 9.4,
    lineHeight: 1.52,
    color: BRAND_PDF_COLORS.bodyText,
    marginBottom: 8,
  },
  helper: {
    fontSize: 8.1,
    lineHeight: 1.5,
    color: BRAND_PDF_COLORS.subText,
    marginBottom: 8,
  },
  sectionWrap: {
    marginBottom: 6,
  },
  sectionBody: {
    paddingHorizontal: 44,
    paddingTop: 5,
  },
  scoreLine: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 3,
  },
  scoreNum: {
    width: 18,
    fontSize: 9.2,
    fontFamily: 'Inter',
    fontWeight: 700,
    color: BRAND_PDF_COLORS.black,
  },
  scoreText: {
    flex: 1,
    fontSize: 8.1,
    lineHeight: 1.38,
    color: BRAND_PDF_COLORS.bodyText,
  },
  scoreCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 3,
    padding: 10,
    backgroundColor: '#FAFAFA',
    marginTop: 6,
  },
  scoreRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  scorePill: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D4D4D8',
    borderRadius: 3,
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginRight: 8,
    marginBottom: 6,
    backgroundColor: '#FFFFFF',
  },
  scorePillLast: {
    marginRight: 0,
  },
  scorePillText: {
    fontSize: 7.5,
    lineHeight: 1.35,
    color: BRAND_PDF_COLORS.bodyText,
  },
  tallyDirective: {
    fontSize: 8,
    lineHeight: 1.4,
    color: BRAND_PDF_COLORS.subText,
    marginBottom: 6,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 9,
    fontFamily: 'Inter',
    fontWeight: 700,
    color: BRAND_PDF_COLORS.black,
  },
  totalBlank: {
    width: 110,
    borderBottomWidth: 1,
    borderBottomColor: '#71717A',
    height: 18,
  },
  note: {
    fontSize: 7.8,
    lineHeight: 1.45,
    color: BRAND_PDF_COLORS.subText,
    marginTop: 8,
    fontStyle: 'italic',
  },
  gradeLegendRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  gradeLegendItem: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 3,
    paddingVertical: 7,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  gradeLegendLast: {
    marginRight: 0,
  },
  gradeLegendHead: {
    fontSize: 7.8,
    fontFamily: 'Inter',
    fontWeight: 700,
    letterSpacing: 0.6,
    marginBottom: 2,
  },
  gradeLegendText: {
    fontSize: 7.3,
    lineHeight: 1.35,
  },
  calloutWrap: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 3,
    padding: 10,
    backgroundColor: '#FAFAFA',
  },
  preCtaSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    minHeight: 12,
  },
  finalScoreTop: {
    marginTop: 26,
  },
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
})

const sections = [
  {
    title: '1) Hours',
    bandColor: '#DDEEE4',
    scores: [
      'Regular hours missing/wrong; no holiday/special hours.',
      'Regular hours correct, but no upcoming holiday/special hours added.',
      'Regular hours correct and holiday/special hours scheduled for known dates; "More hours" (pickup/delivery) set if relevant.',
    ],
  },
  {
    title: '2) NAP Accuracy (Name, Address/Service Area, Phone, Website)',
    bandColor: '#F3EECF',
    scores: [
      'Any field incorrect/missing; SAB shows home address.',
      'Core fields correct but formatting is messy (suite, service area, UTM) or minor citation inconsistencies.',
      'All fields are accurate/clean; correct business type (storefront vs service-area); link points to the right landing page.',
    ],
  },
  {
    title: '3) Google Categories / Yelp Attributes',
    bandColor: '#E8EEF4',
    scores: [
      'Wrong/over-generic primary; irrelevant secondaries.',
      'Correct primary; missing obvious secondaries/services/attributes.',
      'Most-specific primary; only relevant secondaries/services/attributes added.',
    ],
  },
  {
    title: '4) Products/Menu or Attributes/Specialties',
    bandColor: '#DDEEE4',
    scores: [
      'Nothing added.',
      'Some items/fields present but thin (no photos, no prices/benefits; attributes incomplete).',
      'Top 3-6 items fully filled with title + 1-line benefit + price/photo OR attributes/specialties/amenities fully completed and accurate.',
    ],
  },
  {
    title: '5) Photo Freshness & Coverage',
    bandColor: '#F3EECF',
    scores: [
      '0 new photos in 90 days; gallery sparse (<10) or stock/over-edited.',
      '1-4 new photos in 30 days (or 5+ in 60), but coverage is patchy (missing exterior/interior/product, etc.).',
      '5+ new photos in 30 days and coverage includes exterior, interior, product/service result, team "hands at work," before/after (if applicable), customer POV. Real, well-lit, upright, cropped clean.',
    ],
  },
  {
    title: '6) Reviews: Volume, Recency, Responses',
    bandColor: '#E8EEF4',
    scores: [
      '0-1 new reviews in 90 days; total <10 or avg <3.5 stars; replies rare/absent.',
      '1-2 new reviews in 30 days; total 10-49; response rate 50-89% within 72h.',
      '3+ new reviews in 30 days; total 50+ (or strong vs peers); >=90% response within 48-72h with specifics.',
    ],
  },
  {
    title: '7) Google Posts / Yelp Updates',
    bandColor: '#DDEEE4',
    scores: [
      'No updates in 60+ days.',
      '1 update in 30-60 days; thin copy or no clear CTA.',
      '>=1 update in the last 14-30 days with clear CTA and real photo; simple monthly cadence.',
    ],
  },
  {
    title: '8) Q&A / Messaging (Lead Capture Readiness)',
    bandColor: '#F3EECF',
    scores: [
      'Q&A empty; messaging/Request-a-Quote off; slow/unknown response time.',
      '1-2 FAQs seeded or messaging on, but responses typically >24h; no saved replies.',
      '3-5 FAQs seeded/answered; messaging or Request-a-Quote enabled with saved replies; typical response <4h during business hours.',
    ],
  },
]

function ScoreSection({ index, title, scores, bandColor }) {
  return h(
    View,
    { style: S.sectionWrap, wrap: false },
    h(L.SectionEyebrowBand, { label: title, bandColor }),
    h(
      View,
      { style: S.sectionBody },
      ...scores.map((line, i) =>
        h(
          View,
          { key: `${index}-${i}`, style: S.scoreLine },
          h(Text, { style: S.scoreNum }, `${i}`),
          h(Text, { style: S.scoreText }, '[   ] ', line),
        ),
      ),
    ),
  )
}

function ScorePillRow({ start }) {
  return h(
    View,
    { style: S.scoreRow },
    ...Array.from({ length: 4 }).map((_, i) =>
      h(
        View,
        { key: `score-pill-${start + i + 1}`, style: [S.scorePill, i === 3 ? S.scorePillLast : null] },
        h(Text, { style: S.scorePillText }, `${start + i + 1}) ____`),
      ),
    ),
  )
}

function AuditPageOne() {
  return h(
    Page,
    pageBase,
    h(
      View,
      { style: S.gutter },
      h(Text, { style: S.title }, '3 Minute Local Business Audit (Google & Yelp)'),
      h(
        Text,
        { style: S.subtitle },
        'For each section, mark exactly one row: put a check or X in the box next to the description that fits best (0 = needs work, 2 = strong).',
      ),
      h(
        Text,
        { style: S.helper },
        "One pick per section. At the end, we'll tally up those scores.",
      ),
    ),
    h(ScoreSection, sections[0]),
    h(ScoreSection, sections[1]),
    h(ScoreSection, sections[2]),
    h(ScoreSection, sections[3]),
    h(ScoreSection, sections[4]),
    h(ScoreSection, sections[5]),
    h(PageFooterChrome),
  )
}

function AuditPageTwo() {
  return h(
    Page,
    pageBaseAuditTwo,
    ...sections.slice(6).map((section, i) =>
      h(ScoreSection, {
        key: `p2-${i}`,
        index: i,
        ...section,
      }),
    ),
    h(
      View,
      { style: S.finalScoreTop },
      h(L.SectionEyebrowBand, { label: 'Final Score', bandColor: '#E8EEF4' }),
    ),
    h(
      View,
      { style: [S.gutter, S.scoreCard] },
      h(Text, { style: S.tallyDirective }, 'Tally once: enter the 8 section scores you marked above (each 0, 1, or 2).'),
      h(
        View,
        null,
        h(ScorePillRow, { start: 0 }),
        h(ScorePillRow, { start: 4 }),
      ),
      h(
        View,
        { style: S.totalRow },
        h(Text, { style: S.totalLabel }, 'Your Total Score'),
        h(View, { style: S.totalBlank }),
      ),
      h(
        Text,
        { style: S.note },
        'For low-volume niche industries, halve the thresholds for new photos/reviews.',
      ),
      h(
        View,
        { style: S.gradeLegendRow },
        h(
          View,
          {
            style: [
              S.gradeLegendItem,
              { backgroundColor: '#F4DDDD', borderColor: '#E7C5C5' },
            ],
          },
          h(Text, { style: [S.gradeLegendHead, { color: '#7A3A3A' }] }, 'Poor (0-6)'),
          h(Text, { style: [S.gradeLegendText, { color: '#7A3A3A' }] }, 'High-priority fixes needed'),
        ),
        h(
          View,
          {
            style: [
              S.gradeLegendItem,
              { backgroundColor: '#F3EECF', borderColor: '#E8DEAA' },
            ],
          },
          h(Text, { style: [S.gradeLegendHead, { color: '#6A5A24' }] }, 'Good (7-12)'),
          h(Text, { style: [S.gradeLegendText, { color: '#6A5A24' }] }, 'Solid baseline with clear opportunities'),
        ),
        h(
          View,
          {
            style: [
              S.gradeLegendItem,
              S.gradeLegendLast,
              { backgroundColor: '#DDEEE4', borderColor: '#C8E0D2' },
            ],
          },
          h(Text, { style: [S.gradeLegendHead, { color: '#2F5D46' }] }, 'Excellent (13-16)'),
          h(Text, { style: [S.gradeLegendText, { color: '#2F5D46' }] }, 'Consistent, complete, and well-maintained'),
        ),
      ),
    ),
    h(View, { style: S.preCtaSpacer }),
    h(
      View,
      { style: S.gutter },
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
  )
}

function LocalAuditDoc() {
  return h(
    Document,
    { title: '3 Minute Local Business Audit' },
    h(AuditPageOne),
    h(AuditPageTwo),
  )
}

registerBrandPdfFonts()
const buf = await renderToBuffer(h(LocalAuditDoc))
mkdirSync(outDir, { recursive: true })
writeFileSync(outFile, buf)
console.log(`Wrote ${outFile}`)
