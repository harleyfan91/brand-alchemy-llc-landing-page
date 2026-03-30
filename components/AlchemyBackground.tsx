import React, { useEffect, useRef } from 'react';

// ─── Scroll animation utilities ───────────────────────────────────────────────
const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

const mapRange = (
  value: number,
  inMin: number, inMax: number,
  outMin: number, outMax: number
): number => {
  const t = clamp((value - inMin) / (inMax - inMin), 0, 1);
  return outMin + (outMax - outMin) * t;
};

// ─── SVG Symbols (Strictly standardized to equal visual weight and width) ─────

// Beta (β) - Brand Mark / The Beginning
const BetaSymbol: React.FC = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path 
      d="M 38 85 V 25 C 38 15, 62 15, 62 32 C 62 44, 45 48, 38 48 C 50 48, 66 54, 66 67 C 66 82, 38 80, 38 80" 
      stroke="currentColor" 
      strokeWidth="0.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </svg>
);

// Fire (🜂) - Leader / Transformation
const FireTriangle: React.FC = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <polygon points="50,24 80,76 20,76" stroke="currentColor" strokeWidth="0.5" strokeLinejoin="round" />
  </svg>
);

// Sun (☉) - Gold / Perfection
const AlchemicalSun: React.FC = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="50" cy="50" r="3.5" fill="currentColor" />
  </svg>
);

// Mercury (☿) - Communication / fluid messaging
const Mercury: React.FC = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M 26 24 C 26 44, 74 44, 74 24" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
    <circle cx="50" cy="48" r="16" stroke="currentColor" strokeWidth="0.5" />
    <line x1="50" y1="64" x2="50" y2="84" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
    <line x1="26" y1="74" x2="74" y2="74" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
  </svg>
);

// Air (🜁) - Broadcast / expanding reach
const Air: React.FC = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <polygon points="50,24 80,76 20,76" stroke="currentColor" strokeWidth="0.5" strokeLinejoin="round" />
    <line x1="35" y1="50" x2="65" y2="50" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
  </svg>
);

// Salt (🜔) - The Core / foundational setup
const Salt: React.FC = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" />
    <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
  </svg>
);

// Earth (🜃) - The Local Base / grounded placement
const Earth: React.FC = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <polygon points="20,24 80,24 50,76" stroke="currentColor" strokeWidth="0.5" strokeLinejoin="round" />
    <line x1="35" y1="50" x2="65" y2="50" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
  </svg>
);

// ─── Sequence Configuration ───────────────────────────────────────────────────

const sequence = [
  AlchemicalSun, Mercury, Air, Salt, Earth,
  AlchemicalSun, Mercury, Air, Salt, Earth
];

// The "Middle Ground" spacing (48vw looks balanced between tight and loose)
const SYMBOL_SPACING_VW = 48; 

// ─── Background Layer Component ───────────────────────────────────────────────

const AlchemyBackground: React.FC = () => {
  const betaRef = useRef<HTMLDivElement>(null);
  const triRef = useRef<HTMLDivElement>(null);
  const trainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tick = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = scrollY / maxScroll; // 0 = top, 1 = bottom

      // ── Beta Symbol (Static left side, fades out early) ──
      const betaOpacity = p < 0.15 ? 0.14 : mapRange(p, 0.15, 0.25, 0.14, 0);

      if (betaRef.current) {
        betaRef.current.style.transform = `translate(calc(-50% - 25vw), -50%)`; // -25vw perfectly mirrors Triangle's +25vw
        betaRef.current.style.opacity = String(clamp(betaOpacity, 0, 0.15));
      }

      // ── Triangle & Train (Phase 1: Rotate in place. Phase 2: Pan right) ──
      const baseX  = p < 0.30 ? 25 : mapRange(p, 0.30, 1.0, 25, 600); 
      const triRot = p < 0.30 ? mapRange(p, 0, 0.30, 0, 90) : 90; 

      // Train fades in only after Beta is completely gone (0.25 -> 0.30)
      const trainOpacity = 
        p < 0.25 ? 0 : 
        p < 0.30 ? mapRange(p, 0.25, 0.30, 0, 0.14) : 
        0.14;

      if (triRef.current) {
        triRef.current.style.transform = 
          `translate(calc(-50% + ${baseX}vw), -50%) rotate(${triRot}deg)`;
        triRef.current.style.opacity = "0.14";
      }

      if (trainRef.current) {
        trainRef.current.style.transform = `translate(calc(-50% + ${baseX}vw), -50%)`;
        trainRef.current.style.opacity = String(clamp(trainOpacity, 0, 0.15));
      }
    };

    tick(); 
    window.addEventListener('scroll', tick, { passive: true });
    return () => window.removeEventListener('scroll', tick);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 10 }}
      aria-hidden="true"
    >
      {/* Beta (β) Layer */}
      <div
        ref={betaRef}
        className="absolute text-gray-900"
        style={{
          top: '50%',
          left: '50%',
          width: '72vmin',
          height: '72vmin',
          opacity: 0.14,
          willChange: 'transform, opacity',
        }}
      >
        <BetaSymbol />
      </div>

      {/* Triangle (△) Leader Layer */}
      <div
        ref={triRef}
        className="absolute text-gray-900"
        style={{
          top: '50%',
          left: '50%',
          width: '72vmin',
          height: '72vmin',
          opacity: 0.14,
          willChange: 'transform, opacity',
        }}
      >
        <FireTriangle />
      </div>

      {/* Scrolling Toolkit Layer */}
      <div
        ref={trainRef}
        className="absolute text-gray-900"
        style={{
          top: '50%',
          left: '50%',
          width: 0, 
          height: 0,
          opacity: 0,
          willChange: 'transform, opacity',
        }}
      >
        {sequence.map((Symbol, index) => (
          <div
            key={index}
            className="absolute"
            style={{
              width: '72vmin',
              height: '72vmin',
              transform: `translate(calc(-50% - ${(index + 1) * SYMBOL_SPACING_VW}vw), -50%)`
            }}
          >
            <Symbol />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlchemyBackground;
