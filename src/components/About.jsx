import React from 'react';
import { motion } from 'framer-motion';

const courses = [
  { name: 'Telecommunications II (EE436)', grade: 'In Progress' },
  { name: 'Introduction to Computer Networks (EE444)', grade: 'In Progress' },
  { name: 'Telecommunications I (EE435)', grade: 'AA' },
  { name: 'Signals and Systems I (EE301)', grade: 'BA' },
  { name: 'Probability and Random Variables (EE230)', grade: 'BA' },
  { name: 'Vector Space Methods in Signal Processing (EE499)', grade: 'BB' },
];

const About = () => {
  return (
    <section id="about" style={{ padding: '100px 20px', maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="glass"
        style={{ padding: '40px' }}
      >
        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', color: 'var(--neon-blue)' }}>About Me</h2>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-main)', lineHeight: '1.8', marginBottom: '30px' }}>
          I am a senior Electrical and Electronics Engineering student at <strong>Middle East Technical University (METU)</strong>, specializing in Wireless Communications and Signal Processing. I combine elite quantitative aptitude with hands-on experience in SDR-based modulation classification and GNSS-free positioning. Skilled in bridging the gap between theoretical models and real-time hardware using Python, MATLAB, and C.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div className="glass" style={{ padding: '20px', border: '1px solid var(--neon-purple)', background: 'rgba(157, 78, 221, 0.05)' }}>
            <h3 style={{ color: 'var(--neon-purple)', marginBottom: '10px' }}>Education</h3>
            <p><strong>B.S. Electrical and Electronics Engineering</strong><br/>METU, Ankara (Expected July 2026)</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '5px' }}>CGPA: 2.95/4.00 (Top 23%)</p>
          </div>
          
          <div className="glass" style={{ padding: '20px', border: '1px solid var(--neon-blue)', background: 'rgba(0, 210, 255, 0.05)' }}>
            <h3 style={{ color: 'var(--neon-blue)', marginBottom: '10px' }}>Standardized Tests</h3>
            <p><strong>GRE Quantitative:</strong> 170/170 (Top 0.1%)</p>
            <p><strong>YKS:</strong> Ranked 1908th / 2.5M (Top 0.1%)</p>
            <p><strong>ALES:</strong> Ranked 1004th (Top 0.7%)</p>
            <p><strong>IELTS:</strong> 8.0</p>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h3 style={{ color: 'var(--neon-blue)', marginBottom: '15px', fontSize: '1.2rem' }}>Key Courses</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
            {courses.map((course) => (
              <div
                key={course.name}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 16px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--glass-border)',
                }}
              >
                <span style={{ color: 'var(--text-main)', fontSize: '0.92rem' }}>{course.name}</span>
                <span style={{ color: 'var(--neon-purple)', fontSize: '0.85rem', fontWeight: 600, marginLeft: '10px', whiteSpace: 'nowrap' }}>
                  {course.grade}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
