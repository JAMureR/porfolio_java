
import React from 'react';

const Hero: React.FC = () => {
  const stats = [
    { value: '+6', label: 'Proyectos' },
    { value: '1+', label: 'Años exp.' },
    { value: '100%', label: 'Compromiso' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
      {/* ── Left: Text ── */}
      <div className="space-y-7 order-2 lg:order-1">
        {/* Available badge */}
        <div className="animate-fadeInUp" style={{ animationDelay: '0.05s' }}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
            style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', color: '#4ade80' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400"
              style={{ animation: 'pulse-dot-green 1.8s ease-in-out infinite', boxShadow: '0 0 6px 2px rgba(74,222,128,0.5)' }} />
            Disponible para nuevos proyectos
          </span>
        </div>

        {/* Heading */}
        <div className="animate-fadeInUp delay-100">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tighter">
            Hola, Soy <br />
            <span className="gradient-text">Javier Mure</span>
            <br />
            <span className="text-gray-500 text-4xl md:text-5xl font-bold">Java Backend Developer</span>
          </h1>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-lg max-w-lg leading-relaxed animate-fadeInUp delay-200">
          Especializado en el desarrollo de microservicios y APIs REST con <span className="text-purple-400 font-semibold">Java y Spring Boot</span>.
          Enfocado en la securización de aplicaciones con <span className="text-blue-400 font-semibold">Spring Security y JWT</span>, persistencia con JPA/Hibernate y arquitecturas escalables.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-4 pt-2 animate-fadeInUp delay-300">
          <a href="/img/CV/CV_JavierMure.pdf" download className="btn-primary">
            <i className="fa-solid fa-download" />
            Descargar CV
          </a>
          <a href="#proyectos" className="btn-ghost">
            Ver proyectos
            <i className="fa-solid fa-arrow-right" />
          </a>
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-4 pt-1 animate-fadeInUp delay-400">
          <span className="text-xs text-gray-600 uppercase tracking-widest">Sígueme</span>
          <div className="h-px w-8 bg-white/10" />
          <a href="https://www.linkedin.com/in/javier-mure-ruiz-ba8988330/" target="_blank" className="hero-social-link">
            <i className="fa-brands fa-linkedin" />
          </a>
          <a href="https://github.com/JAMureR" target="_blank" className="hero-social-link">
            <i className="fa-brands fa-github" />
          </a>
        </div>

        {/* Stats */}
        <div className="flex gap-8 pt-2 animate-fadeInUp delay-500">
          {stats.map((s, i) => (
            <div key={i}>
              <p className="text-2xl font-extrabold gradient-text">{s.value}</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right: Photo ── */}
      <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-fadeInUp delay-200">
        <div className="relative w-72 h-72 md:w-[400px] md:h-[400px]">
          {/* Spinning gradient ring */}
          <div className="absolute -inset-2 rounded-3xl animate-spin-slow"
            style={{
              background: 'linear-gradient(135deg, rgba(168,85,247,0.7), rgba(59,130,246,0.7), rgba(6,182,212,0.4), transparent)',
              padding: '2px',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              borderRadius: '24px',
            }}
          />
          {/* Outer glow */}
          <div className="absolute -inset-4 rounded-3xl pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, rgba(168,85,247,0.15) 0%, transparent 70%)' }}
          />
          {/* Outer glow */}
          <div className="absolute inset-0 border border-purple-500/20 rounded-3xl animate-pulse" />

          <img
            src="/img/images/yo1-fondo-blanco.png"
            alt="Javier Mure"
            className="w-full h-full object-cover rounded-3xl grayscale hover:grayscale-0 transition-all duration-700"
            style={{ border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 25px 60px -15px rgba(168,85,247,0.3)' }}
          />

          {/* Floating badge */}
          <div
            className="absolute -bottom-4 -left-4 px-4 py-2 rounded-2xl text-xs font-bold animate-float"
            style={{ background: 'rgba(5,5,5,0.9)', border: '1px solid rgba(168,85,247,0.4)', boxShadow: '0 0 20px -4px rgba(168,85,247,0.4)' }}
          >
            <span className="gradient-text">Java & Security</span> 🔐
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
