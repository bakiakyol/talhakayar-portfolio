import React, { useEffect, Suspense, lazy } from 'react';
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useReducedMotion,
  useAnimationFrame,
} from 'framer-motion';

// three.js + fiber + drei are a heavy dependency for one decorative element —
// split them into their own chunk so they load after the page's first paint
// instead of blocking it.
const Satellite3D = lazy(() => import('./Satellite3D'));

// Text sits in a centered column (see .section in index.css: 1040px content +
// 24px padding each side). Below, the satellite's horizontal position and
// opacity are both derived from that column's actual edge instead of a fixed
// "% from right" — so on any viewport it either clears the text with real
// room to spare, or — when the viewport is too narrow for that — quietly
// fades instead of sitting on top of a paragraph. This replaces the old
// per-section "escape right when Experience is in view" trick: that only
// covered one section and the sideways dash read as a glitch. This runs
// continuously, everywhere, and reacts to the satellite's *actual* computed
// position each frame (including the orbit wobble/bank drift below), not a
// guess about where a section happens to sit.
const CONTENT_MAX = 1088; // .section max-width (1040px) + 24px padding × 2
const SAT_W = 260; // satellite-wrap box width
const FADE_RANGE = 140; // px of overlap into the text column over which opacity ramps down
const MIN_OPACITY = 0.28;

