/**
 * Shared rules for “this href is a real checkout / next step” vs placeholder.
 */
export function normalizeCheckoutHref(href: string | null | undefined): string | null {
  const t = href?.trim();
  if (!t || t === '#') return null;
  if (t.toLowerCase().startsWith('javascript:')) return null;
  return t;
}

export function checkoutOpensInNewTab(href: string): boolean {
  if (typeof window === 'undefined') return true;
  try {
    return new URL(href, window.location.href).origin !== window.location.origin;
  } catch {
    return true;
  }
}
