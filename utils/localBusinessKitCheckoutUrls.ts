/**
 * Checkout URLs for Guides & launch kits matrix (Google / Yelp / bundle).
 * Set in `.env` when a SKU is live; omitted env → no link (UI shows “Coming soon”).
 *
 * Column index: 0 = Google, 1 = Yelp, 2 = Both (bundle).
 * Option index: 0 = Core or Bundle, 1 = Pro (Google/Yelp only).
 */
function envUrl(key: string): string | undefined {
  const raw = import.meta.env[key] as string | undefined;
  const t = raw?.trim();
  return t || undefined;
}

export function getLocalBusinessKitCheckoutHref(columnIndex: number, optionIndex: number): string | null {
  const googleCore = envUrl('VITE_GOOGLE_CORE_KIT_CHECKOUT_URL');
  const googlePro = envUrl('VITE_GOOGLE_PRO_KIT_CHECKOUT_URL');
  const yelpCore = envUrl('VITE_YELP_CORE_KIT_CHECKOUT_URL');
  const yelpPro = envUrl('VITE_YELP_PRO_KIT_CHECKOUT_URL');
  const bundle = envUrl('VITE_LOCAL_KITS_BUNDLE_CHECKOUT_URL');

  if (columnIndex === 0) {
    if (optionIndex === 0) return googleCore ?? null;
    return googlePro ?? null;
  }
  if (columnIndex === 1) {
    if (optionIndex === 0) return yelpCore ?? null;
    return yelpPro ?? null;
  }
  if (columnIndex === 2) {
    return bundle ?? null;
  }
  return null;
}
