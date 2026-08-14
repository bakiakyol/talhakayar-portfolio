import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';

const links = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav
      className={`navbar${scrolled ? ' navbar-scrolled' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 32px',
        transition: 'background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
      }}
    >
      <a
        href="#hero"
        onClick={(e) => { e.preventDefault(); handleNav('hero'); }}
        className="text-gradient"
        style={{ fontSize: '1.3rem', fontWeight: 800, textDecoration: 'none', letterSpacing: '0.5px' }}
      >
        TK
      </a>

      <div className="navbar-links" style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
        {links.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={(e) => { e.preventDefault(); handleNav(link.id); }}
            className="navbar-link"
            style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.95rem', opacity: 0.85 }}
          >
            {link.label}
          </a>
        ))}
        <a
          href="/Talha_Kayar_CV.pdf"
          download
          className="glass navbar-resume"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            color: 'var(--neon-blue)',
            textDecoration: 'none',
            fontSize: '0.9rem',
            border: '1px solid rgba(0,210,255,0.35)',
          }}
        >
          <Download size={16} /> Resume
        </a>
      </div>

      <button
        className="navbar-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle menu"
        style={{
          display: 'none',
          background: 'transparent',
          border: 'none',
          color: 'var(--text-main)',
          cursor: 'pointer',
          padding: '6px',
        }}
      >
        {open ? <X size={26} /> : <Menu size={26} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="glass navbar-mobile-menu"
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
              padding: '24px 0',
            }}
          >
            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => { e.preventDefault(); handleNav(link.id); }}
                style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '1.05rem' }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/Talha_Kayar_CV.pdf"
              download
              style={{ color: 'var(--neon-blue)', textDecoration: 'none', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Download size={18} /> Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
