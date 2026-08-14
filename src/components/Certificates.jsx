import React from 'react';
import { motion } from 'framer-motion';
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
  return (
    <section id="certificates" style={{ padding: '100px 20px', maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '40px', color: 'var(--neon-blue)', textAlign: 'center' }}>
        Certificates &amp; Awards
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {certificates.map((cert, index) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="glass"
            style={{ padding: '20px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}
          >
            <Award color="var(--neon-purple)" size={22} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h3 style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '4px', lineHeight: 1.4 }}>
                {cert.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                {cert.issuer} &middot; {cert.date}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Certificates;
