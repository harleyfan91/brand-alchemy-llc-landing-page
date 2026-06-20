import React from 'react';
import { useNavigate } from 'react-router-dom';
import AlchemyMark from './AlchemyMark';
import {
  buildReturnHref,
  queueStudioReturnScroll,
  readStudioReturnTarget,
} from '../utils/studioReturnPath';

const StudioFooter: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToHub = () => {
    const target = readStudioReturnTarget();
    if (!target.hash) {
      queueStudioReturnScroll(target.scrollY);
    }
    navigate(buildReturnHref(target));
  };

  return (
    <footer
      className="relative z-20 border-t py-6 md:py-5"
      style={{
        borderColor: 'var(--ba-studio-border)',
        backgroundColor: 'var(--ba-studio-bg)',
      }}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 sm:px-6 md:flex-row md:items-center md:justify-between md:gap-6 lg:px-8">
        <button
          type="button"
          onClick={handleBackToHub}
          className="text-[11px] font-medium uppercase tracking-widest transition-opacity hover:opacity-70 md:text-xs"
          style={{ color: 'var(--ba-studio-text-muted)' }}
        >
          ← Brand Alchemy
        </button>

        <div
          className="flex items-center gap-2.5 text-xs font-medium uppercase tracking-widest"
          style={{ color: 'var(--ba-studio-text-faint)' }}
        >
          <AlchemyMark size="xs" className="normal-case text-[var(--ba-studio-text-faint)]" />
          © {new Date().getFullYear()} Brand Alchemy LLC.
        </div>
      </div>
    </footer>
  );
};

export default StudioFooter;
