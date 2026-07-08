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

/** Primary conversion CTA — starts intake; payment comes after the quiz. */
export const IDENTITY_KIT_CTA_LABEL = 'Start my Identity Kit';

/** Shown near hero CTA — price on page, not in the button. */
export const IDENTITY_KIT_PRICE_LINE = `One-time · ${IDENTITY_KIT_PRICE}`;

/** @deprecated Sales page no longer shows a hero badge — customization lives in value-prop copy. */
export const IDENTITY_KIT_BADGE = 'AI-enhanced';

const unsplashPhoto = (photoPath: string, width = 1600) =>
  `https://images.unsplash.com/${photoPath}?w=${width}&q=80&auto=format&fit=crop`;

/** Single full-bleed band — swap for PDF composite when fulfillment crops are ready. */
export const IDENTITY_KIT_HERO_BAND_IMAGE = {
  imageUrl: '/pdf-assets/social-content-pack-cafe-cover.jpg',
  imageAlt: 'Independent café counter and espresso setup',
};

export const IDENTITY_KIT_HERO_BAND_INDUSTRIES = ['Café', 'Salon', 'Restaurant', 'Boutique'] as const;

export const IDENTITY_KIT_PAIN_HEADING = 'Your brand should feel like you everywhere you show up.';

export const IDENTITY_KIT_PAIN_POINTS = [
  {
    title: 'Voice drift',
    line: 'You know your business. Your posts do not always show it.',
  },
  {
    title: 'No through-line',
    line: 'One week you sound professional; the next, generic. Customers cannot tell it is you.',
  },
  {
    title: 'Marketing on the side',
    line: 'You are great at the work. Promotion still feels like a second job.',
  },
] as const;

export const IDENTITY_KIT_HERO_SUBLINE =
  'A full brand kit and style guide for cafés, restaurants, salons, and boutique shops. Our short guided quiz transforms professional marketing practices into an easy-to-use brand system that helps customers choose you, over the competition.';

export const IDENTITY_KIT_VOICE_SECTION = {
  eyebrow: 'Your voice, not a template',
  title: 'Posts that sound like you, not like everyone else.',
} as const;

export const IDENTITY_KIT_WEEKLY_SECTION = {
  eyebrow: 'What changes this week',
  title: 'Marketing that pulls its weight.',
  support: 'Posts, profiles and listing copy that give people a reason to visit, not just scroll past.',
} as const;

export const IDENTITY_KIT_WEEKLY_USES = [
  'A profile that helps someone nearby pick you today',
  'Posts that move a new item or slow day, not just fill the feed',
  'Review replies that turn attention into trust',
  'Promo copy ready when you need to post something, without starting over',
] as const;

export interface IdentityKitVoiceMockupSlot {
  label: string;
  /** Caption to composite on-screen in the final designed mock */
  caption: string;
  placeholderImageUrl: string;
  placeholderImageAlt: string;
}

export interface IdentityKitVoiceExample {
  industry: string;
  generic: string;
  kit: string;
  genericMockup: IdentityKitVoiceMockupSlot;
  kitMockup: IdentityKitVoiceMockupSlot;
}

/**
 * Voice compare — post mockups (sales page §3).
 *
 * PATTERN: One "after" mock per industry (kit copy on screen). Generic "before" copy lives in a
 * bubble beside the mock — no hover interaction needed.
 *
 * FINAL ASSETS: Instagram-style feed post on phone (portrait crop). Caption legible on screen.
 */
