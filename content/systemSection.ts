/** Homepage System section — intro copy, hero band image, and three text steps. */
export const SYSTEM_SECTION_IMAGE = {
  src: '/homepage-assets/system-section-hero.jpg',
  alt: 'Modern independent café interior — geometric wood counter and angular light',
  /** Crop anchor for `object-cover` — keeps counter depth in frame for text overlay. */
  objectPosition: 'center 55%',
} as const;

/** `full` = natural color. `muted` = toned like product-card watermarks (grayscale, softer). Chosen: muted. */
export type SystemSectionImageTreatment = 'full' | 'muted';

/** Homepage System hero band — muted ties the band to product-card watermark tone. */
export const SYSTEM_SECTION_IMAGE_TREATMENT: SystemSectionImageTreatment = 'muted';

export const SYSTEM_SECTION_INTRO = {
  eyebrow: 'System',
  title: 'Promote your brand like the pros.',
  support:
    'Most cafés, restaurants, salons, and boutiques already do something worth talking about. What\'s missing is a consistent way to show it — a brand voice, a strong listing, and tools that do not require a marketing background.',
} as const;

export type SystemStep = {
  step: string;
  title: string;
  description: string;
};

export const SYSTEM_STEPS: SystemStep[] = [
  {
    step: '01',
    title: 'Define your brand',
    description:
      'Start with Identity Kit. Answer a focused set of questions and receive your brand voice, visual direction, and a clear starting point — on paper, ready to use.',
  },
  {
    step: '02',
    title: 'Get found locally',
    description:
      'Local launch kits for Google and Yelp walk you through setup step by step, with review templates and listing tips built in. Most businesses set this up once and benefit for years.',
  },
  {
    step: '03',
    title: 'Show up consistently',
    description:
      'With your brand defined and your listings in place, the hard part is posting and promoting without losing the thread. More tools are coming to make that easier.',
  },
];