// A wireframe satellite that treats scroll like a flight path rather than a
// slider. Several things drive it at once, all spring-damped instead of
// applied directly, so it behaves like it has mass instead of snapping to
// input:
//
//  - Position tracks how far you are through the *whole* document (not any
//    one section), eased through a soft spring so it settles in a beat
//    behind the scroll instead of matching it 1:1 — the drag of something
//    with inertia.
//  - Scroll *velocity* drives a bank angle, the way a craft leans into a
//    course correction: the faster you scroll, the harder it leans, and a
//    second, stiffer spring lets that lean overshoot a little before
//    settling level again once scrolling stops. A little sideways drift is
//    coupled to the same angle, because a banking object visibly slides off
//    its line rather than rotating in place.
//  - A continuous, scroll-independent orbit — a slow ellipse with a smaller,
//    faster wobble layered on top of each axis — runs the whole time, so the
//    satellite is always circling left/right/up/down a little even while
//    the page sits still, rather than only ever moving in a straight line
//    down the right edge.
const Satellite = () => {
  const reduced = useReducedMotion();
  const { scrollYProgress, scrollY } = useScroll();
  const vh = useMotionValue(typeof window !== 'undefined' ? window.innerHeight : 900);
  const vw = useMotionValue(typeof window !== 'undefined' ? window.innerWidth : 1400);

  useEffect(() => {
    const onResize = () => {
      vh.set(window.innerHeight);
      vw.set(window.innerWidth);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [vh, vw]);

  // Travels from just under the navbar to just above the footer over the
  // course of the entire page.
  const rawY = useTransform([scrollYProgress, vh], ([p, h]) => 0.1 * h + p * 0.72 * h);
  const y = useSpring(rawY, { stiffness: 34, damping: 19, mass: 1 });

  const velocity = useVelocity(scrollY);
  const rawTilt = useTransform(velocity, [-2400, 0, 2400], [-15, 0, 15], { clamp: true });
  const tilt = useSpring(rawTilt, { stiffness: 80, damping: 12, mass: 0.5 });
  const drift = useTransform(tilt, (t) => t * 1.8);

  // Continuous orbital motion, independent of scroll — a slow ellipse (the
  // "yörünge") with a faster, smaller secondary sine layered on each axis
  // (the "wobble") so the loop never quite retraces itself. This runs all
  // the time, on top of the scroll-driven downward travel and the
  // velocity-driven bank/drift above, so the satellite reads as something
  // actually circling rather than sliding along one straight track.
  const rawOrbitX = useMotionValue(0);
  const rawOrbitY = useMotionValue(0);
  useAnimationFrame((t) => {
    const s = t / 1000;
    const ampX = Math.max(50, Math.min(130, vw.get() * 0.09));
    const ampY = Math.max(26, Math.min(64, vh.get() * 0.05));
    rawOrbitX.set(Math.cos(s * 0.22) * ampX + Math.sin(s * 0.63 + 1.3) * ampX * 0.3);
    rawOrbitY.set(Math.sin(s * 0.22) * ampY + Math.cos(s * 0.51 + 0.7) * ampY * 0.3);
  });
  // Springs give the orbit weight/lag instead of tracing the sine curve
  // exactly — the same "has mass" feel as the scroll-position spring above.
  const orbitX = useSpring(rawOrbitX, { stiffness: 20, damping: 9, mass: 1.3 });
  const orbitY = useSpring(rawOrbitY, { stiffness: 20, damping: 9, mass: 1.3 });

  // Dynamic right offset: the original design position is 7% of viewport
  // width from the edge, but that's only honored up to however much gutter
  // actually exists beyond the text column. Where the viewport is too narrow
  // for that (common laptop widths, ~1100–1500px), it hugs whatever margin
  // is left instead of the fixed 7%, which — before this — was frequently
  // deep inside the text column.
  const rawRight = useTransform(vw, (w) => {
    const ideal = w * 0.07;
    const gutter = Math.max(0, w / 2 - Math.min(w, CONTENT_MAX) / 2);
    return Math.max(12, Math.min(ideal, gutter + 12));
  });
  const right = useSpring(rawRight, { stiffness: 60, damping: 20 });
  const rightPx = useTransform(right, (r) => `${r}px`);

  // Full motion (skipped for prefers-reduced-motion): the orbit wobble rides
  // on top of drift and the scroll-position spring, so the satellite circles
  // left/right/up/down continuously instead of only sliding vertically along
  // the right edge.
  const orbitedX = useTransform([drift, orbitX], ([d, o]) => d + o);
  const orbitedY = useTransform([y, orbitY], ([base, o]) => base + o);

  // Live overlap check, every frame: where the satellite's actual left edge
  // (right offset + whatever the drift/wobble is doing right now) sits
  // relative to the text column's actual right edge. Positive = overdrawn
  // over text by that many px; opacity ramps down over FADE_RANGE instead of
  // snapping, and recovers the same way once it clears again.
  const rawOverlap = useTransform([vw, right, orbitedX], ([w, r, ox]) => {
    const contentEdge = w / 2 + Math.min(w, CONTENT_MAX) / 2;
    const leftEdge = w - r - SAT_W + ox;
    return contentEdge - leftEdge;
  });
  const rawClearOpacity = useTransform(rawOverlap, (o) =>
    o <= 0 ? 1 : Math.max(MIN_OPACITY, 1 - o / FADE_RANGE)
  );
  const opacity = useSpring(rawClearOpacity, { stiffness: 90, damping: 22 });

  const wrapStyle = {
    position: 'fixed',
    right: rightPx,
    top: 0,
    zIndex: 1,
    pointerEvents: 'none',
  };

  if (reduced) {
    return (
      <motion.div aria-hidden="true" className="satellite-wrap" style={{ ...wrapStyle, top: '20%', x: drift, opacity }}>
        <SatelliteGlyph />
        <style>{`@media (max-width: 720px) { .satellite-wrap { display: none; } }`}</style>
      </motion.div>
    );
  }

  return (
    <motion.div
      aria-hidden="true"
      className="satellite-wrap"
      style={{ ...wrapStyle, y: orbitedY, x: orbitedX, opacity, willChange: 'transform' }}
    >
      {/* Bank angle is fed into the 3D scene as an actual roll of the model
          (see Satellite3D), not a flat CSS rotate on this container — a
          real perspective lean instead of spinning a 2D image. */}
      <div style={{ position: 'relative', width: '260px', height: '210px' }}>
        <div
          style={{
            position: 'absolute',
            inset: '-40px',
            background: 'radial-gradient(closest-side, rgba(245,245,247,0.10), transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <Suspense fallback={<SatelliteGlyph />}>
          <Satellite3D tilt={tilt} />
        </Suspense>
      </div>
      <style>{`@media (max-width: 720px) { .satellite-wrap { display: none; } }`}</style>
    </motion.div>
  );

};

// Monochrome wireframe satellite — body, twin solar arrays, a dish on its
// forward strut, and a mast with a beacon that blinks like a signal light.
// No accent color, in keeping with the rest of the site's system; the only
// "glow" is the same faint white radial the card spotlight already uses.
const SatelliteGlyph = () => (
  <div
    style={{
      position: 'relative',
      width: '220px',
      height: '120px',
    }}
  >
    <div
      style={{
        position: 'absolute',
        inset: '-40px',
        background: 'radial-gradient(closest-side, rgba(245,245,247,0.10), transparent 70%)',
        pointerEvents: 'none',
      }}
    />
    <svg
      width="220"
      height="120"
      viewBox="0 0 220 120"
      fill="none"
      style={{ position: 'relative', display: 'block' }}
    >
      {/* left solar array */}
      <line x1="94" y1="60" x2="76" y2="60" stroke="rgba(245,245,247,0.5)" strokeWidth="1.2" />
      <rect x="20" y="38" width="56" height="44" stroke="rgba(245,245,247,0.55)" strokeWidth="1.2" />
      <g stroke="rgba(245,245,247,0.25)" strokeWidth="0.8">
        <line x1="34" y1="38" x2="34" y2="82" />
        <line x1="48" y1="38" x2="48" y2="82" />
        <line x1="62" y1="38" x2="62" y2="82" />
        <line x1="20" y1="49" x2="76" y2="49" />
        <line x1="20" y1="60" x2="76" y2="60" />
        <line x1="20" y1="71" x2="76" y2="71" />
      </g>

      {/* right solar array */}
      <line x1="126" y1="60" x2="144" y2="60" stroke="rgba(245,245,247,0.5)" strokeWidth="1.2" />
      <rect x="144" y="38" width="56" height="44" stroke="rgba(245,245,247,0.55)" strokeWidth="1.2" />
      <g stroke="rgba(245,245,247,0.25)" strokeWidth="0.8">
        <line x1="158" y1="38" x2="158" y2="82" />
        <line x1="172" y1="38" x2="172" y2="82" />
        <line x1="186" y1="38" x2="186" y2="82" />
        <line x1="144" y1="49" x2="200" y2="49" />
        <line x1="144" y1="60" x2="200" y2="60" />
        <line x1="144" y1="71" x2="200" y2="71" />
      </g>

      {/* body */}
      <rect
        x="94"
        y="46"
        width="32"
        height="28"
        rx="3"
        stroke="rgba(245,245,247,0.7)"
        strokeWidth="1.4"
        fill="rgba(245,245,247,0.035)"
      />
      <line x1="98" y1="56" x2="122" y2="56" stroke="rgba(245,245,247,0.25)" strokeWidth="0.8" />
      <line x1="98" y1="66" x2="122" y2="66" stroke="rgba(245,245,247,0.25)" strokeWidth="0.8" />

      {/* dish, forward of the body */}
      <line x1="110" y1="74" x2="110" y2="86" stroke="rgba(245,245,247,0.5)" strokeWidth="1.2" />
      <ellipse cx="110" cy="98" rx="20" ry="7" stroke="rgba(245,245,247,0.6)" strokeWidth="1.2" />
      <line x1="110" y1="86" x2="90" y2="98" stroke="rgba(245,245,247,0.3)" strokeWidth="0.8" />
      <line x1="110" y1="86" x2="130" y2="98" stroke="rgba(245,245,247,0.3)" strokeWidth="0.8" />
      <line x1="110" y1="86" x2="110" y2="101" stroke="rgba(245,245,247,0.3)" strokeWidth="0.8" />

      {/* mast + beacon */}
      <line x1="110" y1="46" x2="110" y2="24" stroke="rgba(245,245,247,0.5)" strokeWidth="1.2" />
      <circle cx="110" cy="20" r="2.6" fill="rgba(245,245,247,0.9)">
        <animate attributeName="opacity" values="1;0.15;1" dur="2.6s" repeatCount="indefinite" />
      </circle>
    </svg>
  </div>
);

export default Satellite;
