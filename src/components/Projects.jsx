import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const projects = [
  {
    title: 'SIRIUS: Outdoor Positioning via Sensor Fusion',
    tags: ['Extended Kalman Filters', 'Random Forest', 'Wi-Fi FTM'],
    desc: 'Engineered an outdoor positioning system without GNSS. Reduced error rate from 10% to 2% using sensor fusion (IMU + Wi-Fi FTM) and machine learning.',
  },
  {
    title: 'SDR-Based Modulation Classification',
    tags: ['ADALM-PLUTO SDR', 'MATLAB', 'Python', 'Decision Tree'],
    desc: 'Built a system to identify analog modulations (AM, FM, SSB, DSB) using statistical feature extraction — variance, kurtosis.',
  },
  {
    title: 'Frequency Hopping Spread Spectrum',
    tags: ['MATLAB', 'Spectral Analysis', 'FSK'],
    desc: 'Implemented a receiver/transmitter pair using FHSS in MATLAB, applying pilot-aided detection across channels.',
  },
];

const Projects = () => {
  const reduced = useReducedMotion();

  // Feeds the cursor position into the card's --mx/--my custom properties so
  // the CSS spotlight (see .card::before in index.css) can track it — kept
  // out of React state since it needs to update every pointer move, not
  // trigger a re-render.
  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <section id="projects" className="section">
      <p className="eyebrow">Projects</p>
      <h2 className="section-heading" style={{ marginBottom: '56px' }}>Selected work</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {projects.map((proj, index) => (
          <motion.div
            key={proj.title}
            initial={{ opacity: 0, y: reduced ? 0 : 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={reduced ? { duration: 0.3 } : { type: 'spring', visualDuration: 0.5, bounce: 0, delay: index * 0.08 }}
            viewport={{ once: true, margin: '-60px' }}
            onMouseMove={handleCardMouseMove}
            className="card"
            style={{ padding: '32px', display: 'flex', flexDirection: 'column' }}
          >
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '14px', fontSize: '1.15rem', fontWeight: 600, letterSpacing: '-0.01em' }}>
              {proj.title}
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, flexGrow: 1, marginBottom: '24px', fontSize: '0.95rem' }}>
              {proj.desc}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {proj.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
