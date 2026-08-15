import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, ExternalLink, MapPin, Download } from 'lucide-react';

const Contact = () => {
  const reduced = useReducedMotion();

  return (
    <section
      id="contact"
      className="section"
      style={{ maxWidth: '720px', textAlign: 'center', paddingBottom: '180px' }}
    >
      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={reduced ? { duration: 0.3 } : { type: 'spring', visualDuration: 0.5, bounce: 0 }}
        viewport={{ once: true, margin: '-80px' }}
      >
        <p className="eyebrow" style={{ textAlign: 'center' }}>Contact</p>
        <h2 className="section-heading" style={{ margin: '0 auto 16px', textAlign: 'center' }}>
          Let&apos;s talk.
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '48px', fontSize: '1.05rem' }}>
          Currently seeking opportunities in signal processing, communications, and embedded systems.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', alignItems: 'center' }}>
          <a href="mailto:talhakayar7@gmail.com" className="link-quiet" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.05rem', color: 'var(--text-primary)' }}>
            <Mail size={18} color="var(--text-tertiary)" /> talhakayar7@gmail.com
          </a>
          <a href="https://www.linkedin.com/in/talha-kayar-720025232/" target="_blank" rel="noreferrer" className="link-quiet" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.05rem', color: 'var(--text-primary)' }}>
            <ExternalLink size={18} color="var(--text-tertiary)" /> LinkedIn Profile
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)', fontSize: '0.98rem', marginTop: '4px' }}>
            <MapPin size={16} /> Ankara, Türkiye
          </div>

          <a
            href="/Talha_Kayar_CV.pdf"
            download
            className="btn btn-fill"
            style={{ marginTop: '28px' }}
          >
            <Download size={17} /> Download Résumé
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
