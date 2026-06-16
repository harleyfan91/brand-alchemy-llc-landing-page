import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import FreeSampleLeadModal from '../components/FreeSampleLeadModal';
import ContentPackGridPrimitive from '../components/primitives/ContentPackGridPrimitive.tsx';
import OfferMatrixPrimitive from '../components/primitives/OfferMatrixPrimitive.tsx';
import { getLocalBusinessKitMatrixColumns } from '../content/localBusinessKits';
import { getContentPackCheckoutHref } from '../utils/contentPackCheckoutUrls';
import { getLocalBusinessKitCheckoutHref } from '../utils/localBusinessKitCheckoutUrls';
import { contentPackFamilies } from '../content/contentPacks';

const matrixColumns = getLocalBusinessKitMatrixColumns();

const AUTO_SAMPLE_PROMPT_KEY = 'guides-kits-auto-sample-prompt-shown';
const AUTO_SAMPLE_PROMPT_DELAY_MS = 750;

const GuidesAndKitsPage: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [sampleOpen, setSampleOpen] = useState(false);
  const [sampleEntrance, setSampleEntrance] = useState<'manual' | 'prompted'>('manual');

  const userOpenedSampleManuallyRef = useRef(false);
  const autoPromptTimerRef = useRef<number | null>(null);
  const autoPromptScheduledRef = useRef(false);

  useEffect(() => {
    return () => {
      if (autoPromptTimerRef.current !== null) {
        window.clearTimeout(autoPromptTimerRef.current);
      }
    };
  }, []);

  const openSampleManually = useCallback(() => {
    userOpenedSampleManuallyRef.current = true;
    if (autoPromptTimerRef.current !== null) {
      window.clearTimeout(autoPromptTimerRef.current);
      autoPromptTimerRef.current = null;
    }
    setSampleEntrance('manual');
    setSampleOpen(true);
  }, []);

  const handleOfferExpand = useCallback(() => {
    if (userOpenedSampleManuallyRef.current) return;
    if (autoPromptScheduledRef.current) return;
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem(AUTO_SAMPLE_PROMPT_KEY)) return;

    autoPromptScheduledRef.current = true;
    autoPromptTimerRef.current = window.setTimeout(() => {
      autoPromptTimerRef.current = null;
      if (userOpenedSampleManuallyRef.current) return;

      sessionStorage.setItem(AUTO_SAMPLE_PROMPT_KEY, '1');
      setSampleEntrance('prompted');
      setSampleOpen(true);
    }, AUTO_SAMPLE_PROMPT_DELAY_MS);
  }, []);

  return (
    <main className="flex-grow scroll-mt-20 bg-white pb-12 pt-20 md:pb-20 md:pt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="border-b border-gray-100 pb-6 md:pb-8">
          <nav aria-label="Breadcrumb" className="mb-5 md:mb-6">
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
                Guides &amp; kits
              </li>
            </ol>
          </nav>

          <h1 className="font-sans text-3xl font-bold uppercase leading-[1.05] tracking-tight text-gray-900 sm:text-4xl md:text-[2.65rem]">
            Guides &amp; kits
            <span className="mt-1.5 block font-serif text-xl font-normal normal-case tracking-normal text-gray-500 sm:text-2xl md:mt-2">
              Launch kits and content packs that plug into your brand.
            </span>
          </h1>
        </header>

        <section className="mt-8 md:mt-10">
          <div className="mb-4 text-left md:mb-5">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">Local launch kits</span>
            <h2 className="mt-1 text-xl font-serif font-normal text-gray-900 sm:text-2xl">
              Set up your local listings with ease.
            </h2>
            <p className="mt-2 max-w-2xl text-sm font-light leading-relaxed text-gray-500">
              Local business kits for Google and Yelp — each includes a step-by-step setup guide and proven tactics to rank
              higher in local search, whether you&apos;re launching new or refreshing a listing that&apos;s been live for
              years.
            </p>
          </div>

          <OfferMatrixPrimitive
            columns={matrixColumns}
            getCheckoutHref={getLocalBusinessKitCheckoutHref}
            onOfferExpand={handleOfferExpand}
          />

          <div className="mt-5 text-center md:text-left">
            <button
              type="button"
              onClick={openSampleManually}
              className="border-b border-gray-300 pb-0.5 text-xs font-bold uppercase tracking-widest text-gray-500 transition-colors hover:border-black hover:text-black"
            >
              Get the free sample pack
            </button>
          </div>
        </section>

        <section className="mt-12 border-t border-gray-100 pt-6 md:pt-8">
          <div className="mb-5 text-left md:mb-6">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">Content packs</span>
            <h2 className="mt-1.5 text-xl font-serif font-normal text-gray-900 sm:text-2xl">
              Ready-made copy for what you publish.
            </h2>
            <p className="mt-2 max-w-2xl text-sm font-light leading-relaxed text-gray-500">
              Content packs with captions, emails, and promos for social, offers, holidays, and routine updates — ready to
              edit and publish. Each pack includes clear content starters and calls-to-action to turn attention into bookings, replies, and
              visits, all tailored to your industry.
            </p>
          </div>
          <ContentPackGridPrimitive families={contentPackFamilies} getCheckoutHref={getContentPackCheckoutHref} />
        </section>
      </div>

      <FreeSampleLeadModal
        open={sampleOpen}
        onClose={() => setSampleOpen(false)}
        selectedIndustry={selectedIndustry}
        onIndustryChange={setSelectedIndustry}
        entrance={sampleEntrance}
      />
    </main>
  );
};

export default GuidesAndKitsPage;
