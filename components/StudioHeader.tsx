import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AlchemyMark from './AlchemyMark';
import { STUDIO_INQUIRY_HREF, STUDIO_INQUIRY_IS_EXTERNAL, STUDIO_INSTAGRAM_URL } from '../content/studio';
import {
  buildReturnHref,
  queueStudioReturnScroll,
  readStudioReturnTarget,
} from '../utils/studioReturnPath';

const InstagramIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
    <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" />
  </svg>
);

const StudioHeader: React.FC = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const handleBackToHub = () => {
    closeMenu();
    const target = readStudioReturnTarget();
    if (!target.hash) {
      queueStudioReturnScroll(target.scrollY);
    }
    navigate(buildReturnHref(target));
  };

  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 transition-[background-color,border-color,padding-top,padding-bottom,backdrop-filter] duration-300"
      style={{
        backgroundColor: isScrolled || isMenuOpen ? 'rgba(13, 13, 13, 0.92)' : 'var(--ba-studio-bg)',
        backdropFilter: isScrolled || isMenuOpen ? 'blur(12px)' : undefined,
        WebkitBackdropFilter: isScrolled || isMenuOpen ? 'blur(12px)' : undefined,
        borderBottom: isScrolled || isMenuOpen ? '1px solid var(--ba-studio-border)' : '1px solid transparent',
        paddingTop: isScrolled || isMenuOpen ? '0.75rem' : '1.25rem',
        paddingBottom: isScrolled || isMenuOpen ? '0.75rem' : '1.25rem',
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/studio"
          onClick={closeMenu}
          className="group flex items-center gap-2.5 md:gap-3"
          aria-label="Brand Alchemy Studio, home"
        >
          <AlchemyMark size="lg" className="text-[var(--ba-studio-text)] transition-colors group-hover:text-[var(--ba-studio-text-muted)]" />
          {/* Mobile: just "Studio", same type scale as the desktop wordmark */}
          <span
            className="text-xl font-bold uppercase tracking-tight transition-colors group-hover:text-[var(--ba-studio-text-muted)] md:hidden"
            style={{ color: 'var(--ba-studio-text)' }}
          >
            Studio
          </span>
          {/* Desktop: "Brand Alchemy" + muted "Studio" sub-label */}
          <span
            className="hidden text-xl font-bold uppercase tracking-tight transition-colors group-hover:text-[var(--ba-studio-text-muted)] md:inline"
            style={{ color: 'var(--ba-studio-text)' }}
          >
            Brand Alchemy{' '}
            <span style={{ color: 'var(--ba-studio-text-muted)' }}>Studio</span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <button
            type="button"
            onClick={handleBackToHub}
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--ba-studio-text-muted)] transition-colors hover:text-[var(--ba-studio-text)]"
          >
            ← Brand Alchemy
          </button>
          {STUDIO_INQUIRY_IS_EXTERNAL ? (
            <a
              href={STUDIO_INQUIRY_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[var(--ba-studio-accent)] px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--ba-studio-accent)] transition-colors hover:bg-[var(--ba-studio-accent)] hover:text-[var(--ba-studio-bg)]"
            >
              Submit an inquiry
            </a>
          ) : (
            <Link
              to={STUDIO_INQUIRY_HREF}
              className="rounded-full border border-[var(--ba-studio-accent)] px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--ba-studio-accent)] transition-colors hover:bg-[var(--ba-studio-accent)] hover:text-[var(--ba-studio-bg)]"
            >
              Submit an inquiry
            </Link>
          )}
          <a
            href={STUDIO_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--ba-studio-text-muted)] transition-colors hover:text-[var(--ba-studio-text)]"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <a
            href={STUDIO_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--ba-studio-text-muted)] transition-colors hover:text-[var(--ba-studio-text)]"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="p-2 text-[var(--ba-studio-text)]"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
        style={{
          backgroundColor: 'var(--ba-studio-bg)',
          borderTop: isMenuOpen ? '1px solid var(--ba-studio-border)' : undefined,
        }}
      >
        <nav className="flex flex-col items-center gap-8 p-8 text-center text-[11px] font-bold uppercase tracking-[0.4em]">
          <button
            type="button"
            onClick={handleBackToHub}
            className="text-[var(--ba-studio-text-muted)] transition-colors hover:text-[var(--ba-studio-text)]"
          >
            ← Brand Alchemy
          </button>
          {STUDIO_INQUIRY_IS_EXTERNAL ? (
            <a
              href={STUDIO_INQUIRY_HREF}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="rounded-full border border-[var(--ba-studio-accent)] px-6 py-3 text-[var(--ba-studio-accent)] transition-colors hover:bg-[var(--ba-studio-accent)] hover:text-[var(--ba-studio-bg)]"
            >
              Submit an inquiry
            </a>
          ) : (
            <Link
              to={STUDIO_INQUIRY_HREF}
              onClick={closeMenu}
              className="rounded-full border border-[var(--ba-studio-accent)] px-6 py-3 text-[var(--ba-studio-accent)] transition-colors hover:bg-[var(--ba-studio-accent)] hover:text-[var(--ba-studio-bg)]"
            >
              Submit an inquiry
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default StudioHeader;
