import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: "SIRIUS: Outdoor Positioning System via Sensor Fusion",
    tags: ["Extended Kalman Filters", "Random Forest", "Wi-Fi FTM"],
    desc: "Engineered an outdoor positioning system without using GNSS. Decreased error rate from 10% to 2% using Sensor Fusion (IMU + Wi-Fi FTM) and Machine Learning."
  },
  {
    title: "SDR-Based Modulation Classification",
    tags: ["ADALM-PLUTO SDR", "MATLAB", "Python", "Decision Tree"],
    desc: "Developed a system to identify analog modulations (AM, FM, SSB, DSB) using statistical feature extraction (Variance, Kurtosis)."
  },
  {
    title: "Frequency Hopping Spread Spectrum",
    tags: ["MATLAB", "Spectral Analysis", "FSK"],
    desc: "Implemented a receiver/transmitter pair using FHSS in MATLAB. Applied Pilot-Aided Detection to analyze signals across different channels."
  }
];

const Projects = () => {
  return (
    <section id="projects" style={{ padding: '100px 20px', maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '40px', color: 'var(--neon-blue)', textAlign: 'center' }}>Key Academic Projects</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        {projects.map((proj, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -10, boxShadow: '0 10px 30px rgba(0, 210, 255, 0.2)' }}
            className="glass"
            style={{ padding: '30px', display: 'flex', flexDirection: 'column' }}
          >
            <h3 style={{ color: 'var(--text-main)', marginBottom: '15px', fontSize: '1.3rem' }}>{proj.title}</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', flexGrow: 1, marginBottom: '20px' }}>{proj.desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {proj.tags.map(tag => (
                <span key={tag} style={{ 
                  padding: '5px 12px', 
                  borderRadius: '20px', 
                  background: 'rgba(157, 78, 221, 0.2)', 
                  color: 'var(--neon-blue)', 
                  fontSize: '0.85rem' 
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