export const IDENTITY_KIT_VOICE_EXAMPLES: IdentityKitVoiceExample[] = [
  {
    industry: 'Café',
    generic: '✨ New menu item alert! Come try our amazing new latte! #coffee #cafelife',
    kit: 'Sitting with this one. New seasonal latte — cardamom and oat. On the board this week.',
    genericMockup: {
      label: 'Generic template',
      caption: '✨ New menu item alert! Come try our amazing new latte! #coffee #cafelife',
      placeholderImageUrl: unsplashPhoto('photo-1511707171634-5f897ff02aa9', 800),
      placeholderImageAlt: 'Phone on a café counter — placeholder until IG post mock',
    },
    kitMockup: {
      label: 'From your kit',
      caption: 'Sitting with this one. New seasonal latte — cardamom and oat. On the board this week.',
      placeholderImageUrl: unsplashPhoto('photo-1556742049-0cfed4f6a45d', 800),
      placeholderImageAlt: 'Person using a phone — placeholder until IG post mock',
    },
  },
  {
    industry: 'Salon',
    generic: 'Book your appointment today! We cannot wait to see you! 💇‍♀️✨',
    kit: 'If you are thinking about a change, we talk it through first. No surprises.',
    genericMockup: {
      label: 'Generic template',
      caption: 'Book your appointment today! We cannot wait to see you! 💇‍♀️✨',
      placeholderImageUrl: unsplashPhoto('photo-1611162616475-46b635cb6848', 800),
      placeholderImageAlt: 'Close-up of phone screen — placeholder until IG post mock',
    },
    kitMockup: {
      label: 'From your kit',
      caption: 'If you are thinking about a change, we talk it through first. No surprises.',
      placeholderImageUrl: unsplashPhoto('photo-1522204217468-aa7217b83705', 800),
      placeholderImageAlt: 'Salon owner using phone — placeholder until IG post mock',
    },
  },
  {
    industry: 'Restaurant',
    generic: '🍽️ BEST BURGER IN TOWN!! Come hungry, leave happy! #foodie #yum',
    kit: 'Thursday special: slow-braised short rib, small batch. When it is gone, it is gone.',
    genericMockup: {
      label: 'Generic template',
      caption: '🍽️ BEST BURGER IN TOWN!! Come hungry, leave happy! #foodie #yum',
      placeholderImageUrl: unsplashPhoto('photo-1414235077428-338989a2e8c0', 800),
      placeholderImageAlt: 'Restaurant table setting — placeholder until IG post mock',
    },
    kitMockup: {
      label: 'From your kit',
      caption: 'Thursday special: slow-braised short rib, small batch. When it is gone, it is gone.',
      placeholderImageUrl: unsplashPhoto('photo-1517248135467-4c7edcad34c4', 800),
      placeholderImageAlt: 'Restaurant interior — placeholder until IG post mock',
    },
  },
];

export const IDENTITY_KIT_MORE_THAN_TEMPLATES = {
  title: 'More than templates',
  body: 'Template packs give you graphics anyone can download. Ten minutes on our guided quiz gets you a full brand system: guies on voice, style, and what to say, built with the same thinking agencies use without the overhead. That is a different category of value.',
} as const;

export const IDENTITY_KIT_FOR_YOU_SECTION = {
  eyebrow: 'This is for you if',
  title: 'You run the place, or someone on your team handles the posts.',
} as const;

export const IDENTITY_KIT_FOR_YOU = [
  'You or someone on staff writes the posts, maybe a lead barista or part-timer, but none of you are marketers',
  'You want marketing that looks and sounds professional without hiring an agency',
  'You are tired of generic, inconsistent copy that never quite feels like your business',
] as const;

export const IDENTITY_KIT_NOT_FOR_YOU_SECTION = {
  eyebrow: 'This is not for you if',
} as const;

export const IDENTITY_KIT_NOT_FOR_YOU = [
  'You only want a logo file',
  'You want someone to run your marketing every month',
  'You are an agency shopping for white-label assets',
] as const;

export const IDENTITY_KIT_FAQS = [
  {
    question: 'Is this just Canva templates?',
    answer:
      'No, the Identity Kit is a full brand system on: voice, visual direction, and messaging tailored to your business. Not a generic grid of graphics that sound like everyone else.',
  },
  {
    question: 'How is this different from 100-post social kits?',
    answer:
      'Those sell volume. Identity Kit gives you how you sound, how you look, and what to say: a foundation you can run your marketing on, not a folder of posts that still sound like templates.',
  },
  {
    question: 'I already have a logo. Do I need this?',
    answer:
      'A logo is one piece. The kit covers voice, visual direction, and messaging so your posts, profiles, and listings finally match the business customers already know.',
  },
  {
    question: 'What types of businesses is this for?',
    answer:
      'Cafés, restaurants, salons, boutiques, and similar owner-operated hospitality and retail businesses.',
  },
  {
    question: 'What if I have a physical location?',
    answer:
      'Yes. The kit gives you voice and messaging for your posts, profiles, and how you show up when someone nearby is choosing where to go. If you also want best practices specifically for Google and Yelp listings, our local kits can help your business rank higher.',
  },
  {
    question: 'Is this a subscription?',
    answer: 'No, it is a one-time purchase to reference and run your marketing on.',
  },
] as const;

export const IDENTITY_KIT_PRICE_ANCHOR =
  'Agency-level brand thinking without the agency invoice, or another monthly tool.';

