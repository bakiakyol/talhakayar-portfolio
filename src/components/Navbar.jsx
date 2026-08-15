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
      }}
    >
      <a
        href="#hero"
        onClick={(e) => { e.preventDefault(); handleNav('hero'); }}
        style={{
          fontSize: '1.05rem',
          fontWeight: 600,
          letterSpacing: '-0.01em',
          color: 'var(--text-primary)',
          textDecoration: 'none',
        }}
      >
        TK
      </a>

      <div className="navbar-links" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        {links.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={(e) => { e.preventDefault(); handleNav(link.id); }}
            className="navbar-link"
            style={{ textDecoration: 'none', fontSize: '0.9rem' }}
          >
            {link.label}
          </a>
        ))}
        <a
          href="/Talha_Kayar_CV.pdf"
          download
          className="btn btn-outline"
          style={{ padding: '8px 18px', fontSize: '0.85rem' }}
        >
          <Download size={15} /> Resume
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
          color: 'var(--text-primary)',
          cursor: 'pointer',
          padding: '6px',
        }}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="navbar-mobile-menu"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100vh',
              background: 'rgba(0, 0, 0, 0.97)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '28px',
              zIndex: 99,
            }}
          >
            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => { e.preventDefault(); handleNav(link.id); }}
                style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.4rem', fontWeight: 500 }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/Talha_Kayar_CV.pdf"
              download
              className="btn btn-outline"
              style={{ marginTop: '12px' }}
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
