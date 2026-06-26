
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{ borderTop: '1px solid transparent', backgroundImage: 'linear-gradient(#050505, #050505), linear-gradient(90deg, rgba(168,85,247,0.5), rgba(59,130,246,0.5), rgba(6,182,212,0.3))', backgroundOrigin: 'border-box', backgroundClip: 'padding-box, border-box' }}>
      {/* Top glowing line */}
      <div className="w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.6), rgba(59,130,246,0.6), transparent)' }} />

      <div className="container mx-auto px-6 md:px-12 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

          {/* Left — Branding */}
          <div className="text-center md:text-left space-y-1">
            <p className="text-xl font-extrabold tracking-tighter">
              <span className="text-white">JAVIER</span>
              <span className="gradient-text">MURE</span>
            </p>
            <p className="text-gray-600 text-xs">FullStack Developer · Sevilla, España</p>
            <p className="text-gray-700 text-xs italic">Hecho con ❤ en Sevilla</p>
          </div>

          {/* Center — Info */}
          <div className="flex justify-center gap-6">
            <div className="flex items-center gap-2 text-gray-500 text-xs">
              <i className="fa-solid fa-location-dot text-purple-500/70" />
              <span>Sevilla, España</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-xs">
              <i className="fa-solid fa-envelope text-blue-500/70" />
              <span>javiermuredev@gmail.com</span>
            </div>
          </div>

          {/* Right — Social + copyright */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex gap-3">
              <a href="https://www.linkedin.com/in/javier-mure-ba8988330/" target="_blank"
                className="footer-social-link" style={{ '--c': '#0A66C2' } as React.CSSProperties}>
                <i className="fa-brands fa-linkedin" />
              </a>
              <a href="https://github.com/JAMureR" target="_blank"
                className="footer-social-link" style={{ '--c': '#e2e8f0' } as React.CSSProperties}>
                <i className="fa-brands fa-github" />
              </a>
            </div>
            <p className="text-gray-600 text-xs">© 2026 Javier Mure Ruiz. Todos los derechos reservados.</p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
