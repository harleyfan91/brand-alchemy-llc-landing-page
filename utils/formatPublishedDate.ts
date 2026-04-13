/**
 * Formats a YYYY-MM-DD date string for article chrome (local calendar date, no UTC shift).
 */
export function formatPublishedDate(isoDate: string): string {
  const parts = isoDate.trim().split('-').map((p) => parseInt(p, 10));
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) {
    return isoDate;
  }
  const [y, m, d] = parts;
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}
