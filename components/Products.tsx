import React, { useRef, useState } from 'react';

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
      price: '$59',
      label: 'Google Core Kit',
      features: [
        'Step-by-step Google Business profile setup',
        'Tips to help you show up higher in local search results',
        'Starter guide to promoting your profile and attracting new customers',
        '30 review response templates',
        '12 industry photo angles',
      ],
    },
    pro: {
      price: '$129',
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
      price: '$59',
      label: 'Yelp Core Kit',
      features: [
        'Step-by-step Yelp profile setup',
        'Tips to help you show up higher in local search results',
        'Starter guide to promoting your profile and attracting new customers',
        '30 review response templates',
        '12 industry photo angles',
      ],
    },
    pro: {
      price: '$129',
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

const platformConfig: Record<Platform, { bg: string; accent: string }> = {
  google: { bg: '#f0f4ff', accent: '#4285F4' },
  yelp:   { bg: '#fff5f5', accent: '#d32323' },
};

/** Google / Yelp / Both in the catalog modal — `null` = equal columns, teaser only until user picks */
type CatalogPlatform = 'google' | 'yelp' | 'both';

function catalogCardBackground(selection: CatalogPlatform | null): string {
  if (selection === null) return '#f3f4f6';
  if (selection === 'both') return '#f1f2f4';
  return platformConfig[selection].bg;
}

function catalogAccent(selection: CatalogPlatform | null, columnId: CatalogPlatform): string {
  if (selection !== columnId) return 'transparent';
  if (columnId === 'google') return platformConfig.google.accent;
  if (columnId === 'yelp') return platformConfig.yelp.accent;
  return '#111';
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
    title: 'Social CTA Pack',
    subtitle: 'Captions & Hooks',
    price: '$19',
    desc: 'Hooks, CTAs, and short prompts for feed and stories—publish without staring at a blank screen.',
    tags: ['Feed & Stories', 'CTAs', 'Fill-in-the-blank'],
    img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=900',
  },
  {
    title: 'Email List Copy Pack',
    subtitle: 'Welcome & Nurture',
    price: '$29',
    desc: 'Welcome and list-building copy you can adapt to your voice—no email marketing background required.',
    tags: ['Welcome Series', 'Lead Magnets', 'Tone-Ready'],
    img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=900',
  },
];

const industries = ['Cafe', 'Gym & Fitness', 'Spa & Beauty', 'Professional Services'];

/** Bundle price — shown in header row; CTA is verb-only (matches catalog pattern) */
const BUNDLE_PRICE = '$229';

