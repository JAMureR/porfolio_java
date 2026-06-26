// src/App.tsx
import React, { useEffect, useState } from 'react';
import './index.css'; // estilos globales

import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Skills from './components/Skills';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'sobremi', 'proyectos', 'skills', 'contacto'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= -200 && rect.top <= 400;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 selection:text-purple-200 overflow-x-hidden">
      {/* Background Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full pointer-events-none -z-10" style={{ background: 'radial-gradient(ellipse at center, rgba(168,85,247,0.12) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="fixed bottom-[-10%] right-[-10%] w-[45%] h-[45%] rounded-full pointer-events-none -z-10" style={{ background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.10) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="fixed top-[40%] right-[20%] w-[25%] h-[25%] rounded-full pointer-events-none -z-10" style={{ background: 'radial-gradient(ellipse at center, rgba(6,182,212,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      
      <Navbar activeSection={activeSection} />
      
      <main className="container mx-auto px-6 md:px-12">
        <section id="inicio" className="min-h-screen flex items-center pt-20">
          <Hero />
        </section>

        <section id="sobremi" className="py-24">
          <About />
        </section>

        <section id="proyectos" className="py-24">
          <Projects />
        </section>

        <section id="skills" className="py-24">
          <Skills />
        </section>

        <section id="contacto" className="py-24">
          <Contact />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;