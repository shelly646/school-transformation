'use client';

import { useCallback, useEffect, useState } from 'react';
import Orb from './Orb';
import IndiaMap from './IndiaMap';
import ZoomTransition from './ZoomTransition';
import SchoolReveal from './SchoolReveal';
import TransformTree from './TransformTree';

export type Scene = 'orb' | 'map' | 'zoom' | 'school' | 'tree';

/** Click-driven journey. No scroll. Every scene has forward click + back. */
export default function Experience() {
  const [scene, setScene] = useState<Scene>('orb');
  const [trail, setTrail] = useState<Scene[]>(['orb']);

  const go = useCallback((next: Scene) => {
    setTrail((t) => [...t, next]);
    setScene(next);
  }, []);

  const back = useCallback(() => {
    setTrail((t) => {
      if (t.length <= 1) return t;
      const next = t.slice(0, -1);
      setScene(next[next.length - 1]);
      return next;
    });
  }, []);

  const backTo = useCallback((target: Scene) => {
    setTrail((t) => {
      const i = t.lastIndexOf(target);
      // Rewind to existing entry, or append if never visited (deep-link safe).
      const next = i >= 0 ? t.slice(0, i + 1) : [...t, target];
      setScene(next[next.length - 1]);
      return next;
    });
  }, []);

  const home = useCallback(() => {
    setTrail(['orb']);
    setScene('orb');
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') back();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [back ]);

  return (
    <main className="stage">
      <h1 className="sr">Mamta Modern School — interactive transformation journey</h1>
      {scene === 'orb' && <Orb onEnter={() => go('map')} />}
      {scene === 'map' && <IndiaMap onDelhi={() => go('zoom')} onBack={back} />}
      {scene === 'zoom' && <ZoomTransition onDone={() => go('school')} onSkip={() => go('school')} />}
      {/* School Back skips 'zoom' — zoom auto-forwards, so trail-back would trap. */}
      {scene === 'school' && <SchoolReveal onNext={() => go('tree')} onBack={() => backTo('map')} />}
      {scene === 'tree' && <TransformTree onBack={back} onHome={home} />}
    </main>
  );
}
