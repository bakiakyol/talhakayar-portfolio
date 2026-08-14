import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  "Python", "MATLAB", "Embedded C", "ESP32-S3", "RTKLIB", 
  "Deep Learning", "MQTT", "Sensor Fusion", "Signal Processing", "GNSS"
];

const Skills = () => {
  return (
    <section id="skills" style={{ padding: '80px 20px', maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '30px', color: 'var(--neon-purple)' }}>Skills & Technologies</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px' }}>
        {skills.map((skill, index) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="glass"
            style={{ padding: '10px 25px', fontSize: '1.1rem', color: 'var(--text-main)', border: '1px solid rgba(0,210,255,0.3)' }}
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
