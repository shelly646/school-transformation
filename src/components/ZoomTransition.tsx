'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/** Act 2 — cinematic peak: streak dive into Delhi. Click skips. Auto-continues. */
export default function ZoomTransition({ onDone, onSkip }: { onDone(): void; onSkip(): void }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const t = window.setTimeout(onDone, 600);
      return () => window.clearTimeout(t);
    }
    const ctx = gsap.context(() => {
      gsap.fromTo('.zoom-streak', { scaleY: 0.2, opacity: 0 }, { scaleY: 1, opacity: 1, duration: 0.9, ease: 'expo.out' });
      gsap.fromTo('.zoom-word', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.35, ease: 'expo.out' });
    }, rootRef);
    const t = window.setTimeout(onDone, 1900);
    return () => {
      ctx.revert();
      window.clearTimeout(t);
    };
  }, [onDone]);

  return (
    <section ref={rootRef} className="zoom-scene" aria-label="Flying to New Delhi">
      <div className="zoom-streak" aria-hidden="true" />
      <p className="zoom-word">New Delhi</p>
      <button type="button" className="ghost-btn zoom-skip" onClick={onSkip}>
        Skip
      </button>
    </section>
  );
}
