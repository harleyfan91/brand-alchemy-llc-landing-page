import {
  CONTENT_PACK_INDUSTRIES,
  type ContentPackIndustrySlug,
} from './contentPackIndustries';

export type { ContentPackIndustrySlug } from './contentPackIndustries';
export { CONTENT_PACK_INDUSTRIES, getContentPackIndustry } from './contentPackIndustries';

export type ContentPackFamily = {
  id: string;
  categoryEyebrow: string;
  title: string;
  price: string;
  summary: string;
  imageUrl: string;
  industries: ContentPackIndustrySlug[];
};

const launchIndustries: ContentPackIndustrySlug[] = CONTENT_PACK_INDUSTRIES.map((item) => item.slug);

/** Burst by Shopify — pack-representative photos (Burst Some Rights Reserved). */
const burstPhoto = (slug: string, width = 800) =>
  `https://burst.shopifycdn.com/photos/${slug}.jpg?width=${width}&format=pjpg`;

/** Unsplash — Unsplash License. */
const unsplashPhoto = (photoPath: string, width = 800) =>
  `https://images.unsplash.com/${photoPath}?w=${width}&q=80&auto=format&fit=crop`;

/**
 * Canonical content-pack catalog for `/guides-and-kits`.
 * One row per pack type; each row surfaces an industry chip per starting vertical.
 * The primitive preview route uses placeholders in `content/digitalProducts.ts`.
 */
export const contentPackFamilies: ContentPackFamily[] = [
  {
    id: 'social',
    categoryEyebrow: 'Social',
    title: 'Social Content Pack',
    price: '$19',
    summary:
      '30 captions for feed and stories — situations and phrasing matched to the industry you choose.',
    imageUrl: unsplashPhoto('photo-1675352161865-27816c76141a'),
    industries: launchIndustries,
  },
  {
    id: 'email-blast',
    categoryEyebrow: 'Email',
    title: 'Email Blast Pack',
    price: '$19',
    summary:
      '15–20 ready-to-send emails for the moments your industry actually faces — matched tone, subject lines, and CTAs.',
    imageUrl: burstPhoto('laptop-from-above'),
    industries: launchIndustries,
  },
  {
    id: 'promo-offer',
    categoryEyebrow: 'Promos',
    title: 'Promo & Offer Pack',
    price: '$19',
    summary:
      '25–30 promo captions for availability, offers, and invites — direct and warm, with language that fits your trade.',
    imageUrl: burstPhoto('black-friday-laptop-screen'),
    industries: launchIndustries,
  },
  {
    id: 'holiday-events',
    categoryEyebrow: 'Holidays & events',
    title: 'Holiday & Events Pack',
    price: '$19',
    summary:
      'Holiday and local-event copy with the details and tone your customers expect from your type of business.',
    imageUrl: unsplashPhoto('photo-1770250959829-de36726e99c4'),
    industries: launchIndustries,
  },
  {
    id: 'core',
    categoryEyebrow: 'Year round',
    title: 'Core Content Pack',
    price: '$29',
    summary:
      'Year-round templates for routine updates — hours, news, and quick posts — written for your industry’s channels.',
    imageUrl: burstPhoto('hand-writes-in-a-notebook-by-a-laptop-and-cellphone'),
    industries: launchIndustries,
  },
  {
    id: 'email-content',
    categoryEyebrow: 'Email',
    title: 'Email Content Pack',
    price: '$29',
    summary:
      'Welcome and follow-up email sequences with industry-appropriate tone — a stronger layer after one-off blasts.',
    imageUrl: burstPhoto('reading-notes-at-work'),
    industries: launchIndustries,
  },
];

export function getContentPackCatalogStats(): {
  industryCount: number;
  familyCount: number;
  skuCount: number;
} {
  const industryCount = CONTENT_PACK_INDUSTRIES.length;
  const familyCount = contentPackFamilies.length;
  const skuCount = contentPackFamilies.reduce((total, family) => total + family.industries.length, 0);
  return { industryCount, familyCount, skuCount };
}
