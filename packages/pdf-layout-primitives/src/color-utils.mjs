/** WCAG-style luminance check for tab label contrast on colored nav segments. */
export function isDark(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance < 0.55
}

/** Text color on a solid hex background (Identity Kit PDF pattern). */
export function onColor(hex) {
  return isDark(hex) ? '#FFFFFF' : '#111111'
}
