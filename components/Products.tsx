import React, { useState } from 'react';

// ─── Text scale reference ────────────────────────────────────────────────────
// Eyebrow labels (uppercase, decorative): text-xs font-bold
// Body / descriptions:                    text-sm font-light
// Feature list items:                     text-sm font-normal
// Tags / decorative pills:                text-[10px] font-bold uppercase
// Button CTAs:                            text-xs font-bold uppercase
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="relative z-20 mb-16">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">Current Catalog</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-gray-900">The Toolkit</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
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
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Standardized Kits</span>
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
                A camera app with a built-in AI coach. Get better business photos every time, without hiring a photographer or guessing what looks good.
              </p>
              <span className="text-xs font-bold text-black border-b border-black pb-1 uppercase tracking-widest">Visit Site</span>
            </div>
          </a>
        </div>
      </div>

      {/* ── MODAL ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />

          <div className="relative bg-white w-full max-w-5xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col">

            {/* Modal header */}
            <div className="p-6 md:px-10 border-b border-gray-100 flex justify-between items-center bg-white rounded-t-3xl shrink-0">
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
            <div className="flex-grow overflow-y-auto p-6 md:p-10 space-y-12">

              {/* ── FREE SAMPLE ── */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                  <div className="max-w-xl text-left">
                    <span className="text-xs font-bold text-black bg-white px-3 py-1 rounded-full uppercase tracking-widest border border-gray-200 shadow-sm">
                      Free Sample
                    </span>
                    <h4 className="text-3xl font-serif mt-4 mb-2">3-Shot Starter Pack</h4>
                    <p className="text-sm text-gray-500 font-light leading-relaxed">
                      Not sure where to start? Get a free sample: 3 photo angles for your industry, a quick profile audit you can complete in 3 minutes, and 3 review response templates written for your niche.
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
                      <button className="px-7 py-3 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg whitespace-nowrap">
                        Send My Sample
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── PLATFORM KITS ── */}
              <div>
                <div className="text-left mb-6">
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">Platform Kits</span>
                  <h4 className="text-2xl font-serif text-gray-900 mt-1">Choose your platform and tier.</h4>
                  <p className="text-sm text-gray-400 font-light mt-2">
                    Each kit walks you through setting up your profile the right way, so you show up in local searches, make a great first impression, and know how to keep the momentum going.
                  </p>
                </div>

                {/* Configurator card */}
                <div
                  className="rounded-2xl border border-gray-200 overflow-hidden"
                  style={{ backgroundColor: config.bg, transition: 'background-color 0.4s ease' }}
                >
                  {/* Platform tabs */}
                  <div className="flex">
                    {(['google', 'yelp'] as Platform[]).map((p) => (
                      <button
                        key={p}
                        onClick={() => handlePlatformChange(p)}
                        className="flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-all duration-200 relative"
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

                  {/* Card body */}
                  <div className="p-6 md:p-8 bg-white/60 backdrop-blur-sm">
                    <div
                      className="space-y-3 mb-6"
                      style={{ opacity: platformFading ? 0 : 1, transition: 'opacity 0.16s ease' }}
                    >
                      {(['core', 'pro'] as Tier[]).map((t) => {
                        const kit = kits[platform][t];
                        const isActive = tier === t;
                        return (
                          <div
                            key={t}
                            onClick={() => handleTierChange(t)}
                            className="rounded-xl border bg-white cursor-pointer relative overflow-hidden"
                            style={{
                              borderColor: isActive ? '#111' : '#e5e7eb',
                              boxShadow: isActive ? '0 4px 20px -4px rgba(0,0,0,0.12)' : 'none',
                              transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                            }}
                          >
                            {/* Tier header */}
                            <div className="flex items-center justify-between px-5 pt-5 pb-4">
                              <div className="flex items-center gap-3">
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
                                    className="text-base font-bold uppercase tracking-wider"
                                    style={{ color: isActive ? '#111' : '#6b7280', transition: 'color 0.15s ease' }}
                                  >
                                    {t === 'core' ? 'Core' : 'Pro'}
                                  </h5>
                                </div>
                              </div>
                              <span
                                className="text-3xl font-light tracking-tight"
                                style={{ color: isActive ? '#111' : '#9ca3af', transition: 'color 0.15s ease' }}
                              >
                                {kit.price}
                              </span>
                            </div>

                            {/* Features */}
                            <div className="px-5 pb-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 border-t border-gray-100 pt-4">
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
                      style={{ opacity: platformFading ? 0 : 1, transition: 'opacity 0.16s ease' }}
                      className="w-full py-4 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
                    >
                      Select {platform === 'google' ? 'Google' : 'Yelp'} {tier === 'core' ? 'Core' : 'Pro'} — {activeKit.price}
                    </button>
                  </div>
                </div>

                {/* Bundle strip */}
                <div className="mt-4 rounded-xl bg-gray-900 px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-left">
                    <p className="text-sm font-bold text-white uppercase tracking-wider">Why choose one?</p>
                    <p className="text-sm text-gray-400 font-light mt-1 leading-relaxed">
                      Get Google + Yelp together and save $30. Cover every place a local customer might find you.
                    </p>
                  </div>
                  <button className="shrink-0 px-6 py-3 bg-white text-black rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors whitespace-nowrap">
                    Bundle — $229
                  </button>
                </div>
              </div>

              {/* ── PRECISION ADD-ONS ── */}
              <div className="pt-2">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-6 border-b border-gray-100">
                  <div className="text-left">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">Precision Add-ons</span>
                    <h4 className="text-2xl font-serif text-gray-900 mt-1.5">Build your own stack.</h4>
                    <p className="text-sm text-gray-400 font-light mt-2 max-w-sm leading-relaxed">
                      Not ready for a full kit? Start with one thing and build from there.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap pb-1">2 Available</span>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {aLaCarte.map((item, i) => (
                    <div
                      key={i}
                      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col hover:border-gray-300 hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.08)] transition-all duration-500"
                    >
                      <div className="aspect-[16/9] overflow-hidden bg-gray-100 relative">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-md">
                          <span className="text-xs font-bold text-gray-900">{item.price}</span>
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow text-left">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">{item.subtitle}</span>
                        <h6 className="text-lg font-serif text-gray-900 mb-2 leading-snug">{item.title}</h6>
                        <p className="text-sm text-gray-500 font-light leading-relaxed mb-5 flex-grow">{item.desc}</p>
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {item.tags.map((tag, idx) => (
                            <span key={idx} className="text-[10px] font-bold uppercase tracking-wider bg-gray-50 text-gray-400 px-2.5 py-1 rounded-full border border-gray-100">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <button className="w-full py-3.5 border border-gray-200 rounded-full text-xs font-bold uppercase tracking-widest group-hover:border-black group-hover:bg-black group-hover:text-white transition-all duration-300">
                          Add to Kit — {item.price}
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