const BUNDLE_FEATURES = [
  'Google and Yelp launch kits together in one checkout',
  'Save $30 compared to buying each platform separately',
  'Templates, photo angles, and review guides for both platforms',
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
    teaser: 'From $59',
    shortDescription: 'Google Business setup, templates, and photo angles for local search.',
    previewItems: [{ label: 'Core' }, { label: 'Pro' }],
  },
  {
    id: 'yelp',
    label: 'Yelp',
    teaser: 'From $59',
    shortDescription: 'Yelp profile, visibility, and review response templates.',
    previewItems: [{ label: 'Core' }, { label: 'Pro' }],
  },
  {
    id: 'both',
    label: 'Both',
    teaser: `${BUNDLE_PRICE} · Save $30`,
    shortDescription: 'Google + Yelp together—save $30, one purchase.',
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

/** Eyebrow on toolkit catalog card (launch kits, content packs, and more) */
const CATALOG_CARD_EYEBROW = 'Local business';

/** Flip to `false` when Identity Kit is live; link uses URL below */
const IDENTITY_KIT_COMING_SOON = true;

/**
 * Identity Kit app (`identity-kit` repo) — override with `VITE_IDENTITY_KIT_URL` in `.env`
 * @see https://kit.brandalchemyllc.com (production target)
 */
const identityKitUrl =
  (typeof import.meta !== 'undefined' &&
    (import.meta as { env?: { VITE_IDENTITY_KIT_URL?: string } }).env?.VITE_IDENTITY_KIT_URL) ||
  'https://kit.brandalchemyllc.com';

const identityKitDescription =
  "A personalized kit that defines your brand voice, look, and feel, so you always sound and look like you. Answer a few questions to download yours today.";

const CheckIcon = ({ size = 'sm' }: { size?: 'sm' | 'md' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12"
    fill="none"
    className={size === 'md' ? 'w-3.5 h-3.5 shrink-0' : 'w-2.5 h-2.5 shrink-0'}
  >
    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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
    if (p === catalogSelection) return;

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
                borderColor: isActive ? '#111' : '#e5e7eb',
                boxShadow: isActive ? '0 4px 20px -4px rgba(0,0,0,0.12)' : 'none',
                transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
              }}
            >
              <div className="flex items-center justify-between px-4 pt-4 pb-3 sm:px-5 sm:pt-4 sm:pb-3">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div
                    className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
                    style={{
                      borderColor: isActive ? '#111' : '#d1d5db',
                      backgroundColor: isActive ? '#111' : 'transparent',
                      color: '#fff',
                      transition: 'border-color 0.15s ease, background-color 0.15s ease',
                    }}
                  >
                    {isActive && <CheckIcon size="sm" />}
                  </div>
                  <div>
                    <h5
                      className="text-sm sm:text-base font-bold uppercase tracking-wider"
                      style={{ color: isActive ? '#111' : '#6b7280', transition: 'color 0.15s ease' }}
                    >
                      {t === 'core' ? 'Core' : 'Pro'}
                    </h5>
                  </div>
                </div>
                <span
                  className="text-2xl sm:text-3xl font-light tracking-tight"
                  style={{ color: isActive ? '#111' : '#9ca3af', transition: 'color 0.15s ease' }}
                >
                  {kit.price}
                </span>
              </div>
              <div className="px-4 pb-4 sm:px-5 sm:pb-4 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2 border-t border-gray-100 pt-3">
                {kit.features.map((f, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <span style={{ color: isActive ? '#6b7280' : '#d1d5db', transition: 'color 0.15s ease' }}>
                      <CheckIcon size="md" />
                    </span>
                    <span
                      className="text-sm font-normal leading-snug"
                      style={{ color: isActive ? '#374151' : '#c4c8cd', transition: 'color 0.15s ease' }}
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
            borderColor: '#111',
            boxShadow: '0 4px 20px -4px rgba(0,0,0,0.12)',
          }}
        >
          <div className="flex items-center justify-between px-4 pt-4 pb-3 sm:px-5 sm:pt-4 sm:pb-3">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div
                className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
                style={{
                  borderColor: '#111',
                  backgroundColor: '#111',
                  color: '#fff',
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
    <section id="products" className="scroll-mt-20 snap-start bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 text-center">
        <div className="relative z-20 mb-16 max-w-3xl mx-auto">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">Products</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-gray-900">The Toolkit</h3>
          <p className="text-gray-500 text-sm md:text-base font-light leading-relaxed mt-5">
            Practical downloads to help you look sharp online—brand voice, Google and Yelp setup, photo guides, and copy for social and email. Built for owners and small teams who want professional results without a big-agency budget.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Identity Kit — `IDENTITY_KIT_COMING_SOON`: no link until launch */}
          {IDENTITY_KIT_COMING_SOON ? (
            <div
              className="relative z-20 bg-white group rounded-2xl overflow-hidden border border-gray-100 flex flex-col transition-all duration-500 shadow-none"
              aria-label="Identity Kit — coming soon"
            >
              <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200"
                  alt="Identity Kit"
                  className="w-full h-full object-cover grayscale opacity-90"
                />
              </div>
              <div className="p-8 md:p-10 text-left">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">{IDENTITY_CARD_EYEBROW}</span>
                <h4 className="text-2xl font-serif text-gray-900 mb-4">Identity Kit</h4>
                <p className="text-gray-500 text-sm leading-relaxed font-light mb-6">{identityKitDescription}</p>
                <span className="inline-block rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-gray-400 cursor-default">
                  Coming soon
                </span>
              </div>
            </div>
          ) : (
            <a
              href={identityKitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-20 bg-white group rounded-2xl overflow-hidden border border-gray-100 flex flex-col transition-all duration-500 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] no-underline"
            >
              <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200"
                  alt="Identity Kit"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 md:p-10 text-left">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">{IDENTITY_CARD_EYEBROW}</span>
                <h4 className="text-2xl font-serif text-gray-900 mb-4">Identity Kit</h4>
                <p className="text-gray-500 text-sm leading-relaxed font-light mb-6">{identityKitDescription}</p>
                <span className="text-xs font-bold text-black border-b border-black pb-1 uppercase tracking-widest">Open Identity Kit</span>
              </div>
            </a>
          )}

          {/* Toolkit catalog trigger (Launch Kits, Content Packs, etc.) */}
          <div
            onClick={() => setIsModalOpen(true)}
            className="relative z-20 bg-white group rounded-2xl overflow-hidden border border-gray-100 flex flex-col transition-all duration-500 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] cursor-pointer"
          >
            <div className="aspect-[16/10] overflow-hidden bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
                alt="Toolkit catalog — guides and downloads for local businesses"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-8 md:p-10 text-left">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">{CATALOG_CARD_EYEBROW}</span>
              <h4 className="text-2xl font-serif text-gray-900 mb-4">Toolkit Catalog</h4>
              <p className="text-gray-500 text-sm leading-relaxed font-light mb-6">
                Launch kits for Google and Yelp, content packs for photos and social, email prompts, and more—everything in one place so you can show up locally and keep your marketing consistent.
              </p>
              <span className="text-xs font-bold text-black border-b border-black pb-1 uppercase tracking-widest">Explore Catalog</span>
            </div>
          </div>

          {/* Camentra card */}
          <a
            href="https://www.camentra.com"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-20 bg-white group rounded-2xl overflow-hidden border border-gray-100 flex flex-col transition-all duration-500 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] no-underline"
          >
            <div className="aspect-[16/10] overflow-hidden bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200"
                alt="Camentra App"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-8 md:p-10 text-left">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Mobile Application</span>
              <h4 className="text-2xl font-serif text-gray-900 mb-4">Camentra</h4>
              <p className="text-gray-500 text-sm leading-relaxed font-light mb-6">
                Our flagship camera app with a live AI-powered coach. Get better business photos every time, without hiring a photographer or guessing what looks good.
              </p>
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
                <h3 className="text-2xl font-serif text-gray-900">Toolkit Catalog</h3>
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

              {/* ── FREE SAMPLE ── */}
              <div className="bg-gray-50 rounded-lg sm:rounded-2xl p-4 sm:p-6 border border-gray-100">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 lg:gap-6">
                  <div className="max-w-xl text-left">
                    <span className="text-xs font-bold text-black bg-white px-3 py-1 rounded-full uppercase tracking-widest border border-gray-200 shadow-sm">
                      Free Sample
                    </span>
                    <h4 className="text-2xl sm:text-3xl font-serif mt-3 mb-2">3-Shot Starter Pack</h4>
                    <p className="text-sm text-gray-500 font-light leading-relaxed">
                      Interested in our guides for local businesses? We&apos;ll send you a free sample: 3 photo angles for your industry, a quick profile audit you can complete in 3 minutes, and 3 review response templates written for your niche.
                    </p>
                  </div>
                  <div className="w-full lg:w-auto space-y-3">
                    <div className="relative">
                      <select
                        value={selectedIndustry}
                        onChange={(e) => setSelectedIndustry(e.target.value)}
                        className="w-full px-4 py-3 rounded-full border border-gray-200 text-sm font-normal focus:outline-none focus:border-black appearance-none bg-white cursor-pointer"
                      >
                        <option value="" disabled>Choose your industry...</option>
                        {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="email"
                        placeholder="Email address"
                        className="px-5 py-3 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-black flex-grow lg:w-48"
                      />
                      <button
                        type="button"
                        className="px-7 py-3 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg whitespace-nowrap"
                      >
                        {catalogCta.getSample}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── LAUNCH KITS (Google / Yelp / both) ── */}
              <div>
                <div className="text-left mb-4 md:mb-5">
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">Launch Kits</span>
                  <h4 className="text-xl sm:text-2xl font-serif text-gray-900 mt-1">Choose your platform and tier.</h4>
                  <p className="text-sm text-gray-400 font-light mt-2">
                    Step-by-step setup for Google Business and Yelp—so you show up in local search, make a strong first impression, and keep momentum after you launch.
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
                              onClick={() => selectCatalogPlatform(col.id)}
                              className="w-full px-3 py-3.5 text-left hover:bg-white/85 active:bg-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 sm:px-4"
                            >
                              <div className="flex items-center justify-between gap-3">
                                <span className="text-xs font-bold uppercase tracking-widest text-gray-900">{col.label}</span>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 shrink-0 max-w-[55%] text-right leading-snug">
                                  {col.teaser}
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
                                onClick={() => selectCatalogPlatform(col.id)}
                                className={`relative w-full flex items-center justify-between gap-3 px-3 py-3.5 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 sm:px-4 ${
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
                                <span
                                  className={`text-xs font-bold uppercase tracking-widest ${
                                    expanded ? 'text-gray-900' : 'text-gray-500'
                                  }`}
                                >
                                  {col.label}
                                </span>
                                <span
                                  className={`text-[10px] font-bold uppercase tracking-wider shrink-0 max-w-[55%] text-right leading-snug ${
                                    expanded ? 'text-gray-400' : 'text-gray-400/80'
                                  }`}
                                >
                                  {col.teaser}
                                </span>
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
                              onClick={() => selectCatalogPlatform(col.id)}
                              className="group relative flex flex-1 min-h-0 min-w-0 flex-col text-left rounded-none border-0 transition-colors hover:bg-white/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-900"
                              style={{
                                color: '#111',
                                backgroundColor: 'rgba(255,255,255,0.5)',
                              }}
                            >
                              <div className="relative shrink-0 py-3 sm:py-3.5 px-4 flex flex-col items-stretch gap-1">
                                {headerBar}
                              </div>
                              <div className="flex-1 flex flex-col min-h-0 min-w-0 px-3 sm:px-4 pb-4 sm:pb-5 pt-2 border-t border-gray-100/90 bg-white/60 backdrop-blur-sm overflow-y-auto">
                                <CatalogColumnPreviewPeek col={col} />
                              </div>
                            </button>
                          ) : slim ? (
                            <button
                              type="button"
                              role="radio"
                              aria-checked={false}
                              onClick={() => selectCatalogPlatform(col.id)}
                              className="relative flex flex-1 min-h-0 min-w-0 flex-col items-center justify-center gap-2 py-5 px-1.5 text-center transition-colors text-gray-600 hover:bg-white/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-900"
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
                                onClick={() => selectCatalogPlatform(col.id)}
                                className={`relative w-full shrink-0 transition-colors py-3 sm:py-3.5 px-4 text-left flex flex-col items-stretch gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-900 ${
                                  expanded ? '' : ''
                                }`}
                                style={{
                                  color: '#111',
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
                    <h4 className="text-xl sm:text-2xl font-serif text-gray-900 mt-1.5">Photo guides and copy for every channel.</h4>
                    <p className="text-sm text-gray-400 font-light mt-2 max-w-xl leading-relaxed">
                      Seasonal photo angles, event and social copy, email list prompts—each pack is its own purchase. Buy what you need when you need it; no kit required.
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
                          <h6 className="text-sm sm:text-lg font-serif text-gray-900 leading-snug min-w-0">{item.title}</h6>
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
