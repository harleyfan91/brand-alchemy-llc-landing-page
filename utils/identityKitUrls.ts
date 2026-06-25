/**
 * Identity Kit URLs for marketing site CTAs.
 *
 * - `VITE_IDENTITY_KIT_PRO_START_URL` — preferred direct checkout / intake URL.
 * - `VITE_IDENTITY_KIT_START_URL` — fallback base; `?tier=pro` is appended when needed.
 * - `VITE_IDENTITY_KIT_URL` — base when START is unset (default: kit subdomain root).
 */
export type IdentityKitTier = 'core' | 'pro';

function trimmedEnvValue(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed.replace(/\/$/, '') : undefined;
}

function getIdentityKitBaseUrl(): string {
  const start = trimmedEnvValue(import.meta.env.VITE_IDENTITY_KIT_START_URL as string | undefined);
  if (start) return start;

  return trimmedEnvValue(import.meta.env.VITE_IDENTITY_KIT_URL as string | undefined) || 'https://kit.brandalchemyllc.com';
}

function withTierParam(url: string, tier: IdentityKitTier): string {
  const baseForResolution = typeof window !== 'undefined' ? window.location.href : 'https://brandalchemyllc.com';

  try {
    const parsed = new URL(url, baseForResolution);
    parsed.searchParams.set('tier', tier);
    if (/^https?:\/\//.test(url)) return parsed.toString();
    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return url;
  }
}

/** Checkout / intake URL for the single Identity Kit offer (Pro tier in the kit app). */
export function getIdentityKitStartUrl(): string {
  const proDirect = trimmedEnvValue(import.meta.env.VITE_IDENTITY_KIT_PRO_START_URL as string | undefined);
  if (proDirect) return proDirect;

  return withTierParam(getIdentityKitBaseUrl(), 'pro');
}

/** Tier-specific URLs — Core is archived on the marketing site; only Pro is sold. */
export function getIdentityKitTierStartUrl(tier: IdentityKitTier): string {
  const directTierUrl =
    tier === 'core'
      ? trimmedEnvValue(import.meta.env.VITE_IDENTITY_KIT_CORE_START_URL as string | undefined)
      : trimmedEnvValue(import.meta.env.VITE_IDENTITY_KIT_PRO_START_URL as string | undefined);
  if (directTierUrl) return directTierUrl;

  return withTierParam(getIdentityKitBaseUrl(), tier);
}

export function isExternalToCurrentOrigin(url: string): boolean {
  if (typeof window === 'undefined') return true;
  try {
    return new URL(url, window.location.href).origin !== window.location.origin;
  } catch {
    return true;
  }
}
