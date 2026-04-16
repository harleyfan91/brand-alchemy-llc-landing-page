import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OfferMatrixPrimitive from '../components/primitives/OfferMatrixPrimitive.tsx';
import ProductPhotoGridPrimitive from '../components/primitives/ProductPhotoGridPrimitive.tsx';
import type { DigitalProductMatrixColumn } from '../components/DigitalProductPage';
import { getLocalBusinessKitCheckoutHref } from '../utils/localBusinessKitCheckoutUrls';
import { contentPacks } from '../content/contentPacks';

const matrixColumns: DigitalProductMatrixColumn[] = [
  {
    name: 'Google',
    toneKey: 'google',
    summary:
      'Profile setup guide, 30 review templates, plain-language listing tips, and worksheets to stay organized.',
    options: [
      {
        name: 'Core',
        price: '$39',
        bullets: [
          'Step-by-step Google Business Profile setup guide',
          '30 review response templates personalized with your voice',
          'Best practices to help you rank higher in local search',
          'Worksheets to keep your details consistent online and stay on top of your listing',
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
    summary:
      'Profile setup guide, 30 review templates, plain-language listing tips, and worksheets to stay organized.',
    options: [
      {
        name: 'Core',
        price: '$39',
        bullets: [
          'Step-by-step Yelp profile setup guide',
          '30 review response templates personalized with your voice',
          'Best practices to help you rank higher in local search',
          'Worksheets to keep your details consistent online and stay on top of your listing',
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
          'Google and Yelp Pro local launch kits together',
          'Save compared to buying each Pro kit separately',
          'Walkthroughs, templates, listing tips, worksheets, and ads-ready extras across both platforms',
        ],
      },
    ],
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
        </section>

        <section className="mt-8 rounded-xl border border-gray-100 bg-gray-50 p-4 sm:rounded-2xl sm:p-5">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">Free sample</span>
          <h2 className="mt-1 font-serif text-xl font-normal text-gray-900 sm:text-2xl">
            Your free local-business preview
          </h2>
          <p className="mt-1.5 text-sm font-light leading-snug text-gray-500">
            Choose an industry below and enter your email to receive a sample of photo best practices, review response
            templates, and a 3-minute audit of your local business listings.
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
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">Local launch kits</span>
            <h2 className="mt-1 text-xl font-serif font-normal text-gray-900 sm:text-2xl">
              Set up your local listings with ease.
            </h2>
            <p className="mt-2 text-sm font-light text-gray-500">
              Step-by-step guides for setting up Google Business and Yelp profiles, review response templates & more.
            </p>
          </div>
          <OfferMatrixPrimitive columns={matrixColumns} getCheckoutHref={getLocalBusinessKitCheckoutHref} />
        </section>

        <section className="mt-12 border-t border-gray-100 pt-6">
          <div className="mb-5 flex flex-col gap-2 text-left sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">Content packs</span>
              <h2 className="mt-1.5 text-xl font-serif font-normal text-gray-900 sm:text-2xl">
                Content starters for what you publish
              </h2>
              <p className="mt-2 max-w-3xl text-sm font-light leading-relaxed text-gray-500">
                Templates and easy to use guides so you don&apos;t have to invent marketing copy from scratch.
              </p>
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
