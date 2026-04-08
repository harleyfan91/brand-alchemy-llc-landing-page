import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import CheckIcon from './CheckIcon';

/** Accordion / column affordances — decorative; labels stay on buttons for SRs */
const ChevronRightMicro = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M9 18l6-6-6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronDownMicro = ({ className = '' }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M6 9l6 6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Fixed third column so chevrons align when teaser length differs (e.g. Both vs Google). */
const mobileCatalogRowGrid =
  'grid w-full grid-cols-[minmax(0,auto)_minmax(0,1fr)_2rem] items-center gap-x-2';

// ─── Text scale reference ────────────────────────────────────────────────────
// Eyebrow labels (uppercase, decorative): text-xs font-bold
// Body / descriptions:                    text-sm font-light
// Feature list items:                     text-sm font-normal
// Tags / decorative pills:                text-[10px] font-bold uppercase
// Button CTAs (catalog):                text-xs font-bold uppercase — copy in `catalogCta`
// Price badges / overlay labels:          text-xs font-bold
// Nav links (intentionally minimal):      text-[10px] font-bold uppercase
// ─────────────────────────────────────────────────────────────────────────────

type Platform = 'google' | 'yelp';
type Tier = 'core' | 'pro';

const kits: Record<Platform, Record<Tier, { price: string; label: string; features: string[] }>> = {
  google: {
    core: {
      price: '$39',
      label: 'Google Core Kit',
      features: [
        '30 review response templates—personalize them with your Identity Kit Voice & Content Playbook',
        'Reply and post starters so searches and reviews turn into real conversations',
        'Step-by-step Google Business profile walkthrough (the checklist behind a free listing)',
        '12 industry photo angles—use Camentra on your phone to line up each shot',
        'Plain tips for showing up clearly in local search (not a ranking guarantee)',
      ],
    },
    pro: {
      price: '$79',
      label: 'Google Pro Kit',
      features: [
        'Everything in Google Core',
        'Google Ads starter settings',
        '30 evergreen caption prompts',
        'KPI and audit workbook',
        'Performance tracking sheet',
      ],
    },
  },
  yelp: {
    core: {
      price: '$39',
      label: 'Yelp Core Kit',
      features: [
        '30 review response templates—personalize them with your Identity Kit Voice & Content Playbook',
        'Reply and post starters so searches and reviews turn into real conversations',
        'Step-by-step Yelp profile walkthrough (the checklist behind a free profile)',
        '12 industry photo angles—use Camentra on your phone to line up each shot',
        'Plain tips for showing up clearly in local search (not a ranking guarantee)',
      ],
    },
    pro: {
      price: '$79',
      label: 'Yelp Pro Kit',
      features: [
        'Everything in Yelp Core',
        'Yelp Ads starter configuration',
        '30 evergreen caption prompts',
        'Troubleshooting playbook',
        'Performance tracking sheet',
      ],
    },
  },
};

/** Inline styles use CSS vars from `public/brand-tokens.css` — keep in sync with BRAND_GUIDELINES platform table */
const platformConfig: Record<Platform, { bg: string; accent: string }> = {
  google: { bg: 'var(--ba-catalog-google-bg)', accent: 'var(--ba-catalog-google-accent)' },
  yelp: { bg: 'var(--ba-catalog-yelp-bg)', accent: 'var(--ba-catalog-yelp-accent)' },
};

/** Google / Yelp / Both in the catalog modal — `null` = equal columns, teaser only until user picks */
type CatalogPlatform = 'google' | 'yelp' | 'both';

function catalogCardBackground(selection: CatalogPlatform | null): string {
  if (selection === null) return 'var(--ba-catalog-neutral-bg)';
  if (selection === 'both') return 'var(--ba-catalog-both-bg)';
  return platformConfig[selection].bg;
}

function catalogAccent(selection: CatalogPlatform | null, columnId: CatalogPlatform): string {
  if (selection !== columnId) return 'transparent';
  if (columnId === 'google') return platformConfig.google.accent;
  if (columnId === 'yelp') return platformConfig.yelp.accent;
  return 'var(--ba-catalog-emphasis)';
}

/** Standalone downloads (photo guides, copy packs)—buy any pack on its own; not framed as “add-ons” to kits */
const contentPacks = [
  {
    title: 'Seasonal Industry Photo Angles',
    subtitle: '9-Angle PDF Guide',
    price: '$7',
    desc: 'Niche-specific framing for seasonal peaks. Know exactly which shots to capture and when, without needing to hire a photographer.',
    tags: ['9 Unique Angles', 'Seasonal Timing', 'Niche-Specific'],
    img: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&q=80&w=900',
  },
  {
    title: 'Seasonal & Event Copy Pack',
    subtitle: 'Holidays & Local Events',
    price: '$39',
    desc: 'Ready-to-use copy for holidays and local events. Drop in your details, post, and move on. No writing experience needed.',
    tags: ['30+ Captions', 'Holiday Copy', 'Event Templates'],
    img: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=900',
  },
  {
    title: 'Social post starters',
    subtitle: 'Captions & ideas',
    price: '$19',
    desc: 'Short lines and fill-in-the-blank ideas for feed and stories—copy, tweak, and post without starting from scratch.',
    tags: ['Feed & stories', 'Ready to use', 'Fill-in-the-blank'],
    img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=900',
  },
  {
    title: 'Email List Copy Pack',
    subtitle: 'Welcome & Nurture',
    price: '$29',
    desc: 'Welcome and list-building copy you can adapt to your voice. No email marketing background required.',
    tags: ['Welcome Series', 'Lead Magnets', 'Tone-Ready'],
    img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=900',
  },
];

const industries = ['Cafe', 'Gym & Fitness', 'Spa & Beauty', 'Professional Services'];

/**
 * Both-platform bundle = two Pro-tier conversion libraries (Google + Yelp).
 * Priced below buying each Pro kit alone; see docs/ACQUISITION_FUNNEL_AND_SKU_MAP.md if tiers change.
 */
const BUNDLE_PRICE = '$129';

const BUNDLE_FEATURES = [
  'Google and Yelp Pro conversion libraries together in one checkout',
  'Save $29 compared to buying each platform’s Pro kit separately',
  'Templates, photo angles, review replies, and ads-ready extras on both platforms',
];

const CATALOG_COLUMNS: {
  id: CatalogPlatform;
  label: string;
  teaser: string;
  /** Short line for compact / mobile */
  shortDescription: string;
  /** Tier / bundle labels only — peek uses skeleton lines instead of prices */
  previewItems: { label: string }[];
}[] = [
  {
    id: 'google',
    label: 'Google',
    teaser: 'From $39',
    shortDescription: 'Conversion-ready templates, review replies, walkthrough, and photo angles for Google.',
    previewItems: [{ label: 'Core' }, { label: 'Pro' }],
  },
  {
    id: 'yelp',
    label: 'Yelp',
    teaser: 'From $39',
    shortDescription: 'Conversion-ready templates, review replies, walkthrough, and photo angles for Yelp.',
    previewItems: [{ label: 'Core' }, { label: 'Pro' }],
  },
  {
    id: 'both',
    label: 'Both',
    teaser: `${BUNDLE_PRICE} · Save $29`,
    shortDescription: 'Google + Yelp Pro together: save $29, one purchase.',
    previewItems: [{ label: 'Bundle' }],
  },
];

/**
 * Modal catalog CTAs: imperative, short, uppercase tracking.
 * Direct purchase (no cart): next step is checkout / pay for this line item.
 * Price always lives in the tier/add-on/bundle header row (or tier row), not on the button.
 */
const catalogCta = {
  getSample: 'Get sample',
  addKit: 'Buy now',
  addBundle: 'Buy bundle',
  addItem: 'Buy now',
} as const;

/** Eyebrow on Identity Kit card */
const IDENTITY_CARD_EYEBROW = 'Brand & voice';
const IDENTITY_CARD_PRICE_LINE = 'Core $49 · Pro $99';

/** Eyebrow on guides & kits card (launch kits, content packs, and more) */
const CATALOG_CARD_EYEBROW = 'Local business';
const CATALOG_CARD_PRICE_LINE = 'From $19 · Core kits from $39';

/** Eyebrow on Camentra card */
const CAMENTRA_CARD_EYEBROW = 'Ongoing support';
const CAMENTRA_CARD_PRICE_LINE = 'About $10/mo or $80/yr';

/** User-facing name for the Google/Yelp/packs modal (avoid “catalog” / internal-sounding labels) */
const GUIDES_KITS_TITLE = 'Guides & launch kits';

const identityKitDescription =
  "A personalized kit that defines your brand voice, look, and feel, so you always sound and look like you. Answer a few questions to download yours today.";

/**
 * Default-state peek (sm+ only) — aligned with Identity Kit ReviewScreen teaser tiles:
 * soft panel, semibold label, blurred skeleton lines (no prices). Mobile collapsed rows omit tiles.
 */
const KitPeekSkeletonLines = () => (
  <div className="mt-2.5 space-y-1.5">
    <div className="h-2.5 w-[85%] rounded bg-gray-200/90 blur-[1px]" />
    <div className="h-2.5 w-[66%] rounded bg-gray-200/85 blur-[1px]" />
    <div className="h-2.5 w-[78%] rounded bg-gray-200/85 blur-[1px]" />
  </div>
);

const CatalogColumnPreviewPeek = ({ col }: { col: (typeof CATALOG_COLUMNS)[number] }) => {
  const n = col.previewItems.length;
  return (
    <div className="flex min-h-0 flex-1 flex-col justify-between">
      <p className="shrink-0 text-xs text-gray-600 font-light leading-snug sm:text-[13px] md:text-sm">
        {col.shortDescription}
      </p>
      <div
        className={`mt-3 grid w-full gap-2 sm:mt-auto ${n === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}
        aria-hidden="true"
      >
        {col.previewItems.map((item) => (
          <div
            key={`${col.id}-${item.label}`}
            className="flex min-h-[5.5rem] flex-col overflow-hidden rounded-xl border border-gray-200 bg-gray-50/80 p-2.5 sm:min-h-[6rem] sm:p-3"
          >
            <p className="text-[10px] font-semibold leading-tight text-gray-800 sm:text-xs">{item.label}</p>
            <KitPeekSkeletonLines />
          </div>
        ))}
      </div>
      <span className="sr-only">
        {n} {col.id === 'both' ? 'bundle' : 'kit tiers'} in this group
      </span>
    </div>
  );
};

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  /** `null` — no committed selection; equal columns show peek (copy + tier chips) until user picks one */
  const [catalogSelection, setCatalogSelection] = useState<CatalogPlatform | null>(null);
  const [tier, setTier] = useState<Tier>('core');
  const [platformFading, setPlatformFading] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState('');

  /** Mobile accordion rows — scroll target into view (refs on each row) */
  const mobileCatalogRowRefs = useRef<Partial<Record<CatalogPlatform, HTMLDivElement | null>>>({});

  const scrollMobileCatalogRow = (id: CatalogPlatform, behavior: ScrollBehavior) => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(max-width: 639px)').matches) return;
    const el = mobileCatalogRowRefs.current[id];
    if (!el) return;
    el.scrollIntoView({ behavior, block: 'start', inline: 'nearest' });
  };

  const selectCatalogPlatform = (p: CatalogPlatform) => {
    /** Second tap on the active column collapses back to the equal / unselected state. */
    if (p === catalogSelection) {
      setCatalogSelection(null);
      setPlatformFading(false);
      return;
    }

    // Same pattern as many mobile accordions / filter sheets: scroll on tap, not after async layout + extra delay.
    scrollMobileCatalogRow(p, 'smooth');

    setPlatformFading(true);
    window.setTimeout(() => {
      setCatalogSelection(p);
      setPlatformFading(false);
      // After expand paints, snap scroll so tall tier lists aren’t left off-screen (instant = no second “smooth” wait).
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          scrollMobileCatalogRow(p, 'auto');
        });
      });
    }, 160);
  };

  const handleTierChange = (t: Tier) => setTier(t);

  const fadeStyle = { opacity: platformFading ? 0 : 1, transition: 'opacity 0.16s ease' } as const;

  const renderTierCardsFor = (p: Platform) => (
    <>
      <div className="space-y-3 mb-5" style={fadeStyle}>
        {(['core', 'pro'] as Tier[]).map((t) => {
          const kit = kits[p][t];
          const isActive = tier === t;
          return (
            <div
              key={t}
              role="button"
              tabIndex={0}
              onClick={() => handleTierChange(t)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleTierChange(t);
                }
              }}
              className="rounded-lg sm:rounded-xl border bg-white cursor-pointer relative overflow-hidden"
              style={{
                borderColor: isActive ? 'var(--ba-catalog-emphasis)' : 'var(--ba-gray-200)',
                boxShadow: isActive ? '0 4px 20px -4px rgba(0,0,0,0.12)' : 'none',
                transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
              }}
            >
              <div className="flex items-center justify-between px-4 pt-4 pb-3 sm:px-5 sm:pt-4 sm:pb-3">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div
                    className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
                    style={{
                      borderColor: isActive ? 'var(--ba-catalog-emphasis)' : 'var(--ba-gray-300)',
                      backgroundColor: isActive ? 'var(--ba-catalog-emphasis)' : 'transparent',
                      color: 'var(--ba-color-on-primary)',
                      transition: 'border-color 0.15s ease, background-color 0.15s ease',
                    }}
                  >
                    {isActive && <CheckIcon size="sm" />}
                  </div>
                  <div>
                    <h5
                      className="text-sm sm:text-base font-bold uppercase tracking-wider"
                      style={{
                        color: isActive ? 'var(--ba-catalog-emphasis)' : 'var(--ba-gray-500)',
                        transition: 'color 0.15s ease',
                      }}
                    >
                      {t === 'core' ? 'Core' : 'Pro'}
                    </h5>
                  </div>
                </div>
                <span
                  className="text-2xl sm:text-3xl font-light tracking-tight"
                  style={{
                    color: isActive ? 'var(--ba-catalog-emphasis)' : 'var(--ba-gray-400)',
                    transition: 'color 0.15s ease',
                  }}
                >
                  {kit.price}
                </span>
              </div>
              <div className="px-4 pb-4 sm:px-5 sm:pb-4 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2 border-t border-gray-100 pt-3">
                {kit.features.map((f, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <span
                      style={{
                        color: isActive ? 'var(--ba-gray-500)' : 'var(--ba-gray-300)',
                        transition: 'color 0.15s ease',
                      }}
                    >
                      <CheckIcon size="md" />
                    </span>
                    <span
                      className="text-sm font-normal leading-snug"
                      style={{
                        color: isActive ? 'var(--ba-gray-700)' : 'var(--ba-catalog-feature-inactive)',
                        transition: 'color 0.15s ease',
                      }}
                    >
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        style={fadeStyle}
        className="w-full py-3 sm:py-3.5 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
      >
        {catalogCta.addKit}
      </button>
    </>
  );

  /** Same card chrome as a single Core/Pro tier row — one selectable “Bundle” option */
  const renderBundleColumnContent = () => (
    <>
      <div className="space-y-3 mb-5" style={fadeStyle}>
        <div
          className="rounded-lg sm:rounded-xl border bg-white relative overflow-hidden"
          style={{
            borderColor: 'var(--ba-catalog-emphasis)',
            boxShadow: '0 4px 20px -4px rgba(0,0,0,0.12)',
          }}
        >
          <div className="flex items-center justify-between px-4 pt-4 pb-3 sm:px-5 sm:pt-4 sm:pb-3">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div
                className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
                style={{
                  borderColor: 'var(--ba-catalog-emphasis)',
                  backgroundColor: 'var(--ba-catalog-emphasis)',
                  color: 'var(--ba-color-on-primary)',
                }}
              >
                <CheckIcon size="sm" />
              </div>
              <div>
                <h5 className="text-sm sm:text-base font-bold uppercase tracking-wider text-gray-900">Bundle</h5>
              </div>
            </div>
            <span className="text-2xl sm:text-3xl font-light tracking-tight text-gray-900 tabular-nums">{BUNDLE_PRICE}</span>
          </div>
          <div className="px-4 pb-4 sm:px-5 sm:pb-4 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2 border-t border-gray-100 pt-3">
            {BUNDLE_FEATURES.map((f, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                <span className="text-gray-600">
                  <CheckIcon size="md" />
                </span>
                <span className="text-sm font-normal leading-snug text-gray-700">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        type="button"
        style={fadeStyle}
        className="w-full py-3 sm:py-3.5 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
      >
        {catalogCta.addBundle}
      </button>
    </>
  );

  return (
    <section id="products" className="scroll-mt-20 bg-white py-8 md:py-24">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div className="ba-section-stack--default relative z-20 mx-auto mb-6 max-w-3xl md:mb-16">
          <h2 className="ba-section-eyebrow text-xs font-bold uppercase tracking-[0.3em] text-gray-400">Products</h2>
          <h3 className="ba-section-display-title text-4xl md:text-5xl font-serif font-normal text-gray-900">The Toolkit</h3>
          <p className="ba-section-support text-gray-500 text-sm md:text-base font-light leading-relaxed">
            Start with the Identity Kit. Once your brand has a clear voice and look, everything else clicks into place.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 max-w-7xl mx-auto">
          <Link
            to="/identity-kit"
            className="relative z-20 bg-white group rounded-xl sm:rounded-2xl overflow-hidden border border-gray-100 flex flex-col transition-all duration-500 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] no-underline text-inherit"
          >
            <div className="aspect-[16/10] overflow-hidden bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200"
                alt="Identity Kit"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-5 sm:p-8 md:p-10 text-left">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">{IDENTITY_CARD_EYEBROW}</span>
              <h4 className="text-2xl font-serif font-normal text-gray-900 mb-4">Identity Kit</h4>
              <p className="text-gray-500 text-sm leading-relaxed font-light mb-4">{identityKitDescription}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6">{IDENTITY_CARD_PRICE_LINE}</p>
              <span className="text-xs font-bold text-black border-b border-black pb-1 uppercase tracking-widest">View Identity Kit</span>
            </div>
          </Link>

          {/* Guides & launch kits — opens modal (Google/Yelp kits, content packs, etc.) */}
          <div
            onClick={() => setIsModalOpen(true)}
            className="relative z-20 bg-white group rounded-xl sm:rounded-2xl overflow-hidden border border-gray-100 flex flex-col transition-all duration-500 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] cursor-pointer"
          >
            <div className="aspect-[16/10] overflow-hidden bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200"
                alt="Local business: owner helping a customer at the counter"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-5 sm:p-8 md:p-10 text-left">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">{CATALOG_CARD_EYEBROW}</span>
              <h4 className="text-2xl font-serif font-normal text-gray-900 mb-4">{GUIDES_KITS_TITLE}</h4>
              <p className="text-gray-500 text-sm leading-relaxed font-light mb-6">
                Pick the help that solves the next bottleneck: clearer profiles, stronger replies, easier content,
                better photos, or a simpler place to start. Everything works better once your Identity Kit is in
                place.
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6">{CATALOG_CARD_PRICE_LINE}</p>
              <span className="text-xs font-bold text-black border-b border-black pb-1 uppercase tracking-widest">Browse guides and kits</span>
            </div>
          </div>

          {/* Camentra card */}
          <a
            href="https://www.camentra.com"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-20 bg-white group rounded-xl sm:rounded-2xl overflow-hidden border border-gray-100 flex flex-col transition-all duration-500 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] no-underline"
          >
            <div className="aspect-[16/10] overflow-hidden bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200"
                alt="Camentra App"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-5 sm:p-8 md:p-10 text-left">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">{CAMENTRA_CARD_EYEBROW}</span>
              <h4 className="text-2xl font-serif font-normal text-gray-900 mb-4">Camentra</h4>
              <p className="text-gray-500 text-sm leading-relaxed font-light mb-4">
                The pocket companion for the photo angles in our kits: templates on-screen, light retouch tools,
                and an AI coach so you nail the shot. Pro is about $10/month or $80/year in the app—see the site
                for current pricing.
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6">{CAMENTRA_CARD_PRICE_LINE}</p>
              <span className="text-xs font-bold text-black border-b border-black pb-1 uppercase tracking-widest">Visit Site</span>
            </div>
          </a>
        </div>
      </div>

      {/* ── MODAL ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />

          <div className="relative bg-white w-full max-w-4xl max-h-[92vh] sm:max-h-[90vh] rounded-xl sm:rounded-3xl shadow-2xl flex flex-col min-h-0">

            {/* Modal header */}
            <div className="px-3 py-3 sm:px-6 md:px-8 sm:py-4 border-b border-gray-100 flex justify-between items-center bg-white rounded-t-xl sm:rounded-t-3xl shrink-0">
              <div className="text-left">
                <h3 className="text-2xl font-serif font-normal text-gray-900">{GUIDES_KITS_TITLE}</h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Find your starting point</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable body — tighter horizontal padding on small screens for more usable width */}
            <div className="flex-grow overflow-y-auto px-3 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8 space-y-6 sm:space-y-8 md:space-y-10">

              {/* ── FREE SAMPLE: one flat panel; controls in one row on md+ to save height ── */}
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 sm:rounded-2xl sm:p-5">
                <div className="text-left">
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">Free sample</span>
                  <h4 className="mt-1 font-serif text-xl font-normal text-gray-900 sm:text-2xl">
                    3-Shot Starter Pack
                  </h4>
                  <p className="mt-1.5 text-sm font-light leading-snug text-gray-500">
                    Interested in our guides for local businesses? We&apos;ll send you a free sample with: 3 photo angles for your industry, a quick profile audit you can complete in 3 minutes, and 3 review response templates written for your niche.
                  </p>
                </div>

                <div className="mt-3 flex flex-col gap-2 md:mt-3.5 md:flex-row md:items-stretch md:gap-2.5">
                  <div className="relative min-w-0 md:w-[12.5rem] md:flex-shrink-0">
                    <label htmlFor="catalog-free-sample-industry" className="sr-only">
                      Industry
                    </label>
                    <select
                      id="catalog-free-sample-industry"
                      value={selectedIndustry}
                      onChange={(e) => setSelectedIndustry(e.target.value)}
                      className="h-full w-full min-h-[2.75rem] cursor-pointer appearance-none rounded-full border border-gray-200 bg-white px-3.5 py-2 text-sm font-normal text-gray-900 focus:border-black focus:outline-none"
                    >
                      <option value="" disabled>
                        Industry…
                      </option>
                      {industries.map((ind) => (
                        <option key={ind} value={ind}>
                          {ind}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-2.5">
                    <label htmlFor="catalog-free-sample-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="catalog-free-sample-email"
                      type="email"
                      placeholder="you@business.com"
                      autoComplete="email"
                      className="min-h-[2.75rem] min-w-0 w-full flex-1 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-black focus:outline-none"
                    />
                    <button
                      type="button"
                      className="min-h-[2.75rem] w-full shrink-0 rounded-full bg-black px-5 py-2 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-gray-800 sm:w-auto sm:min-w-[8.25rem]"
                    >
                      {catalogCta.getSample}
                    </button>
                  </div>
                </div>
              </div>

              {/* ── LAUNCH KITS (Google / Yelp / both) ── */}
              <div>
                <div className="text-left mb-4 md:mb-5">
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">
                    Local conversion libraries
                  </span>
                  <h4 className="text-xl sm:text-2xl font-serif font-normal text-gray-900 mt-1">
                    Choose Google, Yelp, or both.
                  </h4>
                  <p className="text-sm text-gray-400 font-light mt-2">
                    These kits are execution modules: templates, replies, and angles—not a pitch to “buy setup.”
                    Use your Identity Kit Voice & Content Playbook to tailor the wording. The bundle is both
                    platforms at Pro tier.
                  </p>
                  <p className="sm:hidden text-xs text-gray-500 font-light mt-2.5">
                    Tap a platform to see Core and Pro options.
                  </p>
                </div>

                {/* Configurator: three columns on sm+ (equal until one expands); stacked accordion on small screens */}
                <div
                  className="rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden"
                  style={{ backgroundColor: catalogCardBackground(catalogSelection), transition: 'background-color 0.4s ease' }}
                >
                  <div
                    className={`sm:hidden border-b border-gray-200/80 backdrop-blur-sm transition-colors duration-300 ${
                      catalogSelection === null ? 'bg-white/50' : 'bg-white/25'
                    }`}
                  >
                    {CATALOG_COLUMNS.map((col) => {
                      const expanded = catalogSelection === col.id;
                      return (
                        <div
                          key={col.id}
                          ref={(el) => {
                            mobileCatalogRowRefs.current[col.id] = el;
                          }}
                          className={`scroll-mt-3 border-b border-gray-200/80 last:border-b-0 transition-colors duration-200 ${
                            expanded ? 'bg-white/75' : 'bg-white/60'
                          }`}
                        >
                          {catalogSelection === null ? (
                            <button
                              type="button"
                              role="radio"
                              aria-checked={false}
                              aria-label={`${col.label} — show tiers and pricing`}
                              onClick={() => selectCatalogPlatform(col.id)}
                              className="group w-full px-3 py-3.5 text-left hover:bg-white/90 active:bg-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 sm:px-4"
                            >
                              <div className={mobileCatalogRowGrid}>
                                <span className="min-w-0 text-xs font-bold uppercase tracking-widest text-gray-900">
                                  {col.label}
                                </span>
                                <span className="min-w-0 justify-self-end text-right text-[10px] font-bold uppercase leading-tight tracking-wider text-gray-400">
                                  {col.teaser}
                                </span>
                                <span
                                  className="flex h-8 w-8 items-center justify-center justify-self-end rounded-full border border-gray-200/90 bg-white/95 text-gray-500 shadow-sm transition-all group-active:scale-[0.98] group-hover:border-gray-300 group-hover:text-gray-800"
                                  aria-hidden
                                >
                                  <ChevronDownMicro className="h-3.5 w-3.5" />
                                </span>
                              </div>
                            </button>
                          ) : (
                            <>
                              <button
                                type="button"
                                role="radio"
                                aria-expanded={expanded}
                                aria-checked={expanded}
                                aria-label={
                                  expanded
                                    ? `${col.label} — collapse`
                                    : `${col.label} — show tiers and pricing`
                                }
                                onClick={() => selectCatalogPlatform(col.id)}
                                className={`group relative w-full px-3 py-3.5 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 sm:px-4 ${
                                  expanded
                                    ? 'hover:bg-white/80'
                                    : 'text-gray-500 hover:bg-white/55'
                                }`}
                                style={
                                  expanded
                                    ? { backgroundColor: 'rgba(255,255,255,0.78)' }
                                    : undefined
                                }
                              >
                                <div className={mobileCatalogRowGrid}>
                                  <span
                                    className={`min-w-0 text-xs font-bold uppercase tracking-widest ${
                                      expanded ? 'text-gray-900' : 'text-gray-500'
                                    }`}
                                  >
                                    {col.label}
                                  </span>
                                  <span
                                    className={`min-w-0 justify-self-end text-right text-[10px] font-bold uppercase leading-tight tracking-wider ${
                                      expanded ? 'text-gray-400' : 'text-gray-400/80'
                                    }`}
                                  >
                                    {col.teaser}
                                  </span>
                                  <span
                                    className={`flex h-8 w-8 items-center justify-center justify-self-end rounded-full border border-gray-200/80 bg-white/90 text-gray-500 transition-transform duration-200 ${
                                      expanded ? 'rotate-180' : ''
                                    }`}
                                    aria-hidden
                                  >
                                    <ChevronDownMicro className="h-3.5 w-3.5" />
                                  </span>
                                </div>
                                {expanded && catalogSelection && (
                                  <span
                                    className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                                    style={{ backgroundColor: catalogAccent(catalogSelection, col.id) }}
                                  />
                                )}
                              </button>
                              {expanded && (
                                <div className="px-3 pb-5 pt-2 border-t border-gray-100 bg-white/70 sm:px-4">
                                  {col.id === 'both' ? renderBundleColumnContent() : renderTierCardsFor(col.id)}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div
                    className="hidden sm:flex sm:flex-row min-h-[min(320px,50vh)]"
                    role="radiogroup"
                    aria-label="Choose Google, Yelp, or both platforms"
                  >
                    {CATALOG_COLUMNS.map((col) => {
                      const expanded = catalogSelection === col.id;
                      const equal = catalogSelection === null;
                      const slim = !equal && !expanded;
                      const flexClass = equal ? 'flex-1 min-w-0' : expanded ? 'flex-[4] min-w-0' : 'flex-1 basis-0 min-w-[4.75rem]';
                      const headerBar = (
                        <>
                          <span className={`font-bold uppercase tracking-widest ${slim ? 'text-[10px] leading-tight' : 'text-xs'}`}>
                            {col.label}
                          </span>
                          <span
                            className={`font-bold uppercase text-gray-400 ${slim ? 'text-[9px] leading-tight px-0.5' : 'text-[10px] tracking-wider'}`}
                          >
                            {col.teaser}
                          </span>
                          {expanded && (
                            <span
                              className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                              style={{ backgroundColor: catalogAccent(catalogSelection, col.id) }}
                            />
                          )}
                        </>
                      );
                      return (
                        <div
                          key={col.id}
                          className={`flex flex-col border-r border-gray-200/80 last:border-r-0 transition-[flex-grow,flex-shrink,flex-basis] duration-300 ease-out min-h-0 ${flexClass}`}
                        >
                          {equal ? (
                            <button
                              type="button"
                              role="radio"
                              aria-checked={false}
                              aria-label={`${col.label} — show tiers and pricing`}
                              onClick={() => selectCatalogPlatform(col.id)}
                              className="group relative flex flex-1 min-h-0 min-w-0 flex-col text-left rounded-none border-0 transition-all duration-200 ease-out hover:bg-white/92 hover:shadow-[0_12px_36px_-14px_rgba(0,0,0,0.16)] hover:ring-1 hover:ring-gray-200/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-900"
                              style={{
                                color: 'var(--ba-catalog-emphasis)',
                                backgroundColor: 'rgba(255,255,255,0.5)',
                              }}
                            >
                              <div className="relative flex shrink-0 flex-row items-start justify-between gap-2 px-3 py-3 sm:py-3.5 sm:px-4">
                                <div className="flex min-w-0 flex-col gap-1 pr-1">
                                  <span className="text-xs font-bold uppercase tracking-widest">{col.label}</span>
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                    {col.teaser}
                                  </span>
                                </div>
                                <span
                                  className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200/90 bg-white/95 text-gray-500 shadow-sm transition-all duration-200 group-hover:border-gray-300 group-hover:text-gray-900 group-hover:shadow-md"
                                  aria-hidden
                                >
                                  <ChevronRightMicro className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-px" />
                                </span>
                              </div>
                              <div className="flex min-h-0 flex-1 flex-col overflow-y-auto border-t border-gray-100/90 bg-white/60 px-3 pb-4 pt-2 backdrop-blur-sm sm:px-4 sm:pb-5">
                                <CatalogColumnPreviewPeek col={col} />
                              </div>
                            </button>
                          ) : slim ? (
                            <button
                              type="button"
                              role="radio"
                              aria-checked={false}
                              aria-label={`${col.label} — switch to this platform`}
                              onClick={() => selectCatalogPlatform(col.id)}
                              className="relative flex flex-1 min-h-0 min-w-0 flex-col items-center justify-center gap-2 px-1.5 py-5 text-center text-gray-600 transition-all hover:bg-white/55 hover:ring-1 hover:ring-gray-200/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-900"
                            >
                              <span className="text-[10px] font-bold uppercase tracking-widest leading-tight text-gray-900">{col.label}</span>
                              <span className="text-[9px] font-bold uppercase leading-tight px-0.5 text-gray-400">{col.teaser}</span>
                            </button>
                          ) : (
                            <>
                              <button
                                type="button"
                                role="radio"
                                aria-checked={expanded}
                                aria-label={`${col.label} — collapse`}
                                onClick={() => selectCatalogPlatform(col.id)}
                                className="relative flex w-full shrink-0 flex-col items-stretch gap-1 px-4 py-3 text-left transition-colors sm:py-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-900"
                                style={{
                                  color: 'var(--ba-catalog-emphasis)',
                                  backgroundColor: expanded ? 'rgba(255,255,255,0.78)' : 'transparent',
                                }}
                              >
                                {headerBar}
                              </button>
                              {expanded && (
                                <div className="flex-1 flex flex-col min-h-0 min-w-0 px-4 sm:px-5 pb-5 sm:pb-6 pt-2 border-t border-gray-100/90 bg-white/60 backdrop-blur-sm overflow-y-auto">
                                  {col.id === 'both' ? renderBundleColumnContent() : renderTierCardsFor(col.id)}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* ── CONTENT PACKS (standalone photo & copy products) ── */}
              <div className="pt-1">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5 pb-4 border-b border-gray-100">
                  <div className="text-left">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">Content Packs</span>
                    <h4 className="text-xl sm:text-2xl font-serif font-normal text-gray-900 mt-1.5">Photo guides and copy for every channel.</h4>
                    <p className="text-sm text-gray-400 font-light mt-2 max-w-xl leading-relaxed">
                      Seasonal photo angles, event and social copy, email list prompts. Each pack is its own purchase. Buy what you need when you need it; no kit required.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap pb-1">
                    {contentPacks.length} packs
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 sm:gap-5">
                  {contentPacks.map((item, i) => (
                    <div
                      key={i}
                      className="group bg-white rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden flex flex-row sm:flex-col items-stretch hover:border-gray-300 hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.08)] transition-all duration-500"
                    >
                      {/*
                        Mobile: fixed width column, no aspect cap — height follows text column (flex stretch).
                        Desktop: aspect-[4/3] is taller than 16/10; image fills width.
                      */}
                      <div className="relative w-[min(48%,12rem)] shrink-0 self-stretch min-h-[9.5rem] sm:min-h-0 sm:w-full sm:aspect-[4/3] sm:self-auto overflow-hidden bg-gray-100 rounded-l-xl sm:rounded-none">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="absolute inset-0 h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="min-w-0 flex-1 p-3 sm:p-5 flex flex-col flex-grow text-left justify-center sm:justify-start border-l border-gray-100 sm:border-l-0 sm:border-t">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{item.subtitle}</span>
                        <div className="flex items-start justify-between gap-3 mb-1 sm:mb-2">
                          <h6 className="text-sm sm:text-lg font-serif font-normal text-gray-900 leading-snug min-w-0">{item.title}</h6>
                          <span className="text-xl sm:text-2xl font-light tracking-tight text-gray-900 tabular-nums shrink-0 leading-none pt-0.5">
                            {item.price}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500 font-light leading-relaxed mb-2 sm:mb-4 sm:flex-grow line-clamp-3 sm:line-clamp-none">{item.desc}</p>
                        <div className="hidden sm:flex flex-wrap gap-1.5 mb-4">
                          {item.tags.map((tag, idx) => (
                            <span key={idx} className="text-[10px] font-bold uppercase tracking-wider bg-gray-50 text-gray-400 px-2.5 py-1 rounded-full border border-gray-100">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <button
                          type="button"
                          className="w-full py-2.5 sm:py-3 border border-gray-200 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest group-hover:border-black group-hover:bg-black group-hover:text-white transition-all duration-300"
                        >
                          {catalogCta.addItem}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;
