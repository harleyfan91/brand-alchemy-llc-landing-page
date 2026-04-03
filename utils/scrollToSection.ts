/**
 * Scroll to an in-page section using its CSS scroll-margin (e.g. scroll-mt-20).
 * (Viewport scroll-snap was removed: it conflicted with programmatic scroll on mobile WebKit.)
 */
export function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}
