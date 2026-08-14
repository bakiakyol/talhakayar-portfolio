import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    company: "Roketsan",
    role: "R&D Intern (GNSS & Positioning Systems)",
    date: "July 2025 - August 2025",
    desc: [
      "Developed a satellite selection algorithm using Python and RTKLIB to optimize positioning accuracy in NLOS scenarios.",
      "Mitigated positioning errors caused by atmospheric delays and vehicle dynamics (Yaw/Pitch/Roll).",
      "Analyzed GNSS signal integrity and implemented data fusion techniques for robust navigation.",
      "Built scalable preprocessing pipelines to handle large-scale satellite data logs."
    ]
  },
  {
    company: "INFINIA",
    role: "Embedded Software Developer (Intern)",
    date: "June 2024 - July 2024",
    desc: [
      "Developed IoT communication solutions using ESP32-S3 and MQTT protocol.",
      "Implemented real-time 2-way data transmission over Wi-Fi networks using Embedded C."
    ]
  },
  {
    company: "DataLobster",
    role: "Signal Processing Undergraduate Researcher (Part Time)",
    date: "March 2022 - April 2025",
    desc: [
      "Designed algorithms to identify anomalies in industrial sensor data streams.",
      "Applied statistical signal processing methods (Filtering, Spectral Analysis) for data analysis.",
      "Developed Autoencoder models and data pipelines for predictive maintenance solutions."
    ]
  }
];

const Experience = () => {
  return (
    <section id="experience" style={{ padding: '100px 20px', maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '40px', color: 'var(--neon-purple)', textAlign: 'center' }}>Experience</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="glass"
            style={{ padding: '30px', position: 'relative', borderLeft: '4px solid var(--neon-blue)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: '15px' }}>
              <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{exp.company}</h3>
              <span style={{ color: 'var(--neon-blue)', fontWeight: 500 }}>{exp.date}</span>
            </div>
            <h4 style={{ color: 'var(--text-muted)', marginBottom: '15px', fontWeight: 400 }}>{exp.role}</h4>
            <ul style={{ paddingLeft: '20px', color: 'var(--text-main)', lineHeight: '1.6' }}>
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
