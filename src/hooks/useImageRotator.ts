import { useCallback, useEffect, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

/* Shared slideshow timer for the rotating background sections (W3-HP1 and the closing sections).
   It holds on the first image when the visitor prefers reduced motion, and choosing an image by hand
   restarts the interval rather than leaving a partial tick running. */
export function useImageRotator(count: number, intervalMs: number) {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [restart, setRestart] = useState(0);

  useEffect(() => {
    if (reducedMotion || count < 2) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % count), intervalMs);
    return () => window.clearInterval(timer);
  }, [count, intervalMs, reducedMotion, restart]);

  const select = useCallback((index: number) => {
    setActive(index);
    setRestart((value) => value + 1);
  }, []);

  return { active, select, reducedMotion };
}
