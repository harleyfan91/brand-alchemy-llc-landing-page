/** Four foundation PDFs — included in every Identity Kit. */
export const IDENTITY_KIT_FOUNDATION_DELIVERABLES = [
  'Brand Brief',
  'Style Guide',
  'Voice & Content Playbook',
  '30-Day Quick Start Checklist',
] as const;

/** Personalized messaging assets — Pro synthesis, now the standard kit. */
export const IDENTITY_KIT_MESSAGING_DELIVERABLES = [
  'Content Starter Pack',
  'Custom brand summaries (one-liners, elevator pitch, paragraph)',
  'Homepage messaging directions',
  'Social bios (short profile + long About)',
  'Caption starters and content pillar prompts',
  'CTA variations per channel',
  'Email voice templates',
] as const;

/** @deprecated Use IDENTITY_KIT_FOUNDATION_DELIVERABLES */
export const IDENTITY_KIT_CORE_DELIVERABLES = IDENTITY_KIT_FOUNDATION_DELIVERABLES;

/** @deprecated Use IDENTITY_KIT_MESSAGING_DELIVERABLES */
export const IDENTITY_KIT_PRO_ADD_ONS = IDENTITY_KIT_MESSAGING_DELIVERABLES;

export const IDENTITY_KIT_PRICE = '$149';

export const IDENTITY_KIT_BADGE = 'AI-enhanced';

export const IDENTITY_KIT_VALUE_POINTS = [
  'Brand voice that feels like you',
  'Visual direction you can follow',
  'Ready-to-use messaging for everyday marketing',
  'Clear next steps instead of guessing',
] as const;

export const IDENTITY_KIT_PROCESS_STEPS = [
  {
    step: '01',
    title: 'Answer a short guided quiz',
    description: 'Share what your business does, who you serve, and how you want to come across.',
  },
  {
    step: '02',
    title: 'Get your kit delivered',
    description: 'Receive personalized documents that put your brand voice, look, and messaging on paper.',
  },
  {
    step: '03',
    title: 'Use it everywhere you show up',
    description: 'Apply it to your website, posts, offers, and everyday marketing without starting from scratch.',
  },
] as const;

export const IDENTITY_KIT_OUTCOMES = [
  'Write faster with fewer second guesses',
  'Sound more consistent across your marketing',
  'Make decisions with a clearer brand direction',
  'Stop piecing your business identity together one post at a time',
] as const;

export const identityKitOffer = {
  price: IDENTITY_KIT_PRICE,
  badge: IDENTITY_KIT_BADGE,
  summary:
    'One complete kit: your brand foundation on paper, plus personalized messaging you can paste into posts, bios, and your site.',
  foundationFeatures: [...IDENTITY_KIT_FOUNDATION_DELIVERABLES],
  messagingFeatures: [...IDENTITY_KIT_MESSAGING_DELIVERABLES],
} as const;
