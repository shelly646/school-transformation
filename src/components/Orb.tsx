'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/** Act 0 — minimal. One glowing orb, one hint. Click enters the map. */
export default function Orb({ onEnter }: { onEnter(): void }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set('.orb-core', { opacity: 1, scale: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo('.orb-core', { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 1.4, ease: 'expo.out' });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="orb-scene" aria-label="Begin">
      <p className="wordmark">Mamta Modern</p>
      <button type="button" className="orb-core" onClick={onEnter} aria-label="Touch the orb to reveal the map of India">
        <span className="orb-core__glow" aria-hidden="true" />
      </button>
      <p className="orb-hint">Touch to begin</p>
    </section>
  );
}
