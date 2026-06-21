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
    id: 'drop-allocation',
    name: 'The Drop & Allocation Strategy',
    price: '$10,000',
    /** Reduced rate for first-time clients in this category. Set to null when filled. */
    launchPrice: '$4,000',
    duration: '6 weeks',
    format: '60-min discovery call · 6-week advisory',
    /** Strategic advisory work included in this engagement. */
    advisory: [
      'CAC & Channel ROI Audit',
      'Paid Media Funnel Architecture',
      'Brand Alliance Blueprinting',
      'Anti-Bot & Scarcity Strategy',
      'Drop Allocation Framework Design',
      'Post-Drop Debrief Facilitation',
    ],
    /** Documented tools and frameworks you keep after the engagement. */
    tools: [
      'Multi-Channel Allocation Matrix',
      'Media Budget Pacing Matrix',
      'Brand Alliance Pitch Ledger',
      '90-Day Backward Launch Timeline',
      'Anti-Bot & Scarcity Fairness Protocol',
      '3PL / Warehouse SLA Checklist',
      'Post-Drop Debrief Template',
    ],
    entryPoint:
      'Brand has completed at least one drop cycle and has real revenue data. Chaos is documented, even if unsystematized.',
  },
  {
    id: 'capacity-intake',
    name: 'The Capacity & Intake Strategy',
    price: '$8,500',
    /** Reduced rate for first-time clients in this category. Set to null when filled. */
    launchPrice: '$3,500',
    duration: '6 weeks',
    format: '60-min discovery call · 6-week advisory',
    /** Strategic advisory work included in this engagement. */
    advisory: [
      'Intake System Design',
      'Local Intent Media Architecture',
      'Subculture Sponsorship Governance',
      'Deposit & No-Show Strategy',
      'Chair Capacity Analysis',
      'Local Trust & Referral Audit',
    ],
    /** Documented tools and frameworks you keep after the engagement. */
    tools: [
      'Client Assurance Intake Pipeline',
      'Hyper-Local Media Map',
      'Activation & Sponsorship Checklist',
      'Tiered Non-Refundable Deposit Matrix',
      'No-Show Elimination Protocol',
      'Artist Continuity Data Program',
      'Chair Capacity Optimization Dashboard',
    ],
    entryPoint:
      'Studio has 3+ artists, is fully booked inconsistently, and has never systematized their intake or deposit process.',
  },
] as const;

export const STUDIO_RETAINER = {
  name: 'The Baseline Retainer',
  price: '$3,000 / mo',
  terms: '90-day minimum · ~10 hrs access',
  scope: [
    'Paid Media Budget Audit — monthly review of ad spend allocation, channel ROI, and waste identification',
    'Lifecycle Email & SMS Strategy — content architecture and send cadence recommendations',
    'Launch Calendar Governance — quarterly roadmap reviews, launch gate decisions, and timing recommendations',
    'Vendor & Supplier Interception — contract review, SLA accountability, and escalation frameworks',
    'Brand Equity Protection — flagging decisions that risk cultural authenticity or long-term positioning',
    'Monthly Strategic Briefing — 60-minute structured call with written summary and decision log',
  ],
  addOns: [
    { name: 'Premium On-Site Upgrade', price: '+$2,500', note: '3–4 day on-site deep dive' },
    { name: 'Brand Asset Refresh', price: '$2,500', note: 'Visual modernization with creative direction' },
    { name: 'Fully Managed Execution Layer', price: '+$1,500/mo', note: 'Dedicated coordinator for strategy execution' },
  ],
} as const;


export const STUDIO_WHAT_YOU_RECEIVE = [
  'Frameworks and governance systems delivered as living documents — allocation matrices, intake pipelines, launch timelines',
  'Structured working sessions — two per week during your strategy, monthly briefings on retainer',
  'A decision log that stays with the business — every recommendation documented so your team can execute without you on the call',
] as const;
