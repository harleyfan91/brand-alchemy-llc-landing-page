import type { MarketingComparisonCard } from '../components/MarketingComparisonCards';

export const IDENTITY_KIT_CORE_DELIVERABLES = [
  'Brand Brief',
  'Style Guide',
  'Voice & Content Playbook',
  '30-Day Quick Start Checklist',
] as const;

export const IDENTITY_KIT_PRO_ADD_ONS = [
  'Custom brand summaries (one-liners, elevator pitch, paragraph)',
  'Content Starter Pack',
  'Homepage messaging directions',
  'Social bios (short profile + long About)',
  'Caption starters and content pillar prompts',
  'CTA variations per channel',
] as const;

export const IDENTITY_KIT_VALUE_POINTS = [
  'Brand voice that feels like you',
  'Visual direction you can follow',
  'Content guidance for everyday marketing',
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
    description: 'Receive clear, usable documents that put your brand voice and look on paper.',
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

export const identityKitComparisonCards: MarketingComparisonCard[] = [
  {
    name: 'Core',
    price: '$79',
    icon: 'check',
    summary: 'A clear brand foundation with practical documents and next steps you can use right away.',
    features: [...IDENTITY_KIT_CORE_DELIVERABLES],
  },
  {
    name: 'Pro',
    price: '$149',
    tabLabel: 'AI Enhanced',
    emphasis: true,
    icon: 'spark',
    summary:
      'Our flagship kit for a more tailored brand foundation, plus extra content and messaging tools for day-to-day use.',
    features: [
      IDENTITY_KIT_PRO_ADD_ONS[0],
      IDENTITY_KIT_PRO_ADD_ONS[1],
      IDENTITY_KIT_PRO_ADD_ONS[2],
      IDENTITY_KIT_PRO_ADD_ONS[4],
    ],
  },
] as const;
