import React from 'react';
import './studio-glyph-field.css';

// ─── SVG glyphs (aligned with AlchemyBackground.tsx shapes) ─────────────────

const BetaSymbol: React.FC = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
    <path
      d="M 36 92 L 36 28 C 36 16, 58 20, 58 36 C 58 48, 44 50, 36 50 C 72 50, 72 76, 36 76"
      stroke="currentColor"
      strokeWidth="0.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FireTriangle: React.FC = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
    <polygon points="50,24 80,76 20,76" stroke="currentColor" strokeWidth="0.5" strokeLinejoin="round" />
  </svg>
);

const Sulfur: React.FC = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
    <polygon points="50,20 74,56 26,56" stroke="currentColor" strokeWidth="0.5" strokeLinejoin="round" />
    <line x1="50" y1="56" x2="50" y2="80" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
    <line x1="26" y1="69" x2="74" y2="69" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
  </svg>
);

const AlchemicalSun: React.FC = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
    <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="50" cy="50" r="3.5" fill="currentColor" />
  </svg>
);

const Mercury: React.FC = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
    <path d="M 34 20 C 34 40, 66 40, 66 20" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
    <circle cx="50" cy="49" r="14" stroke="currentColor" strokeWidth="0.5" />
    <line x1="50" y1="63" x2="50" y2="83" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
    <line x1="36" y1="73" x2="64" y2="73" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
  </svg>
);

const Earth: React.FC = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
    <polygon points="20,24 80,24 50,76" stroke="currentColor" strokeWidth="0.5" strokeLinejoin="round" />
    <line x1="28" y1="50" x2="72" y2="50" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
  </svg>
);

type GlyphPlacement = {
  id: string;
  Symbol: React.FC;
  className: string;
  duration: string;
  reverse?: boolean;
};

const GLYPHS: GlyphPlacement[] = [
  {
    id: 'mark',
    Symbol: () => (
      <span className="inline-block select-none font-bold tracking-[0.18em]" aria-hidden>
        β△
      </span>
    ),
    className: 'right-[8%] top-[12%] h-64 w-64 md:right-[12%] md:top-[8%] md:h-80 md:w-80',
    duration: '200s',
  },
  {
    id: 'beta',
    Symbol: BetaSymbol,
    className: 'left-[6%] top-[28%] h-40 w-40 md:h-52 md:w-52',
    duration: '120s',
    reverse: true,
  },
  {
    id: 'fire',
    Symbol: FireTriangle,
    className: 'right-[22%] top-[52%] h-32 w-32 md:h-44 md:w-44',
    duration: '80s',
  },
  {
    id: 'sun',
    Symbol: AlchemicalSun,
    className: 'left-[18%] bottom-[18%] h-36 w-36 md:h-48 md:w-48',
    duration: '160s',
    reverse: true,
  },
  {
    id: 'mercury',
    Symbol: Mercury,
    className: 'right-[6%] bottom-[24%] h-28 w-28 md:h-36 md:w-36',
    duration: '100s',
  },
  {
    id: 'earth',
    Symbol: Earth,
    className: 'left-[42%] top-[62%] h-24 w-24 md:h-32 md:w-32',
    duration: '140s',
    reverse: true,
  },
  {
    id: 'sulfur',
    Symbol: Sulfur,
    className: 'left-[4%] top-[58%] h-20 w-20 md:h-28 md:w-28',
    duration: '90s',
  },
];

const StudioGlyphField: React.FC = () => (
  <div
    className="pointer-events-none absolute inset-0 overflow-hidden"
    style={{ color: 'var(--ba-studio-glyph-color)' }}
    aria-hidden="true"
  >
    {GLYPHS.map(({ id, Symbol, className, duration, reverse }) => (
      <div
        key={id}
        className={`ba-studio-glyph absolute ${className}`}
        style={{
          animationDuration: duration,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        <Symbol />
      </div>
    ))}
  </div>
);

export default StudioGlyphField;
