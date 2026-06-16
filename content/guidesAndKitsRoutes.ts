/** Catalog hub for marketing tools: local launch kits and industry content packs. */
export const GUIDES_AND_KITS_PATH = '/guides-and-kits';

/** Future industry catalog paths, e.g. `/guides-and-kits/salon`. */
export function guidesAndKitsIndustryPath(industrySlug: string): string {
  return `${GUIDES_AND_KITS_PATH}/${industrySlug}`;
}
