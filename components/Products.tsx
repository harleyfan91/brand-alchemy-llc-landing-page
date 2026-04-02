import React, { useState } from 'react';

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

const aLaCarte = [
  {
    title: 'Seasonal Industry Photo Angles',
    subtitle: '9-Angle PDF Guide',
    price: '$7',
    desc: 'Niche-specific framing for seasonal peaks. Know exactly which shots to capture and when, without needing to hire a photographer.',
    tags: ['9 Unique Angles', 'Seasonal Timing', 'Niche-Specific'],
    img: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&q=80&w=900',
  },
  {
    title: 'Seasonal & Event Templates Pack',
    subtitle: 'Copy & Caption Bundle',
    price: '$39',
    desc: "Ready-to-use copy for holidays and local events. Drop in your details, post, and move on. No writing experience needed.",
    tags: ['30+ Captions', 'Holiday Copy', 'Event Templates'],
    img: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=900',
  },
];

const industries = ['Cafe', 'Gym & Fitness', 'Spa & Beauty', 'Professional Services'];

/** Bundle price — shown in header row; CTA is verb-only (matches catalog pattern) */
const BUNDLE_PRICE = '$229';

/**
 * Modal catalog CTAs: imperative, short, uppercase tracking.
 * Price always lives in the tier/add-on/bundle header row (or tier row), not on the button.
 */
const catalogCta = {
  getSample: 'Get sample',
  addKit: 'Add kit',
  addBundle: 'Add bundle',
  addItem: 'Add item',
} as const;

/**
 * Shared category line for Identity Kit + Local Launch Kits (both are downloadable kit products).
 * Swap the string if you standardize on another label (e.g. “PDF kits”).
 */
