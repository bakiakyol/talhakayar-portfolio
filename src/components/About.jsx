import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const tests = [
  { value: '170/170', label: 'GRE Quantitative · Top 0.1%' },
  { value: 'Top 0.1%', label: 'YKS · 1,908 / 2.5M' },
  { value: 'Top 0.7%', label: 'ALES · Rank 1,004' },
  { value: '8.0', label: 'IELTS' },
];

const courses = [
  { name: 'Telecommunications II (EE436)', grade: 'In Progress' },
  { name: 'Introduction to Computer Networks (EE444)', grade: 'In Progress' },
  { name: 'Telecommunications I (EE435)', grade: 'AA' },
  { name: 'Signals and Systems I (EE301)', grade: 'BA' },
  { name: 'Probability and Random Variables (EE230)', grade: 'BA' },
  { name: 'Vector Space Methods in Signal Processing (EE499)', grade: 'BB' },
];

const About = () => {
  const reduced = useReducedMotion();
  const rise = {
    initial: { opacity: 0, y: reduced ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: reduced ? { duration: 0.3 } : { type: 'spring', visualDuration: 0.5, bounce: 0 },
  };

  return (
    <section id="about" className="section">
      <motion.div {...rise}>
        <p className="eyebrow">About</p>
        <h2 className="section-heading" style={{ marginBottom: '28px' }}>
          Senior Electrical &amp; Electronics Engineering student focused on wireless communications and signal processing.
        </h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '720px' }}>
          Studying at <strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Middle East Technical University (METU)</strong>,
          with hands-on experience in SDR-based modulation classification and GNSS-free positioning. Comfortable bridging
          theoretical models and real-time hardware in Python, MATLAB, and C.
        </p>
      </motion.div>

      <motion.div
        {...rise}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '48px',
          marginTop: '64px',
          paddingTop: '40px',
          borderTop: '1px solid var(--hairline-soft)',
        }}
      >
        <div>
          <p className="eyebrow" style={{ marginBottom: '12px' }}>Education</p>
          <p style={{ fontSize: '1.02rem', color: 'var(--text-primary)' }}>
            B.S. Electrical and Electronics Engineering
          </p>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>METU, Ankara &middot; Expected July 2026</p>

          <div style={{ marginTop: '28px' }}>
            <span className="stat-value">2.95</span>
            <span style={{ fontSize: '1.1rem', color: 'var(--text-tertiary)', marginLeft: '4px' }}>/4.00</span>
            <p className="stat-label" style={{ marginTop: '6px' }}>CGPA &middot; Top 23%</p>
          </div>
        </div>

        <div>
          <p className="eyebrow" style={{ marginBottom: '12px' }}>Standardized Tests</p>
          <div className="stat-grid">
            {tests.map((t) => (
              <div key={t.label}>
                <span className="stat-value">{t.value}</span>
                <p className="stat-label">{t.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div {...rise} style={{ marginTop: '64px' }}>
        <p className="eyebrow" style={{ marginBottom: '4px' }}>Key Courses</p>
        <div className="hairline-list">
          {courses.map((course) => (
            <div key={course.name} className="hairline-row">
              <span style={{ color: 'var(--text-primary)', fontSize: '0.98rem' }}>{course.name}</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
                {course.grade}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default About;
