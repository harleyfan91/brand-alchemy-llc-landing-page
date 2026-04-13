import React, { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';

/**
 * Articles — tile title length (persistent spec)
 *
 * Keep this in sync with `articleTitleClass` below.
 *
 * Editorial
 * - Aim for about two to three lines in the narrow tile. Prefer shorter, clearer titles in CMS over
 *   pushing the smallest type tier.
 * - Target a **consistent band** for most titles (~53–88 characters) so neighboring tiles use the
 *   same type size. Very short (≤52) or very long (89+) titles step one size up or down relative to
 *   the default band.
 * - Character count is only a proxy; long words and punctuation change how lines break.
 * - No line-clamp or ellipsis on tile titles; wrap on word boundaries. `text-balance` where supported.
 *
 * Typography tiers by `title.length` (inclusive)
 * - 1–52:   `text-2xl` / `sm:text-3xl` (only very short headlines)
 * - 53–88:  `text-xl` / `sm:text-2xl` (default band — typical article titles)
 * - 89+:    `text-lg` / `sm:text-xl`
 */

/**
 * Articles — TODO and context (audience, content, IA)
 *
 * Audience
 * - Owner-operated SMBs: local shops, services, trades, Etsy, hospitality. They know their business,
 *   not marketing tech or agency jargon.
 * - Avoid tone aimed at SaaS founders, growth marketers, or “thought leadership” for pros.
 *
 * Content and naming
 * - **Articles** is the site story for this strip: plain, practical explainers, not a generic blog voice.
 * - Tile categories (e.g. Brand Basics, Social Media, Get Found) should read like owner questions,
 *   not internal channel labels.
 * - Topics: immediate problems — what to post, what to fix first, profiles, photos, local visibility,
 *   time and budget. Help first; soft tie-in to paid products only where it fits, no hard sell.
 * - Prefer a few strong articles over many thin or placeholder posts.
 * - How-to or step-by-step **guide-style** articles are one format we use; that does not rename this
 *   section away from Articles in the nav or on the page.
 *
 * Future: pages, SEO, navigation
 * - Replace the coming-soon modal with real article index/detail routes when content ships (URL scheme
 *   TBD). Full HTML, metadata, internal links for SEO; homepage strip can stay a teaser.
 * - Tiles: use `articleHref` for shipped articles (`/articles/...`); keep `slug` as a stable id;
 *   move long-form body copy out of this file into `content/articles/`.
 * - Header: today `#articles` on the marketing page; later you can point “Articles” to a dedicated index
 *   route while keeping section anchors on home if useful.
 * - Article template: choose one primary “up” link (Home `/` vs articles index) for breadcrumbs or back
 *   navigation and use it consistently.
 */

/** `gap-5` between tiles — keep in sync with carousel `gap-5` and width `calc`. */
const ARTICLE_TILE_GAP_PX = 20;

/**
 * Below `lg`, each slide uses this fraction of the scrollport width; the remainder lets the
 * previous/next tile peek in. Must stay in sync with article `width` % of the inner track.
 */
const MOBILE_CAROUSEL_SLIDE_FRAC = 0.78;

function useMediaQueryMatches(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

const CarouselNavIcon = ({ direction }: { direction: 'left' | 'right' }) => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    {direction === 'left' ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
  </svg>
);

function ArticlesCarouselNavButton({
  direction,
  disabled,
  onClick,
  variant,
}: {
  direction: 'left' | 'right';
  disabled: boolean;
  onClick: () => void;
  variant: 'side' | 'inline';
}) {
  const smUp = useMediaQueryMatches('(min-width: 640px)');
  const [hover, setHover] = useState(false);
  const hideSideOnNarrow = variant === 'side' && !smUp;

  const borderColor = disabled ? 'var(--ba-gray-200)' : hover ? 'var(--ba-gray-900)' : 'var(--ba-gray-600)';

  if (hideSideOnNarrow) {
    return null;
  }

  const shadow =
    disabled
      ? '0 1px 2px rgb(0 0 0 / 0.05)'
      : hover
        ? '0 2px 4px rgb(0 0 0 / 0.06), 0 8px 20px -4px rgb(0 0 0 / 0.14)'
        : '0 1px 2px rgb(0 0 0 / 0.07), 0 4px 14px -2px rgb(0 0 0 / 0.12)';

  const iconColor = disabled ? 'var(--ba-gray-300)' : hover ? '#000000' : 'var(--ba-gray-900)';

  const style: CSSProperties = {
    WebkitAppearance: 'none',
    appearance: 'none',
    boxSizing: 'border-box',
    width: '2.75rem',
    height: '2.75rem',
    minWidth: '2.75rem',
    minHeight: '2.75rem',
    padding: 0,
    margin: 0,
    border: `2px solid ${borderColor}`,
    borderRadius: '9999px',
    backgroundColor: '#ffffff',
    boxShadow: shadow,
    color: iconColor,
    cursor: disabled ? 'default' : 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    pointerEvents: disabled ? 'none' : 'auto',
    alignSelf: variant === 'side' ? 'center' : undefined,
    position: 'relative',
    zIndex: 20,
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'left' ? 'Previous articles' : 'Next articles'}
      style={style}
      onMouseEnter={() => {
        if (!disabled) setHover(true);
      }}
      onMouseLeave={() => setHover(false)}
    >
      <CarouselNavIcon direction={direction} />
    </button>
  );
}

type Article = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  reasonToRead: string;
  imageSrc: string;
  imageAlt: string;
  /** When set, the tile links to this route instead of opening the coming-soon dialog. */
  articleHref?: string;
};