const KIT_CATEGORY_LABEL = 'Digital kits';

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

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [platform, setPlatform] = useState<Platform>('google');
  const [tier, setTier] = useState<Tier>('core');
  const [platformFading, setPlatformFading] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState('');

  const activeKit = kits[platform][tier];
  const config = platformConfig[platform];

  const handlePlatformChange = (p: Platform) => {
    if (p === platform) return;
    setPlatformFading(true);
    setTimeout(() => { setPlatform(p); setPlatformFading(false); }, 160);
  };

  const handleTierChange = (t: Tier) => setTier(t);

  return (
    <section id="products" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 text-center">
        <div className="relative z-20 mb-16">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">Current Catalog</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-gray-900">The Toolkit</h3>
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
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">{KIT_CATEGORY_LABEL}</span>
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
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">{KIT_CATEGORY_LABEL}</span>
                <h4 className="text-2xl font-serif text-gray-900 mb-4">Identity Kit</h4>
                <p className="text-gray-500 text-sm leading-relaxed font-light mb-6">{identityKitDescription}</p>
                <span className="text-xs font-bold text-black border-b border-black pb-1 uppercase tracking-widest">Open Identity Kit</span>
              </div>
            </a>
          )}

          {/* Local Launch Kits trigger card */}
          <div
            onClick={() => setIsModalOpen(true)}
            className="relative z-20 bg-white group rounded-2xl overflow-hidden border border-gray-100 flex flex-col transition-all duration-500 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] cursor-pointer"
          >
            <div className="aspect-[16/10] overflow-hidden bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
                alt="Local Launch Kits"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-8 md:p-10 text-left">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">{KIT_CATEGORY_LABEL}</span>
              <h4 className="text-2xl font-serif text-gray-900 mb-4">Local Launch Kits</h4>
              <p className="text-gray-500 text-sm leading-relaxed font-light mb-6">
                Step-by-step setup kits for Google Business and Yelp. Get your profile looking sharp, show up when local customers are searching, and make the kind of first impression that turns browsers into visitors.
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />

          <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col">

            {/* Modal header */}
            <div className="px-4 py-4 sm:px-6 md:px-8 border-b border-gray-100 flex justify-between items-center bg-white rounded-t-2xl sm:rounded-t-3xl shrink-0">
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

            {/* Scrollable body */}
            <div className="flex-grow overflow-y-auto px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-8 space-y-8 md:space-y-10">

              {/* ── FREE SAMPLE ── */}
              <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-gray-100">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 lg:gap-6">
                  <div className="max-w-xl text-left">
                    <span className="text-xs font-bold text-black bg-white px-3 py-1 rounded-full uppercase tracking-widest border border-gray-200 shadow-sm">
                      Free Sample
                    </span>
                    <h4 className="text-2xl sm:text-3xl font-serif mt-3 mb-2">3-Shot Starter Pack</h4>
                    <p className="text-sm text-gray-500 font-light leading-relaxed">
                      Interested in our Local Launch Kits? We&apos;ll send you a free sample: 3 photo angles for your industry, a quick profile audit you can complete in 3 minutes, and 3 review response templates written for your niche.
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

              {/* ── PLATFORM KITS ── */}
              <div>
                <div className="text-left mb-4 md:mb-5">
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">Platform Kits</span>
                  <h4 className="text-xl sm:text-2xl font-serif text-gray-900 mt-1">Choose your platform and tier.</h4>
                  <p className="text-sm text-gray-400 font-light mt-2">
                    Each kit walks you through setting up your profile the right way, so you show up in local searches, make a great first impression, and know how to keep the momentum going.
                  </p>
                </div>

                {/* Configurator card */}
                <div
                  className="rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden"
                  style={{ backgroundColor: config.bg, transition: 'background-color 0.4s ease' }}
                >
                  {/* Platform tabs */}
                  <div className="flex">
                    {(['google', 'yelp'] as Platform[]).map((p) => (
                      <button
                        key={p}
                        onClick={() => handlePlatformChange(p)}
                        className="flex-1 py-3 sm:py-3.5 text-xs font-bold uppercase tracking-widest transition-all duration-200 relative"
                        style={{
                          color: platform === p ? '#111' : '#9ca3af',
                          backgroundColor: platform === p ? 'rgba(255,255,255,0.75)' : 'transparent',
                        }}
                      >
                        {p === 'google' ? 'Google' : 'Yelp'}
                        {platform === p && (
                          <span
                            className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                            style={{ backgroundColor: config.accent, transition: 'background-color 0.4s ease' }}
                          />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Card body — generous inset so tier rows + CTA aren’t flush to the tinted frame */}
                  <div className="p-6 sm:p-7 md:p-8 bg-white/60 backdrop-blur-sm">
                    <div
                      className="space-y-3 mb-5"
                      style={{ opacity: platformFading ? 0 : 1, transition: 'opacity 0.16s ease' }}
                    >
                      {(['core', 'pro'] as Tier[]).map((t) => {
                        const kit = kits[platform][t];
                        const isActive = tier === t;
                        return (
                          <div
                            key={t}
                            onClick={() => handleTierChange(t)}
                            className="rounded-lg sm:rounded-xl border bg-white cursor-pointer relative overflow-hidden"
                            style={{
                              borderColor: isActive ? '#111' : '#e5e7eb',
                              boxShadow: isActive ? '0 4px 20px -4px rgba(0,0,0,0.12)' : 'none',
                              transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                            }}
                          >
                            {/* Tier header */}
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

                            {/* Features */}
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

                    {/* CTA */}
                    <button
                      type="button"
                      style={{ opacity: platformFading ? 0 : 1, transition: 'opacity 0.16s ease' }}
                      className="w-full py-3 sm:py-3.5 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
                    >
                      {catalogCta.addKit}
                    </button>
                  </div>
                </div>

                {/* Bundle strip — headline row matches tier layout (title | price top-right); CTA below */}
                <div className="mt-3 rounded-lg sm:rounded-xl bg-gray-900 px-4 py-4 sm:px-5 sm:py-4">
                  <div className="flex justify-between items-start gap-4">
                    <p className="text-sm font-bold text-white uppercase tracking-wider text-left min-w-0">
                      Why choose one?
                    </p>
                    <span className="text-2xl sm:text-3xl font-light text-white tabular-nums shrink-0 leading-none pt-0.5">
                      {BUNDLE_PRICE}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 font-light mt-2 leading-relaxed text-left">
                    Get Google + Yelp together and save $30. Cover every place a local customer might find you.
                  </p>
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="px-6 py-3 bg-white text-black rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors whitespace-nowrap"
                    >
                      {catalogCta.addBundle}
                    </button>
                  </div>
                </div>
              </div>

              {/* ── PRECISION ADD-ONS ── */}
              <div className="pt-1">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5 pb-4 border-b border-gray-100">
                  <div className="text-left">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">Precision Add-ons</span>
                    <h4 className="text-xl sm:text-2xl font-serif text-gray-900 mt-1.5">Build your own stack.</h4>
                    <p className="text-sm text-gray-400 font-light mt-2 max-w-sm leading-relaxed">
                      Not ready for a full kit? Start with one thing and build from there.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap pb-1">2 Available</span>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 sm:gap-5">
                  {aLaCarte.map((item, i) => (
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
