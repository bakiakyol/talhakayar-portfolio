import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

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
          <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', marginTop: '8px' }}>CGPA 2.95/4.00 &middot; Top 23%</p>
        </div>

        <div>
          <p className="eyebrow" style={{ marginBottom: '12px' }}>Standardized Tests</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', color: 'var(--text-secondary)' }}>
            <p><strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>GRE Quantitative</strong> — 170/170, top 0.1%</p>
            <p><strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>YKS</strong> — ranked 1,908th of 2.5M, top 0.1%</p>
            <p><strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>ALES</strong> — ranked 1,004th, top 0.7%</p>
            <p><strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>IELTS</strong> — 8.0</p>
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
