import React, { useEffect, Suspense, lazy } from 'react';
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useReducedMotion,
  animate,
} from 'framer-motion';

// three.js + fiber + drei are a heavy dependency for one decorative element —
// split them into their own chunk so they load after the page's first paint
// instead of blocking it.
const Satellite3D = lazy(() => import('./Satellite3D'));

// A wireframe satellite that treats scroll like a flight path rather than a
// slider. Two things drive it, both spring-damped instead of applied
// directly, so it behaves like it has mass instead of snapping to input:
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
const Satellite = () => {
  const reduced = useReducedMotion();
  const { scrollYProgress, scrollY } = useScroll();
  const vh = useMotionValue(typeof window !== 'undefined' ? window.innerHeight : 900);

  useEffect(() => {
    const onResize = () => vh.set(window.innerHeight);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [vh]);

  // Travels from just under the navbar to just above the footer over the
  // course of the entire page.
  const rawY = useTransform([scrollYProgress, vh], ([p, h]) => 0.1 * h + p * 0.72 * h);
  const y = useSpring(rawY, { stiffness: 34, damping: 19, mass: 1 });

  const velocity = useVelocity(scrollY);
  const rawTilt = useTransform(velocity, [-2400, 0, 2400], [-15, 0, 15], { clamp: true });
  const tilt = useSpring(rawTilt, { stiffness: 80, damping: 12, mass: 0.5 });
  const drift = useTransform(tilt, (t) => t * 1.8);

  // Unlike the card-based sections, Experience lays its text out edge-to-edge
  // with no opaque backing, right where the satellite sits horizontally — so
  // its wireframe reads as visual noise behind the copy. Fade the satellite
  // out while that section is in view instead of giving it a background,
  // which would break the site's flat/no-card look for that one section.
  const opacity = useMotionValue(1);

  useEffect(() => {
    if (reduced) return undefined;
    const target = document.getElementById('experience');
    if (!target) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        animate(opacity, entry.isIntersecting ? 0 : 1, { duration: 0.35, ease: 'easeInOut' });
      },
      // Negative top/bottom margin on the observed target's own rootMargin
      // isn't a thing — rootMargin grows/shrinks the *viewport* used for the
      // test. A positive margin here expands that viewport, so the fade
      // starts a bit before the section's edge actually reaches the screen
      // instead of at the exact moment it does.
      { rootMargin: '15% 0px 15% 0px', threshold: 0 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [reduced, opacity]);

  const wrapStyle = {
    position: 'fixed',
    right: '7%',
    top: 0,
    zIndex: 1,
    pointerEvents: 'none',
  };

  if (reduced) {
    return (
      <div aria-hidden="true" className="satellite-wrap" style={{ ...wrapStyle, top: '20%' }}>
        <SatelliteGlyph />
        <style>{`@media (max-width: 720px) { .satellite-wrap { display: none; } }`}</style>
      </div>
    );
  }

  return (
    <motion.div
      aria-hidden="true"
      className="satellite-wrap"
      style={{ ...wrapStyle, y, x: drift, opacity, willChange: 'transform' }}
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
