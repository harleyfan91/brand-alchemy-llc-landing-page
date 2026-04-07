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
const outFile = join(outDir, 'services-review-replies.pdf')
const appIconPath = join(repoRoot, 'public', 'camentra-app-icon-ios.png')

const S = StyleSheet.create({
  page: {
    paddingTop: 28,
    paddingHorizontal: 0,
    paddingBottom: pdfPageBottomPadding,
    fontFamily: 'Inter',
    fontWeight: 300,
  },
  gutter: { paddingHorizontal: 44 },
  title: {
    fontSize: 24,
    fontFamily: 'Source Serif 4',
    fontWeight: 400,
    color: BRAND_PDF_COLORS.black,
    marginBottom: 8,
  },
  goal: {
    fontSize: 9.5,
    fontFamily: 'Inter',
    fontWeight: 400,
    lineHeight: 1.55,
    color: BRAND_PDF_COLORS.bodyText,
    marginBottom: 10,
  },
  sectionWrap: { marginBottom: 14 },
  sectionContentWrap: { paddingTop: 8 },
  calloutWrap: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 3,
    padding: 10,
    backgroundColor: '#FAFAFA',
  },
  promoPlacement: { flexGrow: 1, justifyContent: 'center' },
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
  addonRow: {
    marginTop: 8,
    justifyContent: 'center',
  },
  addonRowInner: {
    width: 430,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  addonLabelWrap: {
    width: 122,
    paddingRight: 10,
  },
  addonText: {
    flex: 1,
    fontSize: 9,
    fontFamily: 'Inter',
    fontWeight: 300,
    lineHeight: 1.55,
    color: BRAND_PDF_COLORS.bodyText,
  },
  disclaimerWrap: { marginTop: 4 },
  disclaimerText: {
    fontSize: 8.2,
    fontFamily: 'Inter',
    fontWeight: 400,
    fontStyle: 'italic',
    lineHeight: 1.45,
    color: BRAND_PDF_COLORS.subText,
    textAlign: 'right',
  },
})

const sectionColors = {
  positive: { bg: '#DDEEE4', text: '#2F5D46' },
  mixed: { bg: '#F3EECF', text: '#6A5A24' },
  poor: { bg: '#F4DDDD', text: '#7A3A3A' },
}

const content = {
  title: 'Copy & Paste Review Replies: Services',
  goal:
    'Goal: Respond to 3 reviews this month, target recent reviews and aim to respond within 72h',
  positive: {
    header: 'Positive Review',
    template:
      'Thanks so much, [Name]! We’re glad you had a great experience with [specific service]. We look forward to assisting you again.',
    example:
      '“Thanks so much, Mika! We’re glad you had a great experience with the inspection. We look forward to assisting you again.”',
  },
  mixed: {
    header: 'Mixed Review',
    template:
      'Appreciate your feedback, [Name]. We’re glad you felt [positive detail], and we’re working on [issue] to improve. Hope to serve you again soon.',
    example:
      '“Appreciate your feedback, Sam. We’re glad you felt comfortable in our office, and we’re working on reducing wait times to improve. Hope to serve you again soon.”',
  },
  poor: {
    header: 'Poor Review',
    template:
      'Sorry about your experience, [Name]. This isn’t the standard we aim for. I’m [Owner/Manager], please message us at [contact] so we can make it right.',
    privateTemplate:
      'Thanks for reaching out, [Name]. I’d like to understand more about your visit/service so we can resolve this. Can you share the date and details? I’ll follow up with a solution.',
    disclaimer:
      'Follow up privately to avoid public\nconfrontation and retain the client',
  },
  promoTrial:
    'Bonus with purchase: Get the Camentra App FREE for 14 Days. Make your photos look professional, consistent, and intentional across your entire online presence.',
}

function SectionBlock({
  heading,
  colors,
  template,
  example,
  beforeLabel = 'Template',
  afterLabel = 'Example',
  addOnLabel,
  addOnText,
  disclaimer,
}) {
  return h(
    View,
    { style: S.sectionWrap, wrap: false },
    h(L.SectionEyebrowBand, { label: heading, bandColor: colors.bg }),
    h(
      View,
      { style: [S.gutter, S.sectionContentWrap] },
      h(L.BeforeAfterColumns, {
        beforeLabel,
        afterLabel,
        beforeText: template,
        afterText: example,
        beforeHeaderBg: '#F4F4F5',
        beforeHeaderText: BRAND_PDF_COLORS.subText,
        afterHeaderBg: '#E5E7EB',
        afterHeaderText: BRAND_PDF_COLORS.black,
      }),
      addOnLabel && addOnText
        ? h(
            View,
            { style: S.addonRow },
            h(
              View,
              { style: S.addonRowInner },
              h(View, { style: S.addonLabelWrap }, h(L.MiniCapsHeader, { label: addOnLabel, marginBottom: 0 })),
              h(Text, { style: S.addonText }, addOnText),
            ),
          )
        : null,
      disclaimer
        ? h(
            View,
            { style: S.disclaimerWrap },
            h(Text, { style: S.disclaimerText }, disclaimer),
          )
        : null,
    ),
  )
}

function ServicesReviewDoc() {
  return h(
    Document,
    { title: content.title },
    h(
      Page,
      { size: 'LETTER', style: S.page },
      h(
        View,
        { style: S.gutter },
        h(Text, { style: S.title }, content.title),
        h(Text, { style: S.goal }, content.goal),
      ),
      h(SectionBlock, {
        heading: content.positive.header,
        colors: sectionColors.positive,
        template: content.positive.template,
        example: content.positive.example,
      }),
      h(SectionBlock, {
        heading: content.mixed.header,
        colors: sectionColors.mixed,
        template: content.mixed.template,
        example: content.mixed.example,
      }),
      h(SectionBlock, {
        heading: content.poor.header,
        colors: sectionColors.poor,
        template: content.poor.template,
        example: content.poor.privateTemplate,
        beforeLabel: 'Template (Public)',
        afterLabel: 'Template (Private)',
        disclaimer: content.poor.disclaimer,
      }),
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
const buf = await renderToBuffer(h(ServicesReviewDoc))
mkdirSync(outDir, { recursive: true })
writeFileSync(outFile, buf)
console.log(`Wrote ${outFile}`)

