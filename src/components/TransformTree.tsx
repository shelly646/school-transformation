'use client';

import { useState } from 'react';
import { milestones } from '@/data/journey';

/** Act 4 — transformation tree. Four independent milestones, each opens its own view. */
export default function TransformTree({ onBack, onHome }: { onBack(): void; onHome(): void }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = milestones.find((m) => m.id === openId) ?? null;

  return (
    <section className="tree-scene" aria-label="Transformation timeline">
      <p className="scene-kicker">Traditional teaching → autonomous agents</p>

      <ol className="tree">
        {milestones.map((m, i) => (
          <li key={m.id} className="tree-node">
            <button
              type="button"
              className="tree-btn"
              data-open={openId === m.id ? 1 : 0}
              onClick={() => setOpenId(openId === m.id ? null : m.id)}
              aria-expanded={openId === m.id}
              aria-label={`Open milestone ${i + 1}: ${m.title}`}
            >
              <span className="tree-dot" aria-hidden="true" />
              <span className="tree-title">{m.title}</span>
            </button>
          </li>
        ))}
      </ol>

      {open && (
        <div className="detail" role="dialog" aria-modal="false" aria-label={open.title}>
          <p className="detail-title">{open.title}</p>
          <p className="detail-line">{open.line}</p>
          <ul className="detail-facts">
            {open.facts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <div className="detail-photo" role="img" aria-label={open.photo.alt}>
            <span>Photo placeholder</span>
          </div>
          <button type="button" className="ghost-btn" onClick={() => setOpenId(null)} aria-label={`Close ${open.title}`}>
            Close
          </button>
        </div>
      )}

      <div className="nav-row">
        <button type="button" className="ghost-btn" onClick={onBack} aria-label="Back to school">
          Back
        </button>
        <button type="button" className="ghost-btn" onClick={onHome} aria-label="Back to start">
          Start
        </button>
      </div>
    </section>
  );
}
