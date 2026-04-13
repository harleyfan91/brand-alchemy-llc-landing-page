import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

type Props = {
  markdown: string;
};

const linkClass =
  'font-medium text-gray-900 underline underline-offset-[3px] decoration-gray-400 hover:decoration-gray-900';

/**
 * Renders article markdown with Brand Alchemy–aligned typography (serif headings, readable body).
 */
const ArticleMarkdown: React.FC<Props> = ({ markdown }) => {
  return (
    <div className="article-markdown">
    <ReactMarkdown
      components={{
        h1: ({ children }) => (
          <h1 className="mb-6 font-serif text-3xl font-normal leading-tight text-gray-900 sm:text-4xl">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="mb-3 mt-10 font-serif text-2xl font-normal text-gray-900 sm:text-3xl">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="mb-2 mt-8 font-serif text-xl font-normal text-gray-900">{children}</h3>
        ),
        p: ({ children }) => <p className="mb-4 text-base font-light leading-relaxed text-gray-700">{children}</p>,
        ul: ({ children }) => <ul className="mb-4 list-disc space-y-2 pl-6 text-base font-light leading-relaxed text-gray-700">{children}</ul>,
        ol: ({ children }) => <ol className="mb-4 list-decimal space-y-2 pl-6 text-base font-light leading-relaxed text-gray-700">{children}</ol>,
        li: ({ children }) => <li className="pl-1">{children}</li>,
        strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
        em: ({ children }) => <em className="italic text-gray-800">{children}</em>,
        hr: () => <hr className="my-10 border-gray-200" />,
        img: ({ src, alt }) => (
          <img
            src={src}
            alt={alt ?? ''}
            className="mb-8 mt-2 w-full max-h-[420px] rounded-xl object-cover grayscale"
            loading="lazy"
          />
        ),
        a: ({ href, children }) => {
          if (href?.startsWith('/') && !href.startsWith('//')) {
            return (
              <Link to={href} className={linkClass}>
                {children}
              </Link>
            );
          }
          return (
            <a href={href} className={linkClass} target={href?.startsWith('http') ? '_blank' : undefined} rel={href?.startsWith('http') ? 'noreferrer noopener' : undefined}>
              {children}
            </a>
          );
        },
      }}
    >
      {markdown}
    </ReactMarkdown>
    </div>
  );
};

export default ArticleMarkdown;
