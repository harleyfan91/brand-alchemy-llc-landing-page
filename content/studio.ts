/** Studio consulting page — copy and offer data (handoff spec). */

export const STUDIO_CONTACT_EMAIL = 'info@brandalchemyllc.com';

/** Replace with live Instagram profile URL when available. */
export const STUDIO_INSTAGRAM_URL = 'https://instagram.com/brandalchemy_studio';

/**
 * Intake form URL. Set this to your Tally, Typeform, or equivalent link before launch.
 * Leave empty ('') to fall back to a mailto inquiry automatically.
 */
export const STUDIO_INTAKE_FORM_URL = '';

/**
 * Resolves to the external form URL if set, otherwise falls back to the internal
 * /studio/intake page. Use STUDIO_INQUIRY_IS_EXTERNAL to decide whether to render
 * a <Link> (internal) or <a target="_blank"> (external).
 */
export const STUDIO_INQUIRY_HREF = STUDIO_INTAKE_FORM_URL || '/studio/intake';
export const STUDIO_INQUIRY_IS_EXTERNAL = STUDIO_INQUIRY_HREF.startsWith('http');

export const STUDIO_SPRINTS = [
  {
    id: 'campaign-growth',
    name: 'The Campaign & Growth Architecture Sprint',
    price: '$8,500',
    /** Portfolio rate for first two clients. Set to null when filled. */
    launchPrice: '$3,500',
    duration: '6 weeks',
    format: '60-min discovery call · 6-week advisory',
    /** Strategic advisory work included in this sprint. */
    advisory: [
      'Paid Media Diagnostic',
      'Launch Campaign Planning',
      'Partnership & Co-Marketing Readiness',
      'Brand & Channel Audit',
    ],
    /** Documented tools and frameworks you keep after the sprint. */
    tools: [
      'Paid Media Diagnostic Report',
      'Launch Campaign Framework',
      'Partnership Readiness Assessment',
      'Brand & Channel Audit',
    ],
    entryPoint:
      'DTC or omnichannel brand at $1M–$5M revenue, at least one completed drop or launch cycle, and active paid media spend of $3K–$5K/month or more.',
  },
  {
    id: 'visibility-acquisition',
    name: 'The Visibility & Client Acquisition Sprint',
    price: '$11,000',
    /** Portfolio rate for first two clients. Set to null when filled. */
    launchPrice: '$4,500',
    duration: '6 weeks',
    format: '60-min discovery call · 2-day on-site diagnostic · 6-week advisory',
    /** Strategic advisory work included in this sprint. */
    advisory: [
      'Local Visibility Audit',
      'Client Acquisition Channel Map',
      'Paid Media Foundation',
      'Content & Community Strategy',
      'Partnership & Referral Architecture',
    ],
    /** Documented tools and frameworks you keep after the sprint. */
    tools: [
      'Local Visibility Audit & Action Plan',
      'Client Acquisition Channel Map',
      'Paid Media Foundation Brief',
      'Content & Community Strategy Framework',
      'Partnership & Referral Architecture',
    ],
    entryPoint:
      'Tattoo studio, piercing boutique, or alternative hair collective with $750K+ gross revenue, 3+ artists, and a clear gap between craft quality and how the business acquires clients.',
  },
] as const;

export const STUDIO_RETAINER = {
  name: 'The Baseline Retainer',
  price: '$3,000 / mo',
  terms: '90-day minimum · ~10 hrs access',
  scope: [
    'Paid Media Budget Review — monthly review of ad spend allocation, channel performance, and waste identification',
    'Launch Calendar & Campaign Readiness — quarterly roadmap reviews, launch gate decisions, and creative readiness checks',
    'Partnership Opportunity Evaluation — structured review of incoming collabs, sponsorships, and co-marketing deals',
    'Brand Equity Protection — flagging decisions that risk cultural authenticity or long-term positioning',
    'Monthly Strategic Briefing — 60-minute structured call with written summary and decision log',
  ],
  addOns: [
    {
      name: 'Fully Managed Execution Layer',
      price: '+$1,500/mo',
      note: 'Dedicated coordinator for strategy execution — social scheduling, email deployment, ad monitoring under Brand Alchemy oversight',
    },
  ],
} as const;

/** Zoomed-out delivery model — shown above package cards on /studio. */
export const STUDIO_HOW_IT_WORKS = {
  eyebrow: 'How we get you there',
  headline: ['Six weeks alongside you.', 'Systems your team keeps.'],
  body:
    'It starts with a discovery call to learn about your business. Then we spend six weeks inside your business: we map what is broken, build the tools and frameworks to fix it, and hand them off ready for your team to run. Real systems, not a word document that sits in a folder.',
} as const;
