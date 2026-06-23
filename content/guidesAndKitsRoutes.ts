/** Dedicated page for local ranking kits (Google, Yelp, bundle). */
export const GUIDES_AND_KITS_PATH = '/local-kits';

/** Future industry-specific kit paths, e.g. `/local-kits/salon`. */
export function guidesAndKitsIndustryPath(industrySlug: string): string {
  return `${GUIDES_AND_KITS_PATH}/${industrySlug}`;
}
