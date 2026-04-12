/**
 * Parent-brand PDF chrome (umbrella Brand Alchemy), **not** Identity Kit customer palettes.
 *
 * Hex values mirror `public/brand-tokens.css` in the marketing repo (`--ba-gray-*`, `--ba-color-primary`).
 * Identity Kit’s Core PDFs use **`BRAND_PDF_COLORS`** for body copy and **survey-driven palette swatches**
 * (e.g. ocean, forest) for nav strips and section bands — that’s product personalization, not corporate color.
 *
 * For lead magnets and company-owned PDFs, prefer these neutrals + black primary chrome.
 */
export const BRAND_PDF_PARENT_UI = {
  /** Primary chrome — matches `--ba-color-primary` */
  primary: '#000000',
  /** Cool slate gray ramp from brand tokens (nav segment ramp, borders, etc.) */
  gray900: '#1e2530',
  gray700: '#3d4654',
  gray600: '#525c6a',
  gray500: '#6d7a8a',
  gray300: '#b4bec9',
  gray200: '#d2dae4',
  gray100: '#e8ecf1',
  /** Four-step ramp for KitNavStrip demos (darkest → lightest) */
  navSegmentRamp: ['#1e2530', '#3d4654', '#6d7a8a', '#b4bec9'],
  /** “Do” large word — same as `BRAND_PDF_COLORS.black` */
  doAnchor: '#111111',
  /** “Avoid” large word — stays in gray family (not semantic red unless you choose) */
  avoidAnchor: '#525c6a',
  /** Value pill text on light fill — primary emphasis */
  pillText: '#000000',
}
