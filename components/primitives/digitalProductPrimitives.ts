export const DIGITAL_PRODUCT_PRIMITIVES = {
  HERO: 'digital-product.hero',
  SINGLE_OFFER_TILE: 'digital-product.single-offer-tile',
  OFFER_MATRIX: 'digital-product.offer-matrix',
  DETAILS_LISTS: 'digital-product.details-lists',
  FAQ: 'digital-product.faq',
  FINAL_CTA: 'digital-product.final-cta',
} as const;

export type DigitalProductPrimitiveName =
  (typeof DIGITAL_PRODUCT_PRIMITIVES)[keyof typeof DIGITAL_PRODUCT_PRIMITIVES];
