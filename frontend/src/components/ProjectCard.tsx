// src/components/ProjectCard.tsx
// Tarjeta individual de proyecto con efecto flip — extraída de Projects.tsx

import React, { useState, useEffect, useRef } from 'react';
import type { Project, TechIconInfo } from '../types';
import { techIconMap } from '../data/skills';

interface ProjectCardProps {
  project: Project;
  index: number;
  onViewCode: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onViewCode }) => {
  const [flipped, setFlipped] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const num = String(index + 1).padStart(2, '0');
  const hasCode = project.codeFiles.length > 0;

  return (
    <div
      ref={ref}
      className="group perspective h-[480px] sm:h-[500px] cursor-pointer"
      onClick={() => setFlipped(!flipped)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
      }}
    >
      <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${flipped ? 'rotate-y-180' : ''}`}>

        {/* ── Front ── */}
        <div
          className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden flex flex-col transition-all duration-300"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(168,85,247,0.4)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px -10px rgba(168,85,247,0.25)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
        >
          {/* Image */}
          <div className="h-[55%] overflow-hidden relative">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
            {/* Project number */}
            <div
              className="absolute top-4 left-4 text-xs font-black tracking-widest px-2 py-1 rounded-lg"
              style={{ background: 'rgba(5,5,5,0.7)', border: '1px solid rgba(168,85,247,0.35)', color: '#a855f7', backdropFilter: 'blur(6px)' }}
            >
              {num}
            </div>
            {/* Status badge */}
            {project.status === 'in-progress' && (
              <div
                className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg"
                style={{ background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.35)', color: '#fbbf24' }}
              >
                En construcción
              </div>
            )}
          </div>

          {/* Body */}
          <div className="p-6 flex flex-col justify-between flex-grow">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
              <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">{project.description}</p>
            </div>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-2 mt-3">
              {project.technologies.slice(0, 5).map((tech, i) => {
                const info = techIconMap[tech];
                return (
                  <span key={i} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${info?.color ? info.color + '44' : 'rgba(255,255,255,0.12)'}`, color: info?.color || '#9ca3af' }}>
                    {info && !info.icon.startsWith('fa-') && <img src={info.icon} alt={tech} className="w-3.5 h-3.5" />}
                    {tech}
                  </span>
                );
              })}
              {project.technologies.length > 5 && (
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold text-gray-500"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  +{project.technologies.length - 5}
                </span>
              )}
            </div>

            <div className="flex justify-between items-center mt-4">
              <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest flex items-center gap-1.5">
                <span>Click para detalles</span>
                <i className="fa-solid fa-rotate" />
              </span>
              <div className="flex space-x-3">
                {project.links.github && (
                  <a href={project.links.github} target="_blank" onClick={e => e.stopPropagation()}
                    className="project-link-btn text-gray-400 hover:text-white"
                    style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    <i className="fa-brands fa-github text-sm" />
                  </a>
                )}
                {project.links.web && (
                  <a href={project.links.web} target="_blank" onClick={e => e.stopPropagation()}
                    className="project-link-btn text-gray-400 hover:text-blue-400"
                    style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    <i className="fa-solid fa-globe text-sm" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Back ── */}
        <div
          className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl p-6 flex flex-col justify-center items-center text-center space-y-4"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(168,85,247,0.25)', backdropFilter: 'blur(12px)', boxShadow: '0 0 40px -10px rgba(168,85,247,0.2) inset' }}
        >
          <div>
            <p className="text-xs text-purple-400 font-semibold uppercase tracking-widest mb-1">{num}</p>
            <h3 className="text-2xl font-bold gradient-text">{project.title}</h3>
            <p className="text-gray-500 text-xs mt-1">{project.architecture}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5">
            {project.technologies.map((tech, i) => {
              const info = techIconMap[tech];
              return (
                <div key={i} className="tech-icon-card flex flex-col items-center gap-1.5 p-2.5 sm:p-3 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                  style={{ '--tech-color': info?.color || '#a855f7' } as React.CSSProperties}>
                  <div className="skill-glow-orb" />
                  <div className="tech-icon-wrapper w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl">
                    {info && !info.icon.startsWith('fa-')
                      ? <img src={info.icon} alt={tech} className="w-7 h-7 sm:w-8 sm:h-8 relative z-10" />
                      : info && info.icon.startsWith('fa-')
                        ? <i className={`${info.icon} text-lg sm:text-xl relative z-10`} style={{ color: info.color }} />
                        : <span className="text-xl font-bold text-purple-400">{tech[0]}</span>
                    }
                  </div>
                  <span className="text-[10px] sm:text-xs font-semibold text-gray-300">{tech}</span>
                </div>
              );
            })}
          </div>

          {/* View Code button — only if project has code files */}
          {hasCode && (
            <button
              onClick={e => { e.stopPropagation(); onViewCode(project); }}
              className="px-6 py-2 border border-purple-500/40 text-purple-400 rounded-full text-sm font-bold hover:bg-purple-500 hover:text-white transition-all hover:shadow-lg hover:shadow-purple-500/30 flex items-center gap-2"
            >
              <i className="fa-solid fa-code text-xs" />
              Ver código
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
