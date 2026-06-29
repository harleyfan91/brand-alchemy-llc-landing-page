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

// ─── SVG Symbols (Strictly standardized & mathematically aligned) ─────────────

// Beta (β) - Rebuilt as a strict geometric sans-serif to perfectly match the logo
const BetaSymbol: React.FC = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path 
      d="M 36 92 L 36 28 C 36 16, 58 20, 58 36 C 58 48, 44 50, 36 50 C 72 50, 72 76, 36 76" 
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

// Sulfur — identity-kit paths, −8 on y and 100×100 viewBox so it scales and centers like the other glyphs
const Sulfur: React.FC = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <polygon
      points="50,20 74,56 26,56"
      stroke="currentColor"
      strokeWidth="0.5"
      strokeLinejoin="round"
    />
    <line x1="50" y1="56" x2="50" y2="80" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
    <line x1="26" y1="69" x2="74" y2="69" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
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
    <path d="M 34 20 C 34 40, 66 40, 66 20" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
    <circle cx="50" cy="49" r="14" stroke="currentColor" strokeWidth="0.5" />
    <line x1="50" y1="63" x2="50" y2="83" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
    <line x1="36" y1="73" x2="64" y2="73" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
  </svg>
);

// Air (🜁) - Broadcast / expanding reach 
const Air: React.FC = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <polygon points="50,24 80,76 20,76" stroke="currentColor" strokeWidth="0.5" strokeLinejoin="round" />
    <line x1="28" y1="50" x2="72" y2="50" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
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
    <line x1="28" y1="50" x2="72" y2="50" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" />
  </svg>
);

// ─── Sequence Configuration ───────────────────────────────────────────────────

// Matches identity-kit left strip arm toward center: leftSide[21]…leftSide[12]
// (earth → sulfur → mercury → fire → sun → air → salt → earth → sulfur → mercury) ×N
const oneCycle = [
  Earth,
  Sulfur,
  Mercury,
  FireTriangle,
  AlchemicalSun,
  Air,
  Salt,
  Earth,
  Sulfur,
  Mercury,
] as const;

/** Repeat cycles so the pan can keep marching through the pattern for the full scroll range. */
const TRAIN_CYCLE_COUNT = 4;
const sequence = Array.from({ length: TRAIN_CYCLE_COUNT }, () => [...oneCycle]).flat();

const SYMBOL_SPACING = 'clamp(36vw, 56vmin, 72vw)';
const PAN_START_VW = 25;

const TRI_PHASE_END = 0.3;
const TRAIN_FADE_START = 0.25;

/** Icon slots advanced per viewport-height scrolled after rotation lock (not page-bottom endpoint). */
const PAN_SLOTS_PER_VH = { mobile: 2.4, desktop: 3.2 } as const;

/** Mirrors SYMBOL_SPACING `clamp(36vw, 56vmin, 72vw)` for pan-rate math. */
const estimateSymbolSlotVw = (): number => {
  const vw = Math.max(window.innerWidth, 1);
  const vmin = Math.min(window.innerWidth, window.innerHeight);
  return clamp((56 * vmin) / vw, 36, 72);
};

// Master target opacity
const MAX_OPACITY = 0.06;

/** Scroll Y where triangle rotation completes — tied to #services on all breakpoints. */
const getRotationLockScrollY = (
  scrollY: number,
  maxScroll: number,
  narrow: boolean
): number => {
  const services = document.getElementById('services');
  const vh = window.innerHeight;
  let anchorScrollY = maxScroll * TRI_PHASE_END;
  if (services) {
    const topDoc = services.getBoundingClientRect().top + scrollY;
    const vhFactor = narrow ? 0.14 : 0.18;
    anchorScrollY = Math.max(160, topDoc - vh * vhFactor);
    anchorScrollY = Math.min(anchorScrollY, maxScroll * 0.98);
  }
  return anchorScrollY;
};

/**
 * Constant-rate pan after rotation lock — measured in symbol slots per viewport-height.
 * No endpoint at page bottom; rate scales with actual glyph spacing on each device.
 */
const getTrainPan = (
  scrollY: number,
  rotationLockScrollY: number,
  narrow: boolean
): number => {
  if (scrollY <= rotationLockScrollY) return PAN_START_VW;

  const vhScrolled = (scrollY - rotationLockScrollY) / Math.max(window.innerHeight, 1);
  const slotsPerVh = narrow ? PAN_SLOTS_PER_VH.mobile : PAN_SLOTS_PER_VH.desktop;
  const vwPerVh = estimateSymbolSlotVw() * slotsPerVh;
  return PAN_START_VW + vhScrolled * vwPerVh;
};

// ─── Background Layer Component ───────────────────────────────────────────────

const AlchemyBackground: React.FC = () => {
  const betaRef = useRef<HTMLDivElement>(null);
  const triRef = useRef<HTMLDivElement>(null);
  const trainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tick = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const pRaw = scrollY / maxScroll;
      const narrow = window.matchMedia('(max-width: 767px)').matches;

      const rotationLockScrollY = getRotationLockScrollY(scrollY, maxScroll, narrow);
      const pAnim =
        scrollY <= rotationLockScrollY
          ? (scrollY / Math.max(rotationLockScrollY, 1)) * TRI_PHASE_END
          : TRI_PHASE_END;

      // Pan after rotation locks — rotation timing unchanged; pan rate is breakpoint-specific.
      const baseX = getTrainPan(scrollY, rotationLockScrollY, narrow);

      const triRot =
        pAnim < TRI_PHASE_END ? mapRange(pAnim, 0, TRI_PHASE_END, 0, 90) : 90;

      const betaOpacity =
        pAnim < 0.05
          ? MAX_OPACITY
          : mapRange(pAnim, 0.05, 0.22, MAX_OPACITY, 0);

      const triOpacity = pRaw < 0.85 ? MAX_OPACITY : mapRange(pRaw, 0.85, 0.95, MAX_OPACITY, 0);

      const trainOpacity =
        pAnim < TRAIN_FADE_START
          ? 0
          : pAnim < TRI_PHASE_END
            ? mapRange(pAnim, TRAIN_FADE_START, TRI_PHASE_END, 0, MAX_OPACITY)
            : MAX_OPACITY;

      if (betaRef.current) {
        betaRef.current.style.transform = `translate(calc(-50% - 25vw), -50%)`;
        betaRef.current.style.opacity = String(clamp(betaOpacity, 0, MAX_OPACITY));
      }

      if (triRef.current) {
        triRef.current.style.transform =
          `translate(calc(-50% + ${baseX}vw), -50%) rotate(${triRot}deg)`;
        triRef.current.style.opacity = String(clamp(triOpacity, 0, MAX_OPACITY));
      }

      if (trainRef.current) {
        trainRef.current.style.transform = `translate(calc(-50% + ${baseX}vw), -50%)`;
        trainRef.current.style.opacity = String(clamp(trainOpacity, 0, MAX_OPACITY));
      }
    };

    tick();
    window.addEventListener('scroll', tick, { passive: true });
    window.addEventListener('resize', tick, { passive: true });
    return () => {
      window.removeEventListener('scroll', tick);
      window.removeEventListener('resize', tick);
    };
  }, []);

  return (
    <div
      className="ba-alchemy-bg fixed inset-0 pointer-events-none overflow-hidden"
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
          opacity: MAX_OPACITY,
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
          opacity: MAX_OPACITY,
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
              transform: `translate(calc(-50% - ${index + 1} * ${SYMBOL_SPACING}), -50%)`,
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
