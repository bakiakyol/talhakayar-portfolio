import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const reduced = useReducedMotion();

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const rise = (delay = 0) => ({
    initial: { opacity: 0, y: reduced ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: reduced
      ? { duration: 0.3, delay }
      : { type: 'spring', visualDuration: 0.5, bounce: 0, delay },
  });

  return (
    <section
      id="hero"
      style={{
        height: '100svh',
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 24px',
        textAlign: 'center',
      }}
    >
      <motion.p
        {...rise(0)}
        style={{
          textTransform: 'uppercase',
          letterSpacing: '0.16em',
          fontSize: 'clamp(0.72rem, 1.6vw, 0.85rem)',
          fontWeight: 600,
          color: 'var(--text-secondary)',
          marginBottom: '22px',
        }}
      >
        Electrical &amp; Electronics Engineer
      </motion.p>

      <motion.h1
        {...rise(0.08)}
        style={{
          fontSize: 'clamp(2.75rem, 9vw, 6.5rem)',
          fontWeight: 600,
          letterSpacing: '-0.03em',
          lineHeight: 1.02,
          color: 'var(--text-primary)',
        }}
      >
        Talha Kayar
      </motion.h1>

      <motion.h2
        {...rise(0.16)}
        style={{
          fontSize: 'clamp(1.05rem, 2.4vw, 1.4rem)',
          fontWeight: 400,
          letterSpacing: '-0.005em',
          color: 'var(--text-secondary)',
          maxWidth: '540px',
          marginTop: '20px',
        }}
      >
        Signal processing, wireless communications, and embedded systems.
      </motion.h2>

      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        aria-label="Scroll to About section"
        style={{
          position: 'absolute',
          bottom: '36px',
          left: 0,
          right: 0,
          margin: '0 auto',
          width: 'fit-content',
          background: 'transparent',
          border: 'none',
          color: 'var(--text-tertiary)',
          cursor: 'pointer',
          padding: '8px',
          animation: reduced ? 'none' : 'hero-bounce 1.8s ease-in-out infinite',
        }}
      >
        <ChevronDown size={22} />
      </motion.button>

      <style>{`
        @keyframes hero-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