export const IDENTITY_KIT_OFFER_SECTION = {
  title: 'One kit.',
  support: 'Voice, look, and messaging built from your short guided quiz — instant download when you finish.',
} as const;

export const IDENTITY_KIT_HOW_SECTION = {
  title: 'Ten minutes in. A full brand system out.',
} as const;

export const IDENTITY_KIT_PROCESS_STEPS = [
  {
    step: '01',
    title: 'Short guided quiz',
    description: 'Tell us about your business — takes about ten minutes.',
  },
  {
    step: '02',
    title: 'Instant download',
    description: 'Download your kit on screen the moment you finish — we also send a copy to your email.',
  },
  {
    step: '03',
    title: 'Use it everywhere',
    description: 'Posts, profiles, and listings built to bring people in.',
  },
] as const;

export interface IdentityKitTestimonial {
  quote: string;
  name: string;
  business: string;
  location: string;
}

export const IDENTITY_KIT_TESTIMONIALS_SECTION = {
  eyebrow: 'From owners like you',
  title: 'Clarity that shows up in real posts.',
} as const;

/**
 * PLACEHOLDER personas — swap for real customer proof when available.
 * Write like spoken memory: contractions, plain product words, one concrete result.
 */
export const IDENTITY_KIT_TESTIMONIALS: IdentityKitTestimonial[] = [
  {
    quote:
      'I usually post before we open at 6, from the back counter with the grinder going. I used to copy whatever other cafés were doing. Now I have a guide that makes it easy to post and sound consistent. Last week we posted two sentences about our seasonal drink and customers instantly walked in asking for it!',
    name: 'Mara Chen',
    business: 'Juniper Row Coffee',
    location: 'Portland, OR',
  },
  {
    quote:
      'Most of my color clients find me on Instagram. I rewrote my bio every few months trying to sound professional, and it never sounded like me. The kit gave me captions I could actually paste in and stop overthinking. I have not touched it since.',
    name: 'Jordan Ellis',
    business: 'Ellis Color Studio',
    location: 'Austin, TX',
  },
  {
    quote:
      'My husband runs the kitchen while I handle the phones and our posts when I get a minute. Thursday specials used to take me forever to write. Last week I put up three lines with a picture of our slow-braised short rib and we had people calling before dinner.',
    name: 'Rosa Delgado',
    business: "Delgado's Kitchen",
    location: 'Chicago, IL',
  },
];

export const IDENTITY_KIT_INSIDE_SECTION = {
  eyebrow: 'What you get',
  title: 'One comprehensive brand system.',
  summary:
    'Voice, look, and messaging in a single kit, so every channel tells the same story and customers recognize you at a glance.',
} as const;

export interface IdentityKitPreviewScreenshot {
  label: string;
  imageUrl: string;
  imageAlt: string;
}

export type IdentityKitPreviewSlotRole = 'focus' | 'secondary' | 'corner' | 'hidden';

/** Which edge of the tile peeks into the clip (secondary + corner slots). */
export type IdentityKitPreviewSlotExposure = 'full' | 'top' | 'bottom';

/** Dev + layout reference for each mosaic slot. `role` drives visibility and featured content. */
export interface IdentityKitPreviewSlot {
  slot: number;
  deliverableIndex: number;
  role: IdentityKitPreviewSlotRole;
  exposure?: IdentityKitPreviewSlotExposure;
}

export interface IdentityKitPreviewBrickRow {
  offset: boolean;
  slots: readonly number[];
}

const KIT_PREVIEW_PLACEHOLDER_PHOTOS = [
  'photo-1586281380349-632531db7ed4',
  'photo-1552664730-d307ca884978',
  'photo-1450101499163-c8848c66ca85',
  'photo-1484480974693-6ca0a78fbfa0',
  'photo-1432888498266-38ffec3eaf0a',
  'photo-1499750310158-5c933f227f94',
  'photo-1460925895917-afdab827c52f',
  'photo-1611162616475-46b635cb6848',
  'photo-1516321318423-f06f85e504b3',
  'photo-1522204217468-aa7217b83705',
  'photo-1556761175-5973dc0f32e7',
] as const;

/**
 * "What you get" brick-lay preview — one slot per foundation + messaging deliverable.
 * Swap each imageUrl for anonymized PDF page crops from fulfillment.
 */
