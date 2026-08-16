import React, { useEffect, useRef } from 'react';

// A fixed, monochrome starfield sitting behind every section. Density scales
// with viewport area and is capped so large screens stay cheap; stars drift
// slowly downward and twinkle in place — no color, no shapes, just the same
// "faint white glow" language the card spotlight already uses elsewhere.
// prefers-reduced-motion gets a static field instead of no field at all.
const STAR_DENSITY = 1 / 9000; // stars per square px of viewport
const MAX_STARS = 220;

const Starfield = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let stars = [];
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let frameId;
    let lastTime = 0;

    const makeStars = () => {
      const count = Math.min(MAX_STARS, Math.round(width * height * STAR_DENSITY));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.1 + 0.3,
        baseAlpha: Math.random() * 0.5 + 0.25,
        twinkleSpeed: Math.random() * 0.6 + 0.2,
        phase: Math.random() * Math.PI * 2,
        drift: Math.random() * 3 + 1.5, // px per second, downward
      }));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeStars();
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, width, height);
      stars.forEach((s) => {
        const alpha = reduced
          ? s.baseAlpha
          : s.baseAlpha * (0.55 + 0.45 * Math.sin(t * 0.001 * s.twinkleSpeed + s.phase));
        ctx.beginPath();
        ctx.fillStyle = `rgba(245, 245, 247, ${alpha.toFixed(3)})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const tick = (t) => {
      const dt = lastTime ? (t - lastTime) / 1000 : 0;
      lastTime = t;
      stars.forEach((s) => {
        s.y += s.drift * dt;
        if (s.y > height + 2) {
          s.y = -2;
          s.x = Math.random() * width;
        }
      });
      draw(t);
      frameId = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener('resize', resize);

    if (reduced) {
      draw(0);
    } else {
      frameId = requestAnimationFrame(tick);
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default Starfield;
