import React from 'react';
import './App.css';
import Starfield from './components/Starfield';
import Satellite from './components/Satellite';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certificates from './components/Certificates';
import Contact from './components/Contact';

function App() {
  return (
    <div className="app-container">
      <Starfield />
      <Satellite />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Certificates />
      <Contact />
    </div>
  );
}

export default App;
