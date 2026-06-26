// src/components/Skills.tsx
// Componente de skills — datos importados desde la capa de datos (Regla 10: separación de responsabilidades)

import React, { useState } from 'react';
import { skillCategories, secondarySkills } from '../data/skills';

const Skills: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col items-center mb-20 text-center">
        <p className="text-purple-400 text-sm font-semibold uppercase tracking-[0.3em] mb-3">Mi arsenal técnico</p>
        <h2 className="text-4xl font-bold mb-4">Skills <span className="gradient-text">&</span> Stack</h2>
        <div className="glow-bar" />
        <p className="text-gray-500 text-sm mt-6 max-w-md">
          Tecnologías que utilizo para construir soluciones robustas, seguras y de alto rendimiento.
        </p>
      </div>

      <div className="space-y-14">
        {skillCategories.map((cat, i) => (
          <div key={i} className="skills-category-block">
            {/* Category header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="skills-cat-badge">
                <span className="text-base">{cat.emoji}</span>
              </div>
              <h3 className="text-lg font-bold text-white">{cat.title}</h3>
              <div className="skills-cat-line flex-1"></div>
              <span className="text-xs text-gray-600 font-mono">{cat.skills.length} techs</span>
            </div>

            {/* Skills grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {cat.skills.map((skill, j) => (
                <div
                  key={j}
                  className="skill-card group"
                  style={{ '--skill-color': skill.color || '#a855f7' } as React.CSSProperties}
                  onMouseEnter={() => setHoveredSkill(`${i}-${j}`)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  {/* Glow orb */}
                  <div className="skill-glow-orb"></div>

                  {/* Icon container */}
                  <div className="skill-icon-wrap">
                    {skill.icon.startsWith('fa-') ? (
                      <i className={`${skill.icon} text-2xl transition-transform duration-300 group-hover:scale-110 relative z-10`} style={{ color: skill.color }} />
                    ) : (
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-10 h-10 transition-transform duration-300 group-hover:scale-110 relative z-10"
                      />
                    )}
                  </div>

                  {/* Name */}
                  <span className="skill-name">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Otras tecnologías */}
      <div className="mt-16 p-8 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-md">
        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 text-center sm:text-left">
          Otras tecnologías con las que he trabajado
        </h4>
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          {secondarySkills.map((s, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-white/10 bg-white/5 text-gray-400 hover:text-white transition-colors"
              style={{ borderColor: s.color + '22' }}
            >
              <span className="w-1.5 h-1.5 rounded-full inline-block mr-2" style={{ backgroundColor: s.color }} />
              {s.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
