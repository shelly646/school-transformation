'use client';

import { useState } from 'react';

/** Act 3 — school reveal. Minimal text. Photo slot degrades gracefully. */
export default function SchoolReveal({ onNext, onBack }: { onNext(): void; onBack(): void }) {
  const [imgOk, setImgOk] = useState(true);

  return (
    <section className="school-scene" aria-label="Mamta Modern School">
      <div className="school-media">
        {imgOk ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/hero-school.jpg" alt="Mamta Modern School building" width={1200} height={800} onError={() => setImgOk(false)} />
        ) : (
          <div className="school-placeholder" role="img" aria-label="Placeholder for school photograph">
            <span>School photo — placeholder</span>
          </div>
        )}
        <span className="school-badge">Vikas Puri · New Delhi</span>
      </div>
      <div className="school-copy">
        <p className="scene-kicker">Mamta Modern</p>
        <p className="school-line">Fifty years. One timeline.</p>
        <div className="nav-row">
          <button type="button" className="ghost-btn" onClick={onBack} aria-label="Back to map">
            Back
          </button>
          <button type="button" className="orb-btn small" onClick={onNext} aria-label="Open the transformation timeline">
            <span className="orb-btn__orb" aria-hidden="true" />
            Timeline
          </button>
        </div>
      </div>
    </section>
  );
}
