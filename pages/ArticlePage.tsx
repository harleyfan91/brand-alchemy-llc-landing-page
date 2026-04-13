import React, { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import ArticleMarkdown from '../components/ArticleMarkdown';
import { ARTICLE_INLINE_CTA_SLOT } from '../components/ArticleProductCallout';
import { formatPublishedDate } from '../utils/formatPublishedDate';
import { parseArticleFile } from '../utils/parseArticleFile';
import { renderArticleInlineCta } from './articleInlineCta';

import brandingVsMarketingRaw from '../content/articles/branding-vs-marketing.md?raw';

const ARTICLE_SOURCES: Record<string, string> = {
  'branding-vs-marketing-small-business': brandingVsMarketingRaw,
};

/**
 * Renders a single editorial article from `content/articles/*.md` (imported as raw).
 * Add new slugs to `ARTICLE_SOURCES` when shipping additional pieces.
 */
const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const raw = slug ? ARTICLE_SOURCES[slug] : undefined;

  const parsed = raw ? parseArticleFile(raw) : null;
  const titleForHead = parsed?.titleTag ?? 'Article';
  const metaDesc = parsed?.metaDescription ?? '';
  const publishedLabel =
    parsed?.datePublished != null && parsed.datePublished.length > 0
      ? formatPublishedDate(parsed.datePublished)
      : null;
  const contributor = parsed?.author?.length ? parsed.author : null;

  useEffect(() => {
    document.title = `${titleForHead} | Brand Alchemy`;

    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    if (metaDesc) {
      meta.setAttribute('content', metaDesc);
    }

    return () => {
      document.title = 'Brand Alchemy | Business Consulting & Solutions';
    };
  }, [titleForHead, metaDesc]);

  if (!slug || !raw || !parsed) {
    return <Navigate to="/" replace />;
  }

  const bodyParts = parsed.body.split(ARTICLE_INLINE_CTA_SLOT);
  const beforeInlineCta = bodyParts[0]?.trim() ?? '';
  const afterInlineCta = bodyParts.length > 1 ? bodyParts.slice(1).join(ARTICLE_INLINE_CTA_SLOT).trim() : '';
  const hasInlineCtaSlot = bodyParts.length > 1;
  const inlineCta = renderArticleInlineCta(slug);

  return (
    <main className="flex-grow scroll-mt-20 bg-white pb-16 pt-24 md:pb-20 md:pt-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-1 sm:mb-7 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-4 sm:gap-y-1 md:mb-8">
          <nav aria-label="Breadcrumb" className="min-w-0">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-medium uppercase tracking-[0.18em] text-gray-400 md:text-xs md:tracking-[0.2em]">
              <li>
                <Link to="/" className="text-gray-500 transition-colors hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li aria-hidden className="select-none text-gray-300">
                /
              </li>
              <li>
                <Link to="/#articles" className="text-gray-500 transition-colors hover:text-gray-900">
                  Articles
                </Link>
              </li>
              <li aria-hidden className="select-none text-gray-300">
                /
              </li>
              <li className="max-w-[min(100%,14rem)] truncate text-gray-900 sm:max-w-none" aria-current="page">
                {titleForHead}
              </li>
            </ol>
          </nav>

          {publishedLabel && parsed.datePublished ? (
            <p className="shrink-0 text-[10px] font-medium uppercase tracking-[0.14em] text-gray-400 sm:text-right md:text-[11px] md:tracking-[0.16em]">
              {contributor ? (
                <>
                  <span className="font-normal tracking-normal text-gray-500 normal-case">{contributor}</span>
                  <span className="mx-1.5 text-gray-300" aria-hidden>
                    ·
                  </span>
                </>
              ) : null}
              Published{' '}
              <time dateTime={parsed.datePublished} className="font-normal tracking-normal text-gray-500 normal-case">
                {publishedLabel}
              </time>
            </p>
          ) : null}
        </div>

        {hasInlineCtaSlot && inlineCta ? (
          <>
            <ArticleMarkdown markdown={beforeInlineCta} />
            {inlineCta}
            <ArticleMarkdown markdown={afterInlineCta} />
          </>
        ) : (
          <ArticleMarkdown markdown={parsed.body} />
        )}
      </div>
    </main>
  );
};

export default ArticlePage;
