import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const experiences = [
  {
    company: 'Roketsan',
    role: 'R&D Intern (GNSS & Positioning Systems)',
    date: 'Jul 2025 – Aug 2025',
    desc: [
      'Developed a satellite selection algorithm using Python and RTKLIB to optimize positioning accuracy in NLOS scenarios.',
      'Mitigated positioning errors caused by atmospheric delays and vehicle dynamics (yaw/pitch/roll).',
      'Analyzed GNSS signal integrity and implemented data fusion techniques for robust navigation.',
      'Built scalable preprocessing pipelines to handle large-scale satellite data logs.',
    ],
  },
  {
    company: 'INFINIA',
    role: 'Embedded Software Developer (Intern)',
    date: 'Jun 2024 – Jul 2024',
    desc: [
      'Developed IoT communication solutions using ESP32-S3 and MQTT protocol.',
      'Implemented real-time two-way data transmission over Wi-Fi networks using embedded C.',
    ],
  },
  {
    company: 'DataLobster',
    role: 'Signal Processing Undergraduate Researcher (Part Time)',
    date: 'Mar 2022 – Apr 2025',
    desc: [
      'Designed algorithms to identify anomalies in industrial sensor data streams.',
      'Applied statistical signal processing methods (filtering, spectral analysis) for data analysis.',
      'Developed autoencoder models and data pipelines for predictive maintenance solutions.',
    ],
  },
];

const Experience = () => {
  const reduced = useReducedMotion();

  return (
    <section id="experience" className="section">
      <p className="eyebrow">Experience</p>
      <h2 className="section-heading" style={{ marginBottom: '56px' }}>Where I&apos;ve worked</h2>

      <div className="hairline-list">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, y: reduced ? 0 : 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={reduced ? { duration: 0.3 } : { type: 'spring', visualDuration: 0.5, bounce: 0, delay: index * 0.06 }}
            viewport={{ once: true, margin: '-80px' }}
            className="exp-row"
            style={{
              display: 'grid',
              gap: '24px',
              padding: '36px 0',
              borderBottom: '1px solid var(--hairline-soft)',
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                {exp.company}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '4px' }}>{exp.role}</p>
              <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', marginTop: '10px' }}>{exp.date}</p>
            </div>
            <ul style={{ paddingLeft: '18px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              {exp.desc.map((item, i) => (
                <li key={i} style={{ marginBottom: '8px' }}>{item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
