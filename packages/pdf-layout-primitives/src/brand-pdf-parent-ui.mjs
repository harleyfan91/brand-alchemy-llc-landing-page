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
  /** Tailwind-aligned grays from brand tokens (nav segment ramp, borders, etc.) */
  gray900: '#111827',
  gray700: '#374151',
  gray600: '#4b5563',
  gray500: '#6b7280',
  gray300: '#d1d5db',
  gray200: '#e5e7eb',
  gray100: '#f3f4f6',
  /** Four-step ramp for KitNavStrip demos (darkest → lightest) */
  navSegmentRamp: ['#111827', '#374151', '#6b7280', '#d1d5db'],
  /** “Do” large word — same as `BRAND_PDF_COLORS.black` */
  doAnchor: '#111111',
  /** “Avoid” large word — stays in gray family (not semantic red unless you choose) */
  avoidAnchor: '#4b5563',
  /** Value pill text on light fill — primary emphasis */
  pillText: '#000000',
}