/** Shared chrome for carousel tiles (button or Link). */
const ARTICLE_TILE_INTERACTIVE_CLASS =
  'group flex w-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white text-left shadow-none transition-[box-shadow,background-color,border-color] duration-500 max-lg:h-auto max-lg:min-h-[26rem] max-lg:w-[min(14rem,calc(100vw-4rem))] max-lg:shadow-sm hover:border-gray-200 hover:bg-gray-50 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 lg:h-[min(420px,52vh)] lg:min-h-0 lg:max-h-none lg:max-w-none lg:rounded-2xl lg:shadow-none';

const articles: Article[] = [
  {
    slug: 'branding-vs-marketing',
    category: 'Brand Basics',
    title: 'Branding vs. marketing: what does a small business actually need first?',
    summary:
      'A plain-English guide to what each one does, where they overlap, and what to focus on when you cannot do everything at once.',
    reasonToRead: 'Useful when you know your business needs help online but do not know where to start.',
    imageSrc: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=900',
    imageAlt: 'Design workspace with paper and tools',
    articleHref: '/articles/branding-vs-marketing-small-business',
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
  {
    slug: 'website-photos-trust',
    category: 'Website',
    title: 'Which website photos help customers trust you before they visit?',
    summary:
      'A simple checklist of shots that answer common questions and make your business feel real and approachable.',
    reasonToRead: 'Useful when your site feels empty or generic and you are not sure what to put above the fold.',
    imageSrc: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=900',
    imageAlt: 'Bright workspace with laptop and notebook',
  },
  {
    slug: 'placeholder-carousel-fifth',
    category: 'Reputation',
    title: 'What to say when someone reviews your business online (placeholder)',
    summary:
      'Draft topic: short, polite replies you can reuse, when to take a conversation offline, and how to keep star ratings from eating your whole week.',
    reasonToRead: 'Placeholder so the carousel scrolls on smaller screens; swap for a real article when you are ready.',
    imageSrc: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=900',
    imageAlt: 'Two people talking at a small table in a cafe',
  },
];

const articleCount = articles.length;

/** Typography tiers: see file-top “tile title length” comment. */
function articleTitleClass(title: string): string {
  const n = title.length;
  const base = 'mb-4 font-serif font-normal leading-snug text-gray-900 text-balance';
  if (n > 88) return `${base} text-lg sm:text-xl`;
  if (n > 52) return `${base} text-xl sm:text-2xl`;
  return `${base} text-2xl sm:text-3xl`;
}

const Articles: React.FC = () => {
  const lgUp = useMediaQueryMatches('(min-width: 1024px)');
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollNav = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const max = scrollWidth - clientWidth;
    setCanScrollPrev(scrollLeft > 2);
    setCanScrollNext(scrollLeft < max - 2);
  }, []);

  const scrollByOneTile = (dir: -1 | 1) => {
    const root = scrollRef.current;
    const first = root?.querySelector('article');
    if (!root || !first) return;
    const w = (first as HTMLElement).offsetWidth + ARTICLE_TILE_GAP_PX;
    root.scrollBy({ left: dir * w, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollNav();
    el.addEventListener('scroll', updateScrollNav, { passive: true });
    const ro = new ResizeObserver(updateScrollNav);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', updateScrollNav);
      ro.disconnect();
    };
  }, [updateScrollNav]);

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
      <section id="articles" className="scroll-mt-20 bg-white py-8 md:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="ba-section-stack--compact relative z-20 mx-auto mb-6 max-w-3xl md:mb-16">
            <h2 className="ba-section-eyebrow text-xs font-bold uppercase tracking-[0.3em] text-gray-400">
              Articles
            </h2>
            <h3 className="ba-section-display-title font-serif text-4xl font-normal text-gray-900 md:text-5xl">
              Marketing concepts, made simple.
            </h3>
            <p className="ba-section-support text-sm font-light leading-relaxed text-gray-500 md:text-base">
              Short, plain-English explainers on how to get found, what to post, and how to make your business look its best.
            </p>
          </div>

          <div className="flex items-stretch gap-2 pb-4 pt-1 sm:gap-3">
            <ArticlesCarouselNavButton
              variant="side"
              direction="left"
              disabled={!canScrollPrev}
              onClick={() => scrollByOneTile(-1)}
            />

            <div
              ref={scrollRef}
              className="min-w-0 flex-1 overflow-x-auto px-4 py-4 text-left [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {/* Below lg: track ≥ N× scrollport; each slide is (MOBILE_CAROUSEL_SLIDE_FRAC/N)× track so slide ≈ that fraction of scrollport → adjacent tiles peek. */}
              <div
                className="flex items-start gap-5 lg:items-stretch lg:min-w-0 lg:w-full"
                style={lgUp ? undefined : { minWidth: `${articleCount * 100}%` }}
              >
                {articles.map((article) => (
                  <article
                    key={article.slug}
                    className="relative z-20 isolate flex shrink-0 justify-start py-3 lg:block lg:w-[calc((100%-3.75rem)/4)]"
                    style={
                      lgUp
                        ? undefined
                        : {
                            width: `${(100 * MOBILE_CAROUSEL_SLIDE_FRAC) / articleCount}%`,
                            flexShrink: 0,
                          }
                    }
                  >
                    {article.articleHref ? (
                      <Link
                        to={article.articleHref}
                        className={ARTICLE_TILE_INTERACTIVE_CLASS}
                        aria-label={`Read article: ${article.title}`}
                      >
                        <div className="relative h-40 shrink-0 overflow-hidden bg-gray-100 sm:h-44 lg:h-[30%] lg:min-h-[7.5rem]">
                          <img
                            src={article.imageSrc}
                            alt={article.imageAlt}
                            className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between gap-2 bg-white px-3.5 pb-4 pt-4 sm:px-4 sm:pb-5 sm:pt-5 max-lg:overflow-visible lg:min-h-0 lg:overflow-visible">
                          <h4 className={articleTitleClass(article.title)}>{article.title}</h4>
                          <span className="text-left text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                            {article.category}
                          </span>
                        </div>
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setComingSoonOpen(true)}
                        aria-label={`${article.title} — full article coming soon`}
                        className={`${ARTICLE_TILE_INTERACTIVE_CLASS} appearance-none`}
                      >
                        <div className="relative h-40 shrink-0 overflow-hidden bg-gray-100 sm:h-44 lg:h-[30%] lg:min-h-[7.5rem]">
                          <img
                            src={article.imageSrc}
                            alt={article.imageAlt}
                            className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between gap-2 bg-white px-3.5 pb-4 pt-4 sm:px-4 sm:pb-5 sm:pt-5 max-lg:overflow-visible lg:min-h-0 lg:overflow-visible">
                          <h4 className={articleTitleClass(article.title)}>{article.title}</h4>
                          <span className="text-left text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                            {article.category}
                          </span>
                        </div>
                      </button>
                    )}
                  </article>
                ))}
              </div>
            </div>

            <ArticlesCarouselNavButton
              variant="side"
              direction="right"
              disabled={!canScrollNext}
              onClick={() => scrollByOneTile(1)}
            />
          </div>

          <div className="mt-1 flex justify-center gap-6 sm:hidden">
            <ArticlesCarouselNavButton
              variant="inline"
              direction="left"
              disabled={!canScrollPrev}
              onClick={() => scrollByOneTile(-1)}
            />
            <ArticlesCarouselNavButton
              variant="inline"
              direction="right"
              disabled={!canScrollNext}
              onClick={() => scrollByOneTile(1)}
            />
          </div>
        </div>
      </section>

      {comingSoonOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 py-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="article-coming-soon-title"
          aria-describedby="article-coming-soon-desc"
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
              id="article-coming-soon-title"
              className="pr-14 font-serif text-2xl font-normal leading-tight text-gray-900 sm:text-3xl"
            >
              Coming soon
            </h4>
            <p
              id="article-coming-soon-desc"
              className="mt-4 text-sm font-light leading-relaxed text-gray-500 sm:text-base"
            >
              We’re writing full articles you can read on their own URLs. They aren’t live yet—check back soon.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Articles;
