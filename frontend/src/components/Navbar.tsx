
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  activeSection: string;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: 'Inicio',     id: 'inicio' },
    { label: 'Sobre mí',  id: 'sobremi' },
    { label: 'Proyectos', id: 'proyectos' },
    { label: 'Skills',    id: 'skills' },
    { label: 'Contacto',  id: 'contacto' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(5,5,5,0.92)' : 'rgba(5,5,5,0.6)',
          backdropFilter: 'blur(20px)',
          borderBottom: scrolled
            ? '1px solid rgba(168,85,247,0.2)'
            : '1px solid rgba(255,255,255,0.05)',
          boxShadow: scrolled ? '0 4px 30px -8px rgba(168,85,247,0.25)' : 'none',
        }}
      >
        <div className="container mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
          {/* Logo */}
          <a href="#inicio" className="navbar-logo text-xl font-extrabold tracking-tighter select-none">
            <span className="text-white">JAVIER</span>
            <span className="gradient-text">MURE</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={e => { e.preventDefault(); handleNav(item.id); }}
                  className="nav-item relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full"
                  style={{
                    color: isActive ? '#fff' : '#9ca3af',
                    background: isActive ? 'rgba(168,85,247,0.15)' : 'transparent',
                  }}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: '#a855f7', boxShadow: '0 0 6px 2px rgba(168,85,247,0.8)' }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <a
              href="mailto:javiermuredev@gmail.com"
              className="btn-primary text-sm px-5 py-2"
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
            >
              Contactar
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden text-gray-400 hover:text-white transition-colors p-2"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-5 h-px bg-current transition-all duration-300"
              style={{ transform: mobileOpen ? 'translateY(5px) rotate(45deg)' : '' }}
            />
            <span
              className="block w-5 h-px bg-current mt-1.5 transition-all duration-300"
              style={{ opacity: mobileOpen ? 0 : 1 }}
            />
            <span
              className="block w-5 h-px bg-current mt-1.5 transition-all duration-300"
              style={{ transform: mobileOpen ? 'translateY(-5px) rotate(-45deg)' : '' }}
            />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{ maxHeight: mobileOpen ? '300px' : '0', opacity: mobileOpen ? 1 : 0 }}
        >
          <div className="px-6 pb-6 pt-2 flex flex-col space-y-1 border-t border-white/5">
            {navItems.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={e => { e.preventDefault(); handleNav(item.id); }}
                className="px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  color: activeSection === item.id ? '#a855f7' : '#9ca3af',
                  background: activeSection === item.id ? 'rgba(168,85,247,0.08)' : 'transparent',
                }}
              >
                {item.label}
              </a>
            ))}
            <a
              href="mailto:javiermuredev@gmail.com"
              className="btn-primary text-sm mt-2 justify-center"
              style={{ padding: '0.6rem 1.5rem' }}
            >
              Contactar
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
