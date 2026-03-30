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

// ─── SVG Symbols (All sharing 100x100 viewBox and 0.5 stroke) ────────────────

const FireTriangle: React.FC = () => (
  <svg viewBox="0 0 100 87" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <polygon points="50,1 99,86 1,86" stroke="currentColor" strokeWidth="0.5" strokeLinejoin="round" />
  </svg>
);

const AlchemicalSun: React.FC = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="50" cy="50" r="33" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="50" cy="50" r="3.5" fill="currentColor" />
  </svg>
);

// Mercury (☿) - Communication / fluid messaging 
const Mercury: React.FC = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M 35 25 C 35 38, 65 38, 65 25" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
    <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="0.5" />
    <line x1="50" y1="65" x2="50" y2="85" stroke="currentColor" strokeWidth="0.5" />
    <line x1="40" y1="75" x2="60" y2="75" stroke="currentColor" strokeWidth="0.5" />
  </svg>
);

// Air (🜁) - Broadcast / expanding reach
const Air: React.FC = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <polygon points="50,15 85,75 15,75" stroke="currentColor" strokeWidth="0.5" strokeLinejoin="round" />
    <line x1="33" y1="35" x2="67" y2="35" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
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
    <polygon points="15,25 85,25 50,85" stroke="currentColor" strokeWidth="0.5" strokeLinejoin="round" />
    <line x1="33" y1="65" x2="67" y2="65" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
  </svg>
);

// ─── Sequence Configuration ───────────────────────────────────────────────────
// We loop the sequence once so it stretches deep into the page scroll.
const sequence = [
  AlchemicalSun, Mercury, Air, Salt, Earth,
  AlchemicalSun, Mercury, Air, Salt, Earth
];

// Distance between each symbol in viewport width units
const SYMBOL_SPACING_VW = 55; 

// ─── Background Layer Component ───────────────────────────────────────────────

const AlchemyBackground: React.FC = () => {
  const triRef = useRef<HTMLDivElement>(null);
  const trainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tick = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = scrollY / maxScroll; // 0 = top, 1 = bottom

      // ── 1. Fire Triangle ─────────────────────────────────────────────────
      const triScale = p < 0.30 ? mapRange(p, 0, 0.30, 1.0, 1.6) : 1.6;
      const triX     = p < 0.30 ? 25 : mapRange(p, 0.30, 0.45, 25, 120); 
      const triY     = 0; 
      const triRot   = p < 0.30 ? mapRange(p, 0, 0.30, 0, 90) : 90; 
      const triOpacity = p < 0.35 ? 0.14 : mapRange(p, 0.35, 0.45, 0.14, 0);

      if (triRef.current) {
        triRef.current.style.transform =
          `translate(calc(-50% + ${triX}vw), calc(-50% + ${triY}vh)) ` +
          `scale(${triScale}) rotate(${triRot}deg)`;
        triRef.current.style.opacity = String(clamp(triOpacity, 0, 0.15));
      }

      // ── 2. The Toolkit Sequence (Train) ──────────────────────────────────
      // Train starts off-screen left (-60vw) at 0.20. 
      // It moves far right (+500vw) so all 10 symbols get pulled across the screen.
      const trainX = mapRange(p, 0.20, 1.0, -60, 500); 

      // Fades in cleanly overlapping the triangle exit, holds opacity to the footer
      const trainOpacity =
        p < 0.20 ? 0 :
        p < 0.25 ? mapRange(p, 0.20, 0.25, 0, 0.12) : 
        0.12; 

      if (trainRef.current) {
        trainRef.current.style.transform = `translate(calc(-50% + ${trainX}vw), -50%)`;
        trainRef.current.style.opacity = String(clamp(trainOpacity, 0, 0.13));
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
      {/* Exiting Triangle Layer */}
      <div
        ref={triRef}
        className="absolute text-gray-900"
        style={{
          top: '50%',
          left: '50%',
          width: '72vmin',
          height: '72vmin',
          opacity: 0,
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
          width: 0, // Container is just an anchor point
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
              width: '85vmin',
              height: '85vmin',
              // Space them out progressively to the left (so they pull in one by one)
              transform: `translate(calc(-50% - ${index * SYMBOL_SPACING_VW}vw), -50%)`
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
