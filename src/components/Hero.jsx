import React, { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Stars, useGLTF } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import * as THREE from 'three';

const NEON_BLUE = '#00d2ff';

// A real satellite model (dish + solar panels + bus body), 1.4MB, CC-BY licensed
// ("Satellite" by Poly by Google, via get3dmodels.com — credited in README).
// Its material is already diffuse (non-metallic), so it isn't dependent on an
// environment map the way the previous stand-in craft was.
useGLTF.preload('/satellite.glb');

const SatelliteModel = () => {
  const { scene } = useGLTF('/satellite.glb');

  const cloned = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone();
        child.material.roughness = 0.6;
      }
    });
    return clone;
  }, [scene]);

  // Source model is ~41 units wide (built at an odd real-world scale) — scaled down
  // to read as a small craft next to the 1.5-radius Earth.
  return <primitive object={cloned} scale={0.011} rotation={[0.1, 0.9, 0]} />;
};

const Satellite = () => {
  const orbitRef = useRef();
  const beaconRef = useRef();
  const orbitRadius = 2.1;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.15;
    if (orbitRef.current) {
      orbitRef.current.position.set(Math.cos(t) * orbitRadius, 0.4, Math.sin(t) * orbitRadius);
    }
    if (beaconRef.current) {
      // Slow blinking beacon, like a satellite's own strobe light — a small hot spot,
      // not a floodlight, so it stays a highlight rather than lighting the whole hull.
      const pulse = Math.max(0, Math.sin(clock.getElapsedTime() * 2.5));
      beaconRef.current.intensity = 0.15 + pulse * 1.1;
    }
  });

  return (
    <group ref={orbitRef}>
      {/* Off to one side and dim — gives the hull a bright side and a shaded side
          instead of flooding every face evenly. */}
      <pointLight position={[0.35, 0.25, 0.3]} color="#ffffff" intensity={0.35} distance={1.2} decay={2} />
      {/* A faint cool rim light from the opposite side, so the shaded side isn't pure black. */}
      <pointLight position={[-0.3, -0.15, -0.25]} color={NEON_BLUE} intensity={0.15} distance={1} decay={2} />
      {/* Blinking beacon — a small localized glint, not a wash of light */}
      <pointLight ref={beaconRef} position={[0.22, 0.05, 0]} color="#ff3b5c" intensity={0.6} distance={0.5} decay={2} />

      <Suspense
        fallback={
          <mesh>
            <icosahedronGeometry args={[0.1, 0]} />
            <meshStandardMaterial color="#eef2f8" emissive={NEON_BLUE} emissiveIntensity={0.6} />
          </mesh>
        }
      >
        <SatelliteModel />
      </Suspense>
    </group>
  );
};

const EarthNode = () => {
  const earthRef = useRef();
  const parallaxRef = useRef();

  useFrame(({ clock }) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
    if (parallaxRef.current) {
      parallaxRef.current.position.y = THREE.MathUtils.lerp(
        parallaxRef.current.position.y,
        window.scrollY * 0.005,
        0.1
      );
    }
  });

  return (
    <group ref={parallaxRef}>
      <group ref={earthRef}>
        {/* Wireframe globe */}
        <Sphere args={[1.5, 64, 64]}>
          <meshStandardMaterial
            color="#002244"
            emissive="#001133"
            wireframe
            transparent
            opacity={0.4}
          />
        </Sphere>
        <Sphere args={[1.45, 32, 32]}>
          <meshBasicMaterial color={NEON_BLUE} transparent opacity={0.15} />
        </Sphere>

        <Satellite />
      </group>
    </group>
  );
};

const Scene = () => (
  <>
    <color attach="background" args={['#0a0a0f']} />
    <ambientLight intensity={0.5} />
    <pointLight position={[10, 10, 10]} intensity={1} color={NEON_BLUE} />

    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

    <EarthNode />

    {/* enableRotate=false so a touch-drag on the hero scrolls the page instead of
        spinning the camera — autoRotate still runs on its own regardless. */}
    <OrbitControls
      enableZoom={false}
      enablePan={false}
      enableRotate={false}
      autoRotate={!prefersReducedMotion()}
      autoRotateSpeed={0.5}
    />
  </>
);

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

const BOOT_LINES = ['ESTABLISHING UPLINK...', 'CALIBRATING SIGNAL...', 'WELCOME'];

// A brief "signal acquisition" boot sequence before the hero content reveals —
// on-theme for a wireless comms / signal processing portfolio, and pure
// CSS/text animation so it carries no 3D performance cost.
const BootOverlay = ({ onDone }) => {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const skip = useRef(prefersReducedMotion());
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (skip.current) {
      setVisible(false);
      return;
    }
    const currentLine = BOOT_LINES[lineIndex];
    if (charIndex < currentLine.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), 28);
      return () => clearTimeout(t);
    }
    if (lineIndex < BOOT_LINES.length - 1) {
      const t = setTimeout(() => {
        setLineIndex((i) => i + 1);
        setCharIndex(0);
      }, 300);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setVisible(false), 500);
    return () => clearTimeout(t);
  }, [charIndex, lineIndex]);

  useEffect(() => {
    if (!visible) {
      const t = setTimeout(() => onDoneRef.current?.(), skip.current ? 0 : 500);
      return () => clearTimeout(t);
    }
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: '#0a0a0f',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 20px',
          }}
        >
          <div style={{ fontFamily: "'Courier New', monospace", fontSize: 'clamp(0.85rem, 3vw, 1.1rem)', letterSpacing: '1px' }}>
            {BOOT_LINES.slice(0, lineIndex).map((line) => (
              <div key={line} style={{ color: 'var(--neon-blue)', opacity: 0.4, marginBottom: '6px' }}>
                {'> '}{line}
              </div>
            ))}
            <div style={{ color: 'var(--neon-blue)' }}>
              {'> '}
              {BOOT_LINES[lineIndex].slice(0, charIndex)}
              <span className="boot-cursor">_</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Hero = () => {
  const [introDone, setIntroDone] = useState(false);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="hero" style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      <BootOverlay onDone={() => setIntroDone(true)} />

      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={1}>
          <Scene />
        </Canvas>
      </div>

      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        pointerEvents: 'none',
        padding: '0 20px',
        textAlign: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h1 style={{ fontSize: 'clamp(2.2rem, 7vw, 4rem)', fontWeight: 800, marginBottom: '10px' }}>
            Hi, I'm <span className="text-gradient">Talha Kayar</span>
          </h1>
          <h2 style={{ fontSize: 'clamp(1.1rem, 3.5vw, 1.5rem)', color: 'var(--text-muted)', fontWeight: 400, maxWidth: '600px', margin: '0 auto' }}>
            Electrical & Electronics Engineer <br/>
            <span style={{ fontSize: 'clamp(0.95rem, 2.8vw, 1.2rem)', opacity: 0.8 }}>Wireless Communications • Signal Processing</span>
          </h2>
        </motion.div>
      </div>

      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={introDone ? { opacity: 1, y: [0, 10, 0] } : { opacity: 0 }}
        transition={{ opacity: { duration: 0.8, delay: 0.3 }, y: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' } }}
        aria-label="Scroll to About section"
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1,
          background: 'transparent',
          border: 'none',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          padding: '8px',
        }}
      >
        <ChevronDown size={28} />
      </motion.button>
    </section>
  );
};

export default Hero;
