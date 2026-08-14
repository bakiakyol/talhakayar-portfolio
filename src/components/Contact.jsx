import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ExternalLink, MapPin, Download } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" style={{ padding: '100px 20px 150px 20px', maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="glass"
        style={{ padding: '50px', background: 'rgba(20, 20, 30, 0.8)' }}
      >
        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', color: 'var(--neon-blue)' }}>Get In Touch</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '40px', fontSize: '1.2rem' }}>
          Currently seeking new opportunities in Signal Processing, Communications, and Embedded Systems.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
          <a href="mailto:talhakayar7@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)', textDecoration: 'none', fontSize: '1.2rem' }}>
            <Mail color="var(--neon-purple)" /> talhakayar7@gmail.com
          </a>
          <a href="https://www.linkedin.com/in/talha-kayar-720025232/" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)', textDecoration: 'none', fontSize: '1.2rem' }}>
            <ExternalLink color="var(--neon-blue)" /> LinkedIn Profile
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '10px' }}>
            <MapPin size={20} /> Ankara, Türkiye
          </div>

          <a
            href="/Talha_Kayar_CV.pdf"
            download
            className="glass"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginTop: '20px',
              padding: '12px 28px',
              color: 'var(--neon-purple)',
              textDecoration: 'none',
              fontSize: '1.05rem',
              border: '1px solid rgba(157, 78, 221, 0.4)',
            }}
          >
            <Download size={18} /> Download Resume
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
