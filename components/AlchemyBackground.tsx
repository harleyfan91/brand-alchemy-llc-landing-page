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

// Fire (🜂) - Leader
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
    {/* Horns */}
    <path d="M 26 24 C 26 44, 74 44, 74 24" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
    {/* Head */}
    <circle cx="50" cy="48" r="16" stroke="currentColor" strokeWidth="0.5" />
    {/* Body & Crossbar */}
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

// Increased spacing significantly so symbols have breathing room and don't overlap
const SYMBOL_SPACING_VW = 65; 

// ─── Background Layer Component ───────────────────────────────────────────────

const AlchemyBackground: React.FC = () => {
  const triRef = useRef<HTMLDivElement>(null);
  const trainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tick = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = scrollY / maxScroll; // 0 = top, 1 = bottom

      // Phase 1 (0 -> 0.30): Triangle rotates 90deg in place. Train fades in securely behind it.
      // Phase 2 (0.30 -> 1.0): Rotation stops. The entire group (Triangle + Train) pans right.
      
      // Increased the pan distance (700) so the whole sequence is dragged across
      const baseX  = p < 0.30 ? 25 : mapRange(p, 0.30, 1.0, 25, 700); 
      const triRot = p < 0.30 ? mapRange(p, 0, 0.30, 0, 90) : 90; 

      // Train Opacity (fades in right as the rotation finishes)
      const trainOpacity = 
        p < 0.25 ? 0 : 
        p < 0.30 ? mapRange(p, 0.25, 0.30, 0, 0.14) : 
        0.14;

      // Update Triangle (The Leader)
      if (triRef.current) {
        triRef.current.style.transform = 
          `translate(calc(-50% + ${baseX}vw), -50%) rotate(${triRot}deg)`;
        // Fixed at 0.14 so it is completely visible on page load!
        triRef.current.style.opacity = "0.14";
      }

      // Update Train (The Followers - mathematically locked to the leader)
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
      {/* Triangle Leader Layer */}
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
              // Exact geometric spacing based on index behind the leader
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
