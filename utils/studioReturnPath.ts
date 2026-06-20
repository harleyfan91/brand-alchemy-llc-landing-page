/** Session key for returning from /studio to the main hub where the user left off. */

const RETURN_KEY = 'ba-studio-return';

export type StudioReturnTarget = {
  pathname: string;
  hash: string;
  scrollY: number;
};

export function saveStudioReturnTarget(target: StudioReturnTarget): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(RETURN_KEY, JSON.stringify(target));
}

export function readStudioReturnTarget(): StudioReturnTarget {
  if (typeof window === 'undefined') {
    return { pathname: '/', hash: '', scrollY: 0 };
  }

  try {
    const raw = sessionStorage.getItem(RETURN_KEY);
    if (!raw) return { pathname: '/', hash: '', scrollY: 0 };
    const parsed = JSON.parse(raw) as Partial<StudioReturnTarget>;
    return {
      pathname: typeof parsed.pathname === 'string' ? parsed.pathname : '/',
      hash: typeof parsed.hash === 'string' ? parsed.hash : '',
      scrollY: typeof parsed.scrollY === 'number' ? parsed.scrollY : 0,
    };
  } catch {
    return { pathname: '/', hash: '', scrollY: 0 };
  }
}

/** Mark that the next hub navigation should restore scroll after route paint. */
export function queueStudioReturnScroll(scrollY: number): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem('ba-studio-restore-scroll', String(scrollY));
}

export function consumeQueuedStudioReturnScroll(): number | null {
  if (typeof window === 'undefined') return null;
  const raw = sessionStorage.getItem('ba-studio-restore-scroll');
  sessionStorage.removeItem('ba-studio-restore-scroll');
  if (!raw) return null;
  const y = Number(raw);
  return Number.isFinite(y) ? y : null;
}

export function buildReturnHref(target: StudioReturnTarget): string {
  return `${target.pathname}${target.hash}`;
}
