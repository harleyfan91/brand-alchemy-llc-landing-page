import type { DigitalProductPageContent } from '../components/DigitalProductPage';

export const productPagePrimitivesPreviewPage: DigitalProductPageContent = {
  slug: 'product-page-primitives',
  breadcrumbLabel: 'Product page primitives',
  categoryLabel: 'Digital products',
  title: 'Local Launch Kits',
  subtitle:
    'Choose a practical kit built for busy owners. Start with the package that fixes your next bottleneck and add more only when you need it.',
  quickFacts: ['Instant download', 'Plain-language steps', 'No agency retainer', 'Use with or without Identity Kit'],
  packageSectionTitle: 'Choose your package',
  showPrimitiveGallery: true,
  /** Layout-only placeholders for `ProductPhotoGridPrimitive` on `/product-page-primitives`. Real SKU copy lives in `content/contentPacks.ts`. */
  photoGridPreviewItems: [
    {
      title: 'Sample product card (long title wraps)',
      subtitle: 'Eyebrow',
      price: '$29',
      description:
        'Neutral placeholder copy to preview image ratio, price alignment, and body text in the photo grid. Not a live product.',
      imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=900',
    },
    {
      title: 'Second sample card',
      subtitle: 'Category',
      price: '$39',
      description: 'Second tile for responsive columns (e.g. two-up on tablet, four-up when the real page shows four packs).',
      imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=900',
    },
  ],
  singleOfferPreview: {
    name: 'Standalone Audit',
    price: '$29',
    summary: 'A single-SKU example for previewing the standalone tile primitive.',
    bullets: ['Quick baseline scorecard', 'Top 3 priority fixes', 'Action list for this week'],
    ctaLabel: 'Choose Standalone Audit',
  },
  matrixColumns: [
    {
      name: 'Google',
      summary: 'Google-focused kit options with a light tier and a fuller tier.',
      options: [
        {
          name: 'Core',
          price: '$39',
          bullets: ['Profile walkthrough', 'Review templates', 'Listing tips', 'Worksheets'],
          ctaLabel: 'Choose Google Core',
        },
        {
          name: 'Pro',
          price: '$79',
          bullets: ['Everything in Core', 'Ad prompts', 'Performance tracker'],
          ctaLabel: 'Choose Google Pro',
        },
      ],
    },
    {
      name: 'Yelp',
      summary: 'Yelp-focused kit options with matching Core and Pro choices.',
      options: [
        {
          name: 'Core',
          price: '$39',
          bullets: ['Profile walkthrough', 'Review templates', 'Listing tips', 'Worksheets'],
          ctaLabel: 'Choose Yelp Core',
        },
        {
          name: 'Pro',
          price: '$79',
          bullets: ['Everything in Core', 'Ad prompts', 'Performance tracker'],
          ctaLabel: 'Choose Yelp Pro',
        },
      ],
    },
    {
      name: 'Both',
      teaser: 'Bundle $129',
      summary: 'Bundle option spanning both platforms.',
      options: [
        {
          name: 'Bundle',
          price: '$129',
          bullets: ['Google + Yelp assets', 'Unified workflow', 'Combined tracker'],
          ctaLabel: 'Choose Bundle',
        },
      ],
    },
  ],
  packages: [
    {
      name: 'Google',
      price: '$39',
      summary: 'Google-focused templates and workflows for profile quality and review response consistency.',
      bullets: ['Profile walkthrough', 'Review reply templates', 'Listing tips', 'Worksheets'],
      ctaLabel: 'Choose Google',
    },
    {
      name: 'Yelp',
      price: '$39',
      summary: 'Yelp-focused templates and workflows for better profile clarity and response speed.',
      bullets: ['Profile walkthrough', 'Review reply templates', 'Listing tips', 'Worksheets'],
      ctaLabel: 'Choose Yelp',
    },
    {
      name: 'Both',
      price: '$79',
      summary: 'Combined package for teams who want one playbook across both Google and Yelp.',
      bullets: ['Google + Yelp templates', 'Unified content workflow', 'Performance tracker', 'Monthly optimization workflow'],
      emphasis: true,
      ctaLabel: 'Choose Both',
    },
  ],
  includedTitle: 'What is included',
  includedBullets: [
    'Step-by-step implementation instructions',
    'Fill-in templates you can adapt quickly',
    'Clear examples so you are not guessing',
    'Download-ready PDF assets',
  ],
  outcomesTitle: 'What this helps you do',
  outcomesBullets: [
    'Publish with more consistency week to week',
    'Respond faster to reviews and inquiries',
    'Improve profile quality across platforms',
    'Reduce time spent figuring out what to post',
  ],
  forYouTitle: 'This is for you if',
  forYouBullets: [
    'You run a small business and need practical assets',
    'You want clarity without hiring an agency',
    'You prefer checklists over long theory',
  ],
  notForYouTitle: 'This is not for you if',
  notForYouBullets: [
    'You are looking for done-for-you monthly management',
    'You want guaranteed ranking outcomes',
    'You need a custom enterprise implementation',
  ],
  faqs: [
    {
      question: 'Do I need the Identity Kit first?',
      answer: 'No. It helps, but each product includes standalone guidance so you can begin now and layer Identity Kit later.',
    },
    {
      question: 'How fast will I receive the product?',
      answer: 'Delivery is digital. You get access right after checkout in the fulfillment flow.',
    },
    {
      question: 'Can I start with Core and upgrade later?',
      answer: 'Yes. Start with the package that matches your current need, then move up when you want deeper support.',
    },
  ],
  primaryCta: {
    href: '#',
    label: 'Pick my kit',
  },
  secondaryCta: {
    href: '#',
    label: 'View sample',
  },
  legalNote:
    'Template preview only. Final product details, checkout links, and guarantees will be configured per SKU.',
};
