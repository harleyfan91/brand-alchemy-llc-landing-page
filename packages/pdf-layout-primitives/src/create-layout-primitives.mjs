import { onColor } from './color-utils.mjs'
import { KIT_NAV_ACTIVE_LABEL_SIZE, KIT_NAV_ROW_HEIGHT, KIT_NAV_TAB_OVERLAP } from './metrics.mjs'

const FULL_PDF_WIDTH = 612

/**
 * Factory for Identity Kit–aligned layout pieces. Pass `BRAND` from `@identity-kit/pdf-chrome`
 * (`BRAND_PDF_COLORS`). No survey copy — only structure and typography.
 */
export function createLayoutPrimitives({ h, Text, View, StyleSheet, BRAND }) {
  const S = StyleSheet.create({
    kitNavRow: {
      flexDirection: 'row',
      alignItems: 'stretch',
      marginTop: -1,
      height: KIT_NAV_ROW_HEIGHT,
      width: FULL_PDF_WIDTH,
    },
    kitNavSegment: {
      flex: 1,
      height: KIT_NAV_ROW_HEIGHT,
      justifyContent: 'center',
      alignItems: 'center',
    },
    kitNavSegmentActive: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    kitNavActiveLabel: {
      fontSize: KIT_NAV_ACTIVE_LABEL_SIZE,
      fontFamily: 'Inter',
      fontWeight: 700,
      letterSpacing: 0.6,
      textAlign: 'center',
    },
    sectionBand: {
      paddingVertical: 6,
      paddingHorizontal: 44,
    },
    sectionBandLabel: {
      fontSize: 7.5,
      fontFamily: 'Inter',
      fontWeight: 700,
      letterSpacing: 2.25,
    },
    sectionBody: {
      paddingHorizontal: 44,
      paddingTop: 10,
      paddingBottom: 14,
    },
    sectionBodyText: {
      fontSize: 10,
      fontFamily: 'Inter',
      fontWeight: 300,
      lineHeight: 1.65,
      color: BRAND.bodyText,
    },
    refName: {
      fontSize: 8,
      fontFamily: 'Inter',
      fontWeight: 700,
      letterSpacing: 1.2,
      color: BRAND.black,
      marginBottom: 4,
    },
    refDesc: {
      fontSize: 7.5,
      fontFamily: 'Inter',
      fontWeight: 400,
      color: BRAND.subText,
      marginBottom: 10,
      lineHeight: 1.45,
    },
    demoSpacer: { height: 14 },
    doAvoidStack: { flexDirection: 'column' },
    doAvoidRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 14,
    },
    doAvoidWordCol: {
      width: 108,
      paddingRight: 12,
      flexShrink: 0,
      justifyContent: 'flex-start',
    },
    doAvoidWordDisplay: {
      fontSize: 28,
      lineHeight: 1.02,
      fontFamily: 'Source Serif 4',
      fontWeight: 400,
    },
    doAvoidItemsCol: {
      flex: 1,
      flexShrink: 1,
      minWidth: 0,
      paddingTop: 1,
    },
    doAvoidItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 7,
    },
    doAvoidSymbol: {
      fontSize: 9,
      fontFamily: 'Inter',
      fontWeight: 700,
      width: 14,
      marginTop: 0.5,
      flexShrink: 0,
    },
    doAvoidItemText: {
      flex: 1,
      fontSize: 9,
      fontFamily: 'Inter',
      fontWeight: 300,
      lineHeight: 1.6,
      color: BRAND.bodyText,
    },
    twoColRow: {
      flexDirection: 'row',
      alignItems: 'stretch',
    },
    twoColLeft: {
      flex: 1,
      paddingRight: 12,
    },
    twoColRule: {
      width: 1,
      backgroundColor: '#D4D4D8',
      marginHorizontal: 4,
      flexShrink: 0,
    },
    twoColRight: {
      flex: 1,
      paddingLeft: 12,
    },
    twoColBody: {
      fontSize: 9.5,
      fontFamily: 'Inter',
      fontWeight: 300,
      lineHeight: 1.55,
      color: BRAND.bodyText,
    },
    toneChipRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 6,
    },
    toneChip: {
      borderRadius: 20,
      backgroundColor: '#F4F4F5',
      paddingHorizontal: 8,
      paddingVertical: 4,
      marginRight: 5,
      marginBottom: 5,
      flexDirection: 'row',
      alignItems: 'center',
    },
    toneChipLabel: {
      fontSize: 6,
      fontFamily: 'Inter',
      fontWeight: 700,
      letterSpacing: 0.8,
      color: BRAND.subText,
      marginRight: 3,
    },
    toneChipValue: {
      fontSize: 7.5,
      fontFamily: 'Inter',
      fontWeight: 400,
      color: BRAND.bodyText,
    },
    valuePillRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 4,
    },
    valuePill: {
      borderRadius: 20,
      paddingHorizontal: 10,
      paddingVertical: 4,
      marginRight: 6,
      marginBottom: 5,
    },
    valuePillText: {
      fontSize: 7.5,
      fontFamily: 'Inter',
      fontWeight: 600,
      letterSpacing: 0.2,
    },
    bulletRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 7,
    },
    bulletNumWrap: {
      width: 22,
      paddingTop: 2,
      flexShrink: 0,
    },
    bulletNum: {
      fontSize: 8,
      fontFamily: 'Inter',
      fontWeight: 700,
      letterSpacing: 0.5,
      color: BRAND.subText,
    },
    bulletText: {
      flex: 1,
      fontSize: 9.5,
      fontFamily: 'Inter',
      fontWeight: 300,
      lineHeight: 1.55,
      color: BRAND.bodyText,
    },
    bulletGroupLabel: {
      fontSize: 6,
      fontFamily: 'Inter',
      fontWeight: 700,
      letterSpacing: 1.1,
      color: BRAND.subText,
      marginBottom: 7,
    },
    miniCapsHeader: {
      fontSize: 6.5,
      fontFamily: 'Inter',
      fontWeight: 700,
      letterSpacing: 1.05,
      color: BRAND.subText,
      marginBottom: 7,
    },
    boxedMiniHeaderBand: {
      paddingVertical: 5,
      paddingHorizontal: 8,
      marginBottom: 6,
      borderRadius: 2,
    },
    boxedMiniHeaderText: {
      fontSize: 6.5,
      fontFamily: 'Inter',
      fontWeight: 700,
      letterSpacing: 1.1,
    },
    beforeAfterTwoCol: {
      flexDirection: 'row',
      alignItems: 'stretch',
    },
    beforeAfterColBefore: {
      flex: 1,
      paddingRight: 12,
    },
    beforeAfterColAfter: {
      flex: 1,
      paddingLeft: 12,
      borderLeftWidth: 0.5,
      borderLeftColor: '#E4E4E7',
    },
    beforeAfterBeforeText: {
      fontSize: 9,
      fontFamily: 'Inter',
      fontWeight: 300,
      lineHeight: 1.55,
      color: BRAND.subText,
      fontStyle: 'italic',
    },
    beforeAfterAfterText: {
      fontSize: 9.5,
      fontFamily: 'Source Serif 4',
      fontWeight: 400,
      lineHeight: 1.55,
      color: BRAND.bodyText,
    },
  })

  /** Colored top segments; only the active segment shows its label (Identity Kit nav). */
  function KitNavStrip({ segments, activeId }) {
    return h(
      View,
      { style: S.kitNavRow },
      segments.map((doc, i) => {
        const labelColor = onColor(doc.backgroundColor)
        const isActive = doc.id === activeId
        return h(
          View,
          {
            key: doc.id,
            style: [
              S.kitNavSegment,
              isActive ? S.kitNavSegmentActive : {},
              i > 0 ? { marginLeft: -KIT_NAV_TAB_OVERLAP } : {},
              { backgroundColor: doc.backgroundColor },
            ],
          },
          isActive
            ? h(Text, { style: [S.kitNavActiveLabel, { color: labelColor }] }, doc.label.toUpperCase())
            : null,
        )
      }),
    )
  }

  /** Inter caps eyebrow on a full-bleed color band (section intro). */
  function SectionEyebrowBand({ label, bandColor }) {
    const textColor = onColor(bandColor)
    return h(
      View,
      { style: [S.sectionBand, { backgroundColor: bandColor }] },
      h(Text, { style: [S.sectionBandLabel, { color: textColor }] }, label.toUpperCase()),
    )
  }

  /** Padded content area under a section band. */
  function SectionBody({ children }) {
    return h(View, { style: S.sectionBody }, children)
  }

  /** One “Do” or “Avoid” row: large Source Serif anchor + ✓/✗ lines (formatting only). */
  function DoAvoidLargeWordRow({ anchorWord, lines, bulletSymbol, anchorColor, symbolColor }) {
    const sym = symbolColor ?? anchorColor
    return h(
      View,
      { style: S.doAvoidRow, wrap: false },
      h(View, { style: S.doAvoidWordCol }, h(Text, { style: [S.doAvoidWordDisplay, { color: anchorColor }] }, anchorWord)),
      h(
        View,
        { style: S.doAvoidItemsCol },
        lines.map((line, i) =>
          h(
            View,
            { key: i, style: S.doAvoidItem },
            h(Text, { style: [S.doAvoidSymbol, { color: sym }] }, bulletSymbol),
            h(Text, { style: S.doAvoidItemText }, line),
          ),
        ),
      ),
    )
  }

  /** Two text columns with a vertical hairline (layout-only). */
  function TwoColumnWithVerticalRule({ leftText, rightText }) {
    return h(
      View,
      { style: S.twoColRow },
      h(View, { style: S.twoColLeft }, h(Text, { style: S.twoColBody }, leftText)),
      h(View, { style: S.twoColRule }),
      h(View, { style: S.twoColRight }, h(Text, { style: S.twoColBody }, rightText)),
    )
  }

  /** Label + value chips in a row (tone sliders pattern). */
  function ToneDescriptorChipRow({ chips }) {
    return h(
      View,
      { style: S.toneChipRow },
      chips.map((c) =>
        h(
          View,
          { key: c.label, style: S.toneChip },
          h(Text, { style: S.toneChipLabel }, c.label.toUpperCase()),
          h(Text, { style: S.toneChipValue }, c.value),
        ),
      ),
    )
  }

  /** Rounded pills with accent-colored label text. */
  function ValuePillRow({ pills, accentHex, backgroundColor = '#F4F4F5' }) {
    return h(
      View,
      { style: S.valuePillRow },
      pills.map((p) =>
        h(
          View,
          { key: p, style: [S.valuePill, { backgroundColor }] },
          h(Text, { style: [S.valuePillText, { color: accentHex }] }, p),
        ),
      ),
    )
  }

  /** Optional small caps group label + numbered lines. */
  function NumberedBulletGroup({ groupLabel, lines }) {
    return h(
      View,
      null,
      groupLabel ? h(Text, { style: S.bulletGroupLabel }, groupLabel.toUpperCase()) : null,
      lines.map((line, i) =>
        h(
          View,
          { key: i, style: S.bulletRow },
          h(View, { style: S.bulletNumWrap }, h(Text, { style: S.bulletNum }, String(i + 1).padStart(2, '0'))),
          h(Text, { style: S.bulletText }, line),
        ),
      ),
    )
  }

  /** Small uppercase gray subheader (e.g., typography mini-header / theme pre-row). */
  function MiniCapsHeader({ label, marginBottom = 7 }) {
    return h(Text, { style: [S.miniCapsHeader, { marginBottom }] }, label.toUpperCase())
  }

  /**
   * Messaging-themes pattern from Voice Playbook:
   * uppercase gray row first, then numbered lines below.
   */
  function MessagingThemeNumberedBlock({ preheader, lines }) {
    return h(
      View,
      null,
      h(MiniCapsHeader, { label: preheader }),
      h(NumberedBulletGroup, { lines }),
    )
  }

  /** Boxed mini-header used in Before/After columns (rectangular chip with uppercase label). */
  function BoxedMiniHeader({ label, backgroundColor = '#F4F4F5', textColor = BRAND.subText }) {
    return h(
      View,
      { style: [S.boxedMiniHeaderBand, { backgroundColor }] },
      h(Text, { style: [S.boxedMiniHeaderText, { color: textColor }] }, label.toUpperCase()),
    )
  }

  /** Before/After two-column block with boxed mini-headers; formatting-only, no parser logic. */
  function BeforeAfterColumns({
    beforeLabel = 'Before',
    afterLabel = 'After',
    beforeText,
    afterText,
    beforeHeaderBg = '#F4F4F5',
    beforeHeaderText = BRAND.subText,
    afterHeaderBg = '#E5E7EB',
    afterHeaderText = BRAND.black,
  }) {
    return h(
      View,
      { style: S.beforeAfterTwoCol },
      h(
        View,
        { style: S.beforeAfterColBefore },
        h(BoxedMiniHeader, {
          label: beforeLabel,
          backgroundColor: beforeHeaderBg,
          textColor: beforeHeaderText,
        }),
        h(Text, { style: S.beforeAfterBeforeText }, beforeText),
      ),
      h(
        View,
        { style: S.beforeAfterColAfter },
        h(BoxedMiniHeader, {
          label: afterLabel,
          backgroundColor: afterHeaderBg,
          textColor: afterHeaderText,
        }),
        h(Text, { style: S.beforeAfterAfterText }, afterText),
      ),
    )
  }

  /** Catalog title for reference PDFs: component export name + short hint. */
  function PrimitiveReferenceHeading({ name, description }) {
    return h(
      View,
      { wrap: false },
      h(Text, { style: S.refName }, name),
      h(Text, { style: S.refDesc }, description),
    )
  }

  return {
    FULL_PDF_WIDTH,
    styles: S,
    KitNavStrip,
    SectionEyebrowBand,
    SectionBody,
    DoAvoidLargeWordRow,
    TwoColumnWithVerticalRule,
    ToneDescriptorChipRow,
    ValuePillRow,
    NumberedBulletGroup,
    MiniCapsHeader,
    MessagingThemeNumberedBlock,
    BoxedMiniHeader,
    BeforeAfterColumns,
    PrimitiveReferenceHeading,
  }
}
