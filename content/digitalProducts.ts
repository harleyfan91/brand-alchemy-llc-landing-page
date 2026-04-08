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
  photoGridPreviewItems: [
    {
      title: 'Seasonal Industry Photo Angles',
      subtitle: '9-Angle PDF Guide',
      price: '$7',
      description: 'Niche-specific framing examples for seasonal demand periods.',
      imageUrl: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&q=80&w=900',
    },
    {
      title: 'Social Post Starters',
      subtitle: 'Captions & Ideas',
      price: '$19',
      description: 'Image-led card example for smaller standalone digital products.',
      imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=900',
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
          bullets: ['Profile checklist', 'Review templates', 'Photo guide'],
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
          bullets: ['Profile checklist', 'Review templates', 'Photo guide'],
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
      bullets: ['Google profile checklist', 'Review reply templates', 'Photo angle guide', 'Weekly action checklist'],
      ctaLabel: 'Choose Google',
    },
    {
      name: 'Yelp',
      price: '$39',
      summary: 'Yelp-focused templates and workflows for better profile clarity and response speed.',
      bullets: ['Yelp profile checklist', 'Review reply templates', 'Photo angle guide', 'Weekly action checklist'],
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
