import type { ContentPackIndustrySlug } from '../content/contentPacks';

function envUrl(key: string): string | undefined {
  const raw = import.meta.env[key] as string | undefined;
  const t = raw?.trim();
  return t || undefined;
}

/**
 * Per-SKU checkout URLs for content packs (`familyId` × `industrySlug`).
 * Set env vars when a pack is live; omitted → UI shows “Coming soon” for that combo.
 *
 * Example: `VITE_CONTENT_PACK_SOCIAL_CAFES_CHECKOUT_URL`
 */
const CHECKOUT_ENV_KEYS: Partial<Record<string, Partial<Record<ContentPackIndustrySlug, string>>>> = {
  social: {
    salon: 'VITE_CONTENT_PACK_SOCIAL_SALON_CHECKOUT_URL',
    cafes: 'VITE_CONTENT_PACK_SOCIAL_CAFES_CHECKOUT_URL',
    'home-services': 'VITE_CONTENT_PACK_SOCIAL_HOME_SERVICES_CHECKOUT_URL',
  },
  'email-blast': {
    salon: 'VITE_CONTENT_PACK_EMAIL_BLAST_SALON_CHECKOUT_URL',
    cafes: 'VITE_CONTENT_PACK_EMAIL_BLAST_CAFES_CHECKOUT_URL',
    'home-services': 'VITE_CONTENT_PACK_EMAIL_BLAST_HOME_SERVICES_CHECKOUT_URL',
  },
  'promo-offer': {
    salon: 'VITE_CONTENT_PACK_PROMO_OFFER_SALON_CHECKOUT_URL',
    cafes: 'VITE_CONTENT_PACK_PROMO_OFFER_CAFES_CHECKOUT_URL',
    'home-services': 'VITE_CONTENT_PACK_PROMO_OFFER_HOME_SERVICES_CHECKOUT_URL',
  },
  'holiday-events': {
    salon: 'VITE_CONTENT_PACK_HOLIDAY_EVENTS_SALON_CHECKOUT_URL',
    cafes: 'VITE_CONTENT_PACK_HOLIDAY_EVENTS_CAFES_CHECKOUT_URL',
    'home-services': 'VITE_CONTENT_PACK_HOLIDAY_EVENTS_HOME_SERVICES_CHECKOUT_URL',
  },
  core: {
    salon: 'VITE_CONTENT_PACK_CORE_SALON_CHECKOUT_URL',
    cafes: 'VITE_CONTENT_PACK_CORE_CAFES_CHECKOUT_URL',
    'home-services': 'VITE_CONTENT_PACK_CORE_HOME_SERVICES_CHECKOUT_URL',
  },
  'email-content': {
    salon: 'VITE_CONTENT_PACK_EMAIL_CONTENT_SALON_CHECKOUT_URL',
    cafes: 'VITE_CONTENT_PACK_EMAIL_CONTENT_CAFES_CHECKOUT_URL',
    'home-services': 'VITE_CONTENT_PACK_EMAIL_CONTENT_HOME_SERVICES_CHECKOUT_URL',
  },
};

export function getContentPackCheckoutHref(
  familyId: string,
  industrySlug: ContentPackIndustrySlug,
): string | null {
  const envKey = CHECKOUT_ENV_KEYS[familyId]?.[industrySlug];
  if (!envKey) return null;
  return envUrl(envKey) ?? null;
}
