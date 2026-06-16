/** Starting industries for industry-specific content packs — see `DIGITAL_PRODUCT_CONTENT_SCHEMA.md`. */
export type ContentPackIndustrySlug = 'salon' | 'cafes' | 'home-services';

export type ContentPackIndustry = {
  slug: ContentPackIndustrySlug;
  /** Compact chip heading (may wrap on two lines in UI). */
  label: string;
  /** Short tag for compact catalog cards. */
  shortLabel: string;
};

export const CONTENT_PACK_INDUSTRIES: ContentPackIndustry[] = [
  { slug: 'salon', label: 'Salons & Beauty', shortLabel: 'Salons' },
  { slug: 'cafes', label: 'Cafés & Coffee Shops', shortLabel: 'Cafés' },
  { slug: 'home-services', label: 'Home Services', shortLabel: 'Home svcs' },
];

export function getContentPackIndustry(slug: ContentPackIndustrySlug): ContentPackIndustry {
  const industry = CONTENT_PACK_INDUSTRIES.find((item) => item.slug === slug);
  if (!industry) throw new Error(`Unknown content pack industry: ${slug}`);
  return industry;
}
