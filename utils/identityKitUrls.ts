/**
 * Identity Kit URLs for marketing site CTAs.
 *
 * - `VITE_IDENTITY_KIT_START_URL` — full URL to begin the intake app (e.g. same-domain path after Cloudflare routing, or kit subdomain).
 * - `VITE_IDENTITY_KIT_URL` — fallback base when START is unset (default: kit subdomain root).
 * - `VITE_IDENTITY_KIT_CORE_START_URL` / `VITE_IDENTITY_KIT_PRO_START_URL` — optional direct tier URLs for the selector page.
 */
export type IdentityKitTier = 'core' | 'pro';

function trimmedEnvValue(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed.replace(/\/$/, '') : undefined;
}

export function getIdentityKitStartUrl(): string {
  const start = trimmedEnvValue(import.meta.env.VITE_IDENTITY_KIT_START_URL as string | undefined);
  if (start) return start;

  return trimmedEnvValue(import.meta.env.VITE_IDENTITY_KIT_URL as string | undefined) || 'https://kit.brandalchemyllc.com';
}

export function getIdentityKitTierStartUrl(tier: IdentityKitTier): string {
  const directTierUrl =
    tier === 'core'
      ? trimmedEnvValue(import.meta.env.VITE_IDENTITY_KIT_CORE_START_URL as string | undefined)
      : trimmedEnvValue(import.meta.env.VITE_IDENTITY_KIT_PRO_START_URL as string | undefined);
  if (directTierUrl) return directTierUrl;

  const startUrl = getIdentityKitStartUrl();
  const baseForResolution = typeof window !== 'undefined' ? window.location.href : 'https://brandalchemyllc.com';

  try {
    const url = new URL(startUrl, baseForResolution);
    url.searchParams.set('tier', tier);
    if (/^https?:\/\//.test(startUrl)) return url.toString();
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return startUrl;
  }
}

export function isExternalToCurrentOrigin(url: string): boolean {
  if (typeof window === 'undefined') return true;
  try {
    return new URL(url, window.location.href).origin !== window.location.origin;
  } catch {
    return true;
  }
}
