'use client';

import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { DELHI, project, ringToPath } from '@/data/india';

/** Act 1 — India draws itself from the orb burst. Delhi pulses. Click Delhi. */
export default function IndiaMap({ onDelhi, onBack }: { onDelhi(): void; onBack(): void }) {
  const rootRef = useRef<HTMLElement>(null);
  const path = useMemo(() => ringToPath(), []);
  const delhi = useMemo(() => project(DELHI.lon, DELHI.lat), []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const line = root.querySelector('.map-line') as SVGPathElement | null;
    if (!line) return;
    if (reduce) {
      gsap.set(['.map-line', '.map-fill', '.delhi'], { opacity: 1 });
      return;
    }
    const len = line.getTotalLength();
    const ctx = gsap.context(() => {
      gsap.set('.map-fill', { opacity: 0 });
      gsap.set('.delhi', { opacity: 0 });
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.fromTo(line, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 2.2 });
      tl.to('.map-fill', { opacity: 1, duration: 0.9 }, '-=0.5');
      tl.to('.delhi', { opacity: 1, duration: 0.6 }, '-=0.3');
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="map-scene" aria-label="Map of India">
      <p className="scene-kicker">India</p>
      <svg className="map-svg" viewBox="-4 -2 108 104" role="img" aria-label="Outline of India with New Delhi marked">
        <path className="map-fill" d={path} />
        <path className="map-line" d={path} />
        {/* Delhi marker IS the button — in-SVG so the hit-area always sits on the real projected position */}
        <g
          className="delhi"
          transform={`translate(${delhi.x.toFixed(2)},${delhi.y.toFixed(2)})`}
          onClick={onDelhi}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onDelhi();
            }
          }}
          tabIndex={0}
          role="button"
          aria-label="Open New Delhi — Mamta Modern School"
        >
          <circle className="delhi-hit-ring" r="9" />
          <circle className="delhi-pulse" r="4.5" />
          <circle className="delhi-dot" r="1.6" />
        </g>
      </svg>
      <p className="scene-hint">Select New Delhi</p>
      <div className="nav-row">
        <button type="button" className="ghost-btn" onClick={onBack} aria-label="Back to orb">
          Back
        </button>
      </div>
    </section>
  );
}
