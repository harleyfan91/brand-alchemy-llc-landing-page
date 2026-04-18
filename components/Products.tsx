import React from 'react';
import { Link } from 'react-router-dom';

// Eyebrow / pricing lines for homepage product cards (full kit UX lives on `/local-business`).
/** Eyebrow on Identity Kit card */
const IDENTITY_CARD_EYEBROW = 'Brand & voice';
const IDENTITY_CARD_PRICE_LINE = 'Core $79 · Pro $149';

/** Eyebrow on local-business card */
const CATALOG_CARD_EYEBROW = 'Local business';
const CATALOG_CARD_PRICE_LINE = 'From $19 · Core kits from $39';

/** Eyebrow on Camentra card */
const CAMENTRA_CARD_EYEBROW = 'iOS App';

/** User-facing name for the Google/Yelp/packs page/category. */
const GUIDES_KITS_TITLE = 'Guides & launch kits';

const identityKitDescription =
  "A personalized kit that defines your brand voice, look, and feel, so you always sound and look like you. Answer a few questions to download yours today.";

const Products = () => {
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
            <div className="flex flex-1 flex-col p-5 text-left sm:p-8 md:p-10">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">{IDENTITY_CARD_EYEBROW}</span>
              <h4 className="text-2xl font-serif font-normal text-gray-900 mb-4">Identity Kit</h4>
              <p className="text-gray-500 text-sm leading-relaxed font-light mb-4">{identityKitDescription}</p>
              <div className="mt-auto pt-6">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">{IDENTITY_CARD_PRICE_LINE}</p>
                <span className="text-xs font-bold text-black border-b border-black pb-1 uppercase tracking-widest w-fit">View Identity Kit</span>
              </div>
            </div>
          </Link>

          <Link
            to="/local-business"
            className="relative z-20 bg-white group rounded-xl sm:rounded-2xl overflow-hidden border border-gray-100 flex flex-col transition-all duration-500 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] no-underline text-inherit"
          >
            <div className="aspect-[16/10] overflow-hidden bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200"
                alt="Local business: owner helping a customer at the counter"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-5 text-left sm:p-8 md:p-10">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">{CATALOG_CARD_EYEBROW}</span>
              <h4 className="text-2xl font-serif font-normal text-gray-900 mb-4">{GUIDES_KITS_TITLE}</h4>
              <p className="text-gray-500 text-sm leading-relaxed font-light mb-6">
                Practical products for local businesses that want to show up more clearly online. They help with
                profiles, replies, content, photos, and the everyday marketing work that brings in more customers.
              </p>
              <div className="mt-auto pt-6">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">{CATALOG_CARD_PRICE_LINE}</p>
                <span className="text-xs font-bold text-black border-b border-black pb-1 uppercase tracking-widest w-fit">View guides and kits</span>
              </div>
            </div>
          </Link>

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
            <div className="flex flex-1 flex-col p-5 text-left sm:p-8 md:p-10">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">{CAMENTRA_CARD_EYEBROW}</span>
              <h4 className="text-2xl font-serif font-normal text-gray-900 mb-4">Camentra</h4>
              <p className="text-gray-500 text-sm leading-relaxed font-light mb-4">
                The photo coach in your pocket: live on-screen blueprints and real-time, AI powered coaching so you nail the shot every time.
                See the site for current pricing.
              </p>
              <span className="mt-auto pt-6 text-xs font-bold text-black border-b border-black pb-1 uppercase tracking-widest w-fit">Visit Site</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Products;
