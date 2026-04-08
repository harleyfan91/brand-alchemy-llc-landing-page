import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OfferMatrixPrimitive from '../components/primitives/OfferMatrixPrimitive.tsx';
import ProductPhotoGridPrimitive from '../components/primitives/ProductPhotoGridPrimitive.tsx';
import type { DigitalProductMatrixColumn } from '../components/DigitalProductPage';

const matrixColumns: DigitalProductMatrixColumn[] = [
  {
    name: 'Google',
    toneKey: 'google',
    summary: 'Conversion-ready templates, review replies, walkthrough, and photo angles for Google.',
    options: [
      {
        name: 'Core',
        price: '$39',
        bullets: [
          '30 review response templates personalized with your voice',
          'Reply and post starters for real customer conversations',
          'Step-by-step Google Business profile walkthrough',
        ],
      },
      {
        name: 'Pro',
        price: '$79',
        bullets: ['Everything in Core', 'Google Ads starter settings', 'KPI and audit workbook'],
      },
    ],
  },
  {
    name: 'Yelp',
    toneKey: 'yelp',
    summary: 'Conversion-ready templates, review replies, walkthrough, and photo angles for Yelp.',
    options: [
      {
        name: 'Core',
        price: '$39',
        bullets: [
          '30 review response templates personalized with your voice',
          'Reply and post starters for real customer conversations',
          'Step-by-step Yelp profile walkthrough',
        ],
      },
      {
        name: 'Pro',
        price: '$79',
        bullets: ['Everything in Core', 'Yelp Ads starter configuration', 'Troubleshooting playbook'],
      },
    ],
  },
  {
    name: 'Both',
    toneKey: 'both',
    teaser: '$129',
    summary: 'Google + Yelp Pro together in one checkout.',
    options: [
      {
        name: 'Bundle',
        price: '$129',
        bullets: [
          'Google and Yelp Pro conversion libraries together',
          'Save compared to buying each Pro kit separately',
          'Templates, photo angles, replies, and ads-ready extras',
        ],
      },
    ],
  },
];

const contentPacks = [
  {
    title: 'Seasonal Industry Photo Angles',
    subtitle: '9-Angle PDF Guide',
    price: '$7',
    description: 'Niche-specific framing for seasonal peaks so you know exactly which shots to capture and when.',
    imageUrl: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&q=80&w=900',
  },
  {
    title: 'Seasonal & Event Copy Pack',
    subtitle: 'Holidays & Local Events',
    price: '$39',
    description: 'Ready-to-use copy for holidays and local events. Edit quickly and post without starting from scratch.',
    imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=900',
  },
  {
    title: 'Social Post Starters',
    subtitle: 'Captions & Ideas',
    price: '$19',
    description: 'Short lines and fill-in-the-blank ideas for feed and stories.',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=900',
  },
  {
    title: 'Email List Copy Pack',
    subtitle: 'Welcome & Nurture',
    price: '$29',
    description: 'Welcome and nurture email copy you can adapt to your voice.',
    imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=900',
  },
];

const industries = ['Cafe', 'Gym & Fitness', 'Spa & Beauty', 'Professional Services'];

const GuidesAndKitsPage: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('');

  return (
    <main className="flex-grow scroll-mt-20 bg-white pb-12 pt-20 md:pb-20 md:pt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-4 md:mb-5">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-medium uppercase tracking-[0.18em] text-gray-400 md:text-xs md:tracking-[0.2em]">
            <li>
              <Link to="/" className="text-gray-500 transition-colors hover:text-gray-900">
                Home
              </Link>
            </li>
            <li aria-hidden className="select-none text-gray-300">
              /
            </li>
            <li className="text-gray-900" aria-current="page">
              Guides &amp; launch kits
            </li>
          </ol>
        </nav>

        <section className="py-2">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400">Local business</span>
          <h1 className="mt-2 font-serif text-3xl font-normal leading-tight text-gray-900 sm:text-4xl md:text-5xl">
            Guides &amp; launch kits
          </h1>
          <p className="mt-3 max-w-3xl text-sm font-light leading-relaxed text-gray-600 sm:text-base">
            Pick the help that solves your next bottleneck: clearer profiles, stronger replies, easier content, better
            photos, or a simpler place to start.
          </p>
        </section>

        <section className="mt-8 rounded-xl border border-gray-100 bg-gray-50 p-4 sm:rounded-2xl sm:p-5">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">Free sample</span>
          <h2 className="mt-1 font-serif text-xl font-normal text-gray-900 sm:text-2xl">3-Shot Starter Pack</h2>
          <p className="mt-1.5 text-sm font-light leading-snug text-gray-500">
            We&apos;ll send 3 photo angles for your industry, a quick profile audit, and 3 response templates.
          </p>
          <div className="mt-3 flex flex-col gap-2 md:flex-row md:items-stretch md:gap-2.5">
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="min-h-[2.75rem] w-full cursor-pointer appearance-none rounded-full border border-gray-200 bg-white px-3.5 py-2 text-sm text-gray-900 focus:border-black focus:outline-none md:w-[12.5rem]"
            >
              <option value="" disabled>
                Industry...
              </option>
              {industries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
            <input
              type="email"
              placeholder="you@business.com"
              autoComplete="email"
              className="min-h-[2.75rem] w-full flex-1 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-black focus:outline-none"
            />
            <button
              type="button"
              className="min-h-[2.75rem] w-full rounded-full bg-black px-5 py-2 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-gray-800 md:w-auto md:min-w-[8.25rem]"
            >
              Get sample
            </button>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-4 text-left md:mb-5">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">Local conversion libraries</span>
            <h2 className="mt-1 text-xl font-serif font-normal text-gray-900 sm:text-2xl">
              Choose Google, Yelp, or both.
            </h2>
            <p className="mt-2 text-sm font-light text-gray-500">
              These kits are execution modules: templates, replies, and angles. Use your Identity Kit voice guidance
              to tailor the wording.
            </p>
          </div>
          <OfferMatrixPrimitive
            columns={matrixColumns}
            primaryHref="#"
            openInNewTab={false}
          />
        </section>

        <section className="mt-12 border-t border-gray-100 pt-6">
          <div className="mb-5 flex flex-col gap-2 text-left sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">Content packs</span>
              <h2 className="mt-1.5 text-xl font-serif font-normal text-gray-900 sm:text-2xl">
                Photo guides and copy for every channel.
              </h2>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{contentPacks.length} packs</span>
          </div>
          <ProductPhotoGridPrimitive items={contentPacks} />
        </section>
      </div>
    </main>
  );
};

export default GuidesAndKitsPage;
