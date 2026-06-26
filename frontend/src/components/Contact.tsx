
import React from 'react';

interface SocialLink {
  href: string;
  icon: string;
  label: string;
  color: string;
  glowColor: string;
}

const Contact: React.FC = () => {
  const socials: SocialLink[] = [
    {
      href: "https://www.linkedin.com/in/javier-mure-ruiz-ba8988330/",
      icon: "fa-brands fa-linkedin",
      label: "LinkedIn",
      color: "#0A66C2",
      glowColor: "rgba(10,102,194,0.5)",
    },
    {
      href: "https://github.com/JAMureR",
      icon: "fa-brands fa-github",
      label: "GitHub",
      color: "#e2e8f0",
      glowColor: "rgba(226,232,240,0.3)",
    },
    {
      href: "https://wa.me/34638001027",
      icon: "fa-brands fa-whatsapp",
      label: "WhatsApp",
      color: "#25D366",
      glowColor: "rgba(37,211,102,0.5)",
    },
  ];

  return (
    <div className="w-full">
      <div
        className="p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(10px)' }}
      >
        {/* Decorative orbs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/8 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/8 rounded-full blur-[100px] -ml-40 -mb-40 pointer-events-none" />

        {/* Dot grid decoration */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="rgba(168,85,247,0.08)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <div className="relative z-10">
          {/* Section label */}
          <span className="section-label">¿Hablamos?</span>

          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tighter">
            ¿Tienes un proyecto en{' '}
            <span className="gradient-text">mente?</span>
          </h2>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Estoy disponible para colaboraciones, oportunidades laborales o simplemente charlar sobre tecnología.
            No dudes en contactar.
          </p>

          {/* Main CTA */}
          <div className="flex flex-col items-center gap-10">
            <a href="mailto:javiermuredev@gmail.com" className="btn-primary text-base px-10 py-4">
              <i className="fa-solid fa-paper-plane" />
              Envíame un email
            </a>

            {/* Social cards */}
            <div className="flex flex-wrap justify-center gap-4">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  className="social-contact-card group flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-300"
                  style={{ '--social-color': s.color, '--social-glow': s.glowColor } as React.CSSProperties}
                >
                  <div className="social-icon-wrap w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{ background: `${s.color}18`, border: `1px solid ${s.color}33` }}>
                    <i className={`${s.icon} text-base`} style={{ color: s.color }} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-gray-500 leading-none mb-0.5">Encuéntrame en</p>
                    <p className="text-sm font-bold text-white">{s.label}</p>
                  </div>
                  <i className="fa-solid fa-arrow-up-right-from-square text-xs text-gray-600 group-hover:text-gray-400 transition-colors ml-1" />
                </a>
              ))}
            </div>

            {/* Email display */}
            <p className="text-gray-600 text-sm flex items-center gap-2">
              <i className="fa-solid fa-envelope text-purple-500/60" />
              javiermuredev@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
