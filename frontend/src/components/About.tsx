
import React from 'react';

const About: React.FC = () => {
  const info = [
    { icon: 'fa-solid fa-location-dot',   label: 'Ubicación',      value: 'Sevilla, España',    color: '#a855f7' },
    { icon: 'fa-solid fa-code',            label: 'Rol',             value: 'Java Backend Developer', color: '#3b82f6' },
    { icon: 'fa-solid fa-shield-halved',   label: 'Especialidad',    value: 'Spring Security / JWT', color: '#06b6d4' },
    { icon: 'fa-solid fa-circle-check',    label: 'Disponibilidad',  value: 'Inmediata',           color: '#4ade80' },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Section header */}
      <div className="flex flex-col items-center mb-16 text-center">
        <span className="section-label">Quién soy</span>
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Sobre <span className="gradient-text">mí</span></h2>
        <div className="glow-bar" />
      </div>

      <div className="grid md:grid-cols-12 gap-12 items-center">
        {/* Photo */}
        <div className="md:col-span-4 flex justify-center">
          <div className="relative">
            {/* Spinning gradient border */}
            <div
              className="absolute -inset-1 rounded-full animate-spin-slow"
              style={{
                background: 'conic-gradient(from 0deg, #a855f7, #3b82f6, #06b6d4, transparent, #a855f7)',
                borderRadius: '50%',
              }}
            />
            {/* Glow */}
            <div
              className="absolute -inset-6 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, rgba(168,85,247,0.12) 0%, transparent 70%)' }}
            />
            {/* Photo */}
            <div className="relative rounded-full p-1" style={{ background: '#050505' }}>
              <img
                src="/img/images/yo2.png"
                alt="Javier Mure"
                className="w-48 h-48 md:w-56 md:h-56 object-cover rounded-full"
                style={{ border: '2px solid rgba(255,255,255,0.06)' }}
              />
            </div>

            {/* Floating experience badge */}
            <div
              className="absolute -bottom-2 -right-2 px-3 py-1.5 rounded-xl text-xs font-bold animate-float"
              style={{ background: 'rgba(5,5,5,0.95)', border: '1px solid rgba(59,130,246,0.4)', boxShadow: '0 0 16px -4px rgba(59,130,246,0.5)', animationDelay: '1s' }}
            >
              <span style={{ color: '#60a5fa' }}>Java Backend</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-8 space-y-6">
          {/* Card */}
          <div
            className="p-8 rounded-3xl space-y-5 transition-all duration-300"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(10px)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(168,85,247,0.3)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px -10px rgba(168,85,247,0.2)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            <h3 className="text-2xl font-bold text-white">
              Soy <span className="gradient-text">Javier Mure</span>
            </h3>

            {/* Quote/tagline */}
            <p
              className="text-sm text-purple-300 font-medium italic pl-4"
              style={{ borderLeft: '3px solid rgba(168,85,247,0.6)' }}
            >
              "Diseño la lógica robusta y la seguridad que sostienen los sistemas modernos."
            </p>

            <p className="text-gray-400 leading-relaxed">
              Soy un desarrollador especializado en el backend con Java y Spring Boot. Me apasiona
              diseñar la arquitectura lógica de las aplicaciones, estructurar bases de datos robustas 
              y construir APIs de alto rendimiento con foco primordial en la seguridad de la información.
            </p>
            <p className="text-gray-500 leading-relaxed text-sm">
              Tengo experiencia implementando arquitecturas limpias y desacopladas. Domino la integración de 
              sistemas de autenticación y autorización robustos basados en Spring Security, control de roles 
              y generación/validación de tokens JWT (JSON Web Tokens). Busco escribir código legible, testeable y eficiente.
            </p>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {info.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${item.color}18`, border: `1px solid ${item.color}40` }}
                  >
                    <i className={`${item.icon} text-xs`} style={{ color: item.color }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: item.color, opacity: 0.8 }}>{item.label}</p>
                    <p className="text-sm text-white font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
