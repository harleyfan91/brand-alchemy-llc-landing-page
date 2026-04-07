import React, { useEffect, useRef, useState } from 'react';

/**
 * Guides section strategy notes:
 * - Audience is owner-operated small businesses, so topics must feel practical on first read.
 * - Homepage role is education + trust + soft upsell between Products and Contact.
 * - Real SEO value will come later from indexable `/guides/*` pages, not from the homepage strip alone.
 * - Keep cards headline-first and easy to scan; avoid tiny decorative tiles or jargon-heavy essays.
 * - Best future topics stay close to owner questions: branding vs marketing, social posting, reviews,
 *   website photos, Google Business, and how to prioritize limited time and budget.
 *
 * Guides — why this exists and what “value” means for the reader
 *
 * Who they are
 * - Owner-operated SMBs: restaurant, Etsy, trades, local services. Experts in their craft, not in
 *   marketing. Copy that sounds like SaaS founders, growth marketers, or agencies is wrong for us.
 *
 * What they actually find valuable (not abstract “thought leadership”)
 * - Answers to immediate, concrete questions: “What do I post?” “What should I fix first?”
 *   “Why does my profile look sketchy?” Match how they search and worry, not how marketers
 *   bucket topics (branding / social / SEO as labels).
 * - Plain language, steps or frameworks they can use this week, realistic constraints (time,
 *   budget, no design team). Outcome they can picture: more trust, clearer offers, less overwhelm.
 * - Help first; soft path to products second. Each guide should naturally relate to a kit or
 *   solution when it fits, without a hard sell — e.g. Google profile guide → Get Found / kits.
 *
 * What usually does NOT land (avoid)
 * - Generic essays (“why branding matters”) unless tightly tied to a decision they face today.
 * - Jargon, acronym soup, or content that could live on any agency site.
 * - Thin or placeholder-feeling posts: hurts trust more than no guides at all. Prefer a small set
 *   of strong cornerstone articles over volume.
 *
 * This page vs future article URLs
 * - Homepage strip = discovery + trust; real SEO comes from indexable `/guides/*` (or similar)
 *   pages with full bodies, internal links, and intent-matched titles — not the carousel alone.
 *
 * UX notes
 * - Headline-first cards, scannable; horizontal scroll is fine if tiles stay readable (not tiny
 *   decorative chips).
 *
 * TODO: Replace the interim “coming soon” dialog with real individual guide/blog post pages.
 * - Add routes such as `/guides/:slug` (or `/blog/:slug`) with full article layout, metadata, and
 *   indexable HTML for SEO.
 * - Point each tile at `href` + client navigation (e.g. React Router) instead of opening a modal.
 * - Keep `slug` on each guide entry as the canonical path segment; migrate body copy out of this file.
 * - Remove the dialog and its state once those pages ship.
 */

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

type Guide = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  reasonToRead: string;
  imageSrc: string;
  imageAlt: string;
};

const guides: Guide[] = [
  {
    slug: 'branding-vs-marketing',
    category: 'Brand Basics',
    title: 'Branding vs. marketing: what does a small business actually need first?',
    summary:
      'A plain-English guide to what each one does, where they overlap, and what to focus on when you cannot do everything at once.',
    reasonToRead: 'Useful when you know your business needs help online but do not know where to start.',
    imageSrc: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=900',
    imageAlt: 'Design workspace with paper and tools',
  },
  {
    slug: 'weekly-social-posts',
    category: 'Social Media',
    title: 'What should a small business post on social media each week?',
    summary:
      'A practical framework for posting consistently without feeling like you need to become a full-time content creator.',
    reasonToRead: 'Useful when you need ideas you can actually keep up with week after week.',
    imageSrc: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=900',
    imageAlt: 'Phone showing social apps',
  },
  {
    slug: 'google-business-trust',
    category: 'Get Found',
    title: 'How to make your Google Business profile look trustworthy',
    summary:
      'The essentials that help people feel confident contacting you, from photos and descriptions to reviews and consistency.',
    reasonToRead: 'Useful when local search is already sending people your way, but your profile is not doing enough work.',
    imageSrc: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=900',
    imageAlt: 'Local business storefront',
  },
];

const Guides: React.FC = () => {
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!comingSoonOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setComingSoonOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [comingSoonOpen]);

  return (
    <>
      <section id="guides" className="relative z-20 scroll-mt-20 bg-white py-10 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-8 max-w-3xl text-center md:mb-12">
            <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-gray-400 md:mb-4">
              Guides
            </h2>
            <h3 className="font-serif text-4xl font-normal text-gray-900 md:text-5xl">
              Helpful reads for business owners
            </h3>
            <p className="mt-5 text-sm font-light leading-relaxed text-gray-500 md:text-base">
              If you run a shop or service and want to look good online without drowning in buzzwords, these short reads are for you.
              They cover how to show up clearly, what to post, and how to make your business easy to find and trust.
            </p>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-3 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {guides.map((guide) => (
              <article
                key={guide.slug}
                className="snap-start shrink-0 w-[280px] sm:w-[320px] lg:w-[360px]"
              >
                <button
                  type="button"
                  onClick={() => setComingSoonOpen(true)}
                  aria-label={`${guide.title} — full guide coming soon`}
                  className="group flex h-[min(420px,72vw)] w-full flex-col overflow-hidden border-0 bg-white text-left transition-colors duration-300 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                >
                  <div className="relative h-[30%] min-h-[7.5rem] shrink-0 overflow-hidden bg-gray-100">
                    <img
                      src={guide.imageSrc}
                      alt={guide.imageAlt}
                      className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                    />
                  </div>
                  <div className="flex min-h-0 flex-1 flex-col px-4 pb-4 pt-4 sm:px-5 sm:pb-5 sm:pt-5">
                    <h4 className="mb-3 font-serif text-xl font-normal leading-snug text-gray-900 sm:text-2xl">
                      {guide.title}
                    </h4>
                    <p className="mb-4 line-clamp-4 text-sm font-light leading-relaxed text-gray-500">
                      {guide.summary}
                    </p>
                    <div className="mt-auto flex items-end justify-between gap-3 pt-1">
                      <span className="text-left text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                        {guide.category}
                      </span>
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200/90 bg-white/95 text-gray-500 shadow-sm transition-all duration-200 group-hover:border-gray-300 group-hover:text-gray-900 group-hover:shadow-md"
                        aria-hidden
                      >
                        <ChevronRightMicro className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-px" />
                      </span>
                    </div>
                  </div>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {comingSoonOpen && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 px-4 py-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="guide-coming-soon-title"
          aria-describedby="guide-coming-soon-desc"
          onClick={() => setComingSoonOpen(false)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setComingSoonOpen(false)}
              className="absolute right-4 top-4 rounded-full border border-gray-200 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 transition-colors hover:text-gray-900"
            >
              Close
            </button>

            <h4
              id="guide-coming-soon-title"
              className="pr-14 font-serif text-2xl font-normal leading-tight text-gray-900 sm:text-3xl"
            >
              Coming soon
            </h4>
            <p
              id="guide-coming-soon-desc"
              className="mt-4 text-sm font-light leading-relaxed text-gray-500 sm:text-base"
            >
              We’re writing full guide pages you can read on their own URLs. They aren’t live yet—check back soon.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Guides;
