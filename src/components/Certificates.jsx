import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Award } from 'lucide-react';

const certificates = [
  { title: 'Fundamentals of Deep Learning', issuer: 'Nvidia', date: 'May 2024' },
  { title: 'Structuring Machine Learning Projects', issuer: 'DeepLearning.AI', date: 'January 2024' },
  { title: 'Neural Networks and Deep Learning', issuer: 'DeepLearning.AI', date: 'October 2023' },
  { title: 'Improving Deep Neural Networks: Hyperparameter Tuning, Regularization', issuer: 'DeepLearning.AI', date: 'October 2023' },
  { title: 'SQL for Data Science', issuer: 'UC Davis', date: 'February 2023' },
  { title: 'Getting Started with Data Analytics on AWS', issuer: 'Amazon Web Services', date: 'October 2022' },
  { title: 'TÜBİTAK Project Competition 2204-A', issuer: '2nd Place in Mathematics', date: '2018' },
];

const Certificates = () => {
  const reduced = useReducedMotion();

  return (
    <section id="certificates" className="section">
      <p className="eyebrow">Certificates &amp; Awards</p>
      <h2 className="section-heading" style={{ marginBottom: '48px' }}>Continued learning</h2>

      <div className="hairline-list">
        {certificates.map((cert, index) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, y: reduced ? 0 : 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={reduced ? { duration: 0.25 } : { type: 'spring', visualDuration: 0.4, bounce: 0, delay: index * 0.03 }}
            viewport={{ once: true, margin: '-40px' }}
            className="hairline-row"
            style={{ alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}
          >
            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', flex: '1 1 320px' }}>
              <Award color="var(--text-tertiary)" size={18} style={{ flexShrink: 0, marginTop: '3px' }} />
              <h3 style={{ fontSize: '0.98rem', color: 'var(--text-primary)', fontWeight: 500, lineHeight: 1.5 }}>
                {cert.title}
              </h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', whiteSpace: 'nowrap', marginLeft: 'auto' }}>
              {cert.issuer} &middot; {cert.date}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Certificates;
