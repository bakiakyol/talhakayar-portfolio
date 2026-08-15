import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const skills = [
  'Python', 'MATLAB', 'Embedded C', 'ESP32-S3', 'RTKLIB',
  'Deep Learning', 'MQTT', 'Sensor Fusion', 'Signal Processing', 'GNSS',
];

const Skills = () => {
  const reduced = useReducedMotion();

  return (
    <section id="skills" className="section section-tight" style={{ maxWidth: '820px', textAlign: 'center' }}>
      <p className="eyebrow">Skills</p>
      <h2 className="section-heading" style={{ margin: '0 auto 40px', textAlign: 'center' }}>Tools &amp; technologies</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}>
        {skills.map((skill, index) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={reduced ? { duration: 0.25 } : { type: 'spring', visualDuration: 0.4, bounce: 0, delay: index * 0.04 }}
            viewport={{ once: true }}
            className="tag"
            style={{ padding: '10px 20px', fontSize: '0.95rem' }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </section>
  );
};

export default Skills;