export const IDENTITY_KIT_PREVIEW_MOSAIC: IdentityKitPreviewScreenshot[] = [
  ...IDENTITY_KIT_FOUNDATION_DELIVERABLES,
  ...IDENTITY_KIT_MESSAGING_DELIVERABLES,
].map((label, index) => ({
  label,
  imageUrl: unsplashPhoto(KIT_PREVIEW_PLACEHOLDER_PHOTOS[index % KIT_PREVIEW_PLACEHOLDER_PHOTOS.length], 800),
  imageAlt: `${label} page preview — placeholder until kit export`,
}));

/** Slot → deliverable mapping. Roles match the settled brick-lay clip. */
export const IDENTITY_KIT_PREVIEW_SLOTS: IdentityKitPreviewSlot[] = [
  { slot: 1, deliverableIndex: 0, role: 'hidden' },
  { slot: 2, deliverableIndex: 1, role: 'corner' },
  { slot: 3, deliverableIndex: 2, role: 'secondary', exposure: 'bottom' },
  { slot: 4, deliverableIndex: 3, role: 'hidden' },
  { slot: 5, deliverableIndex: 4, role: 'focus' },
  { slot: 6, deliverableIndex: 5, role: 'focus' },
  { slot: 7, deliverableIndex: 6, role: 'focus' },
  { slot: 8, deliverableIndex: 7, role: 'hidden' },
  { slot: 9, deliverableIndex: 8, role: 'corner' },
  { slot: 10, deliverableIndex: 9, role: 'secondary', exposure: 'top' },
  { slot: 11, deliverableIndex: 10, role: 'corner' },
  { slot: 12, deliverableIndex: 0, role: 'hidden' },
];

/** Layout anchor + hero featured slots in the mosaic clip. */
export const IDENTITY_KIT_PREVIEW_FOCUS_SLOT = 6;
export const IDENTITY_KIT_PREVIEW_FOCUS_SLOTS = [5, 6, 7] as const;

export const IDENTITY_KIT_PREVIEW_ROWS: IdentityKitPreviewBrickRow[] = [
  { offset: false, slots: [1, 2, 3, 4] },
  { offset: true, slots: [5, 6, 7, 8] },
  { offset: false, slots: [9, 10, 11, 12] },
];

/** @deprecated Use IDENTITY_KIT_PREVIEW_ROWS */
export const IDENTITY_KIT_PREVIEW_MOBILE_ROWS = IDENTITY_KIT_PREVIEW_ROWS;

/** @deprecated Use IDENTITY_KIT_PREVIEW_ROWS */
export const IDENTITY_KIT_PREVIEW_DESKTOP_ROWS = IDENTITY_KIT_PREVIEW_ROWS;

const previewSlotByNumber = new Map(IDENTITY_KIT_PREVIEW_SLOTS.map((entry) => [entry.slot, entry]));

export const getIdentityKitPreviewSlot = (slot: number): IdentityKitPreviewSlot | undefined =>
  previewSlotByNumber.get(slot);

export const getIdentityKitPreviewScreenshotForSlot = (slot: number): IdentityKitPreviewScreenshot | undefined => {
  const entry = getIdentityKitPreviewSlot(slot);
  if (!entry) return undefined;
  return IDENTITY_KIT_PREVIEW_MOSAIC[entry.deliverableIndex % IDENTITY_KIT_PREVIEW_MOSAIC.length];
};

/** @deprecated Use IDENTITY_KIT_PREVIEW_MOSAIC */
export const IDENTITY_KIT_PREVIEW_STACK = IDENTITY_KIT_PREVIEW_MOSAIC;

export const IDENTITY_KIT_OUTCOMES_SECTION = {
  eyebrow: 'Why it matters',
  title: 'Better marketing gets you noticed, and gets more customers through the door.',
} as const;

export const IDENTITY_KIT_OUTCOMES = [
  'Look online like the business people already choose in person',
  'Stand out when someone nearby is deciding where to go',
  'Promote a slow day or new item without staring at a blank screen',
  'Stay visible enough that you stay on the short list',
] as const;

export const IDENTITY_KIT_FINAL_CTA = {
  title: 'Sound like your business everywhere you show up.',
  support:
    'One kit that standardizes your voice, look and messaging. Takes the stress of out marketing and customers always recongize you.',
} as const;

export const identityKitOffer = {
  price: IDENTITY_KIT_PRICE,
  summary: IDENTITY_KIT_OFFER_SECTION.support,
  foundationFeatures: [...IDENTITY_KIT_FOUNDATION_DELIVERABLES],
  messagingFeatures: [...IDENTITY_KIT_MESSAGING_DELIVERABLES],
} as const;
