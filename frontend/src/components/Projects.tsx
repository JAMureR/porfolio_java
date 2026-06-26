// src/components/Projects.tsx
// Componente orquestador de la sección de proyectos
// Importa datos y sub-componentes — principio de responsabilidad única (Regla 10)

import React, { useState } from 'react';
import type { Project } from '../types';
import { javaProjects, otherProjects, projectsWithCode } from '../data/projects';
import ProjectCard from './ProjectCard';
import CodeSandbox from './CodeSandbox';

const Projects: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'java' | 'other'>('java');
  const [codeProject, setCodeProject] = useState<Project | null>(null);

  const handleViewCode = (project: Project) => {
    setCodeProject(project);
    // Scroll to code sandbox
    setTimeout(() => {
      document.getElementById('code-sandbox')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const currentProjects = activeTab === 'java' ? javaProjects : otherProjects;

  return (
    <div className="w-full">
      {/* Section header */}
      <div className="flex flex-col items-center mb-12 text-center">
        <span className="section-label">Mi trabajo</span>
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Proyectos <span className="gradient-text">destacados</span></h2>
        <div className="glow-bar" />
        <p className="text-gray-500 text-sm mt-6 max-w-md">
          Haz clic en una tarjeta para ver las tecnologías y código de cada proyecto.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-3 mb-12">
        <button
          onClick={() => { setActiveTab('java'); setCodeProject(null); }}
          className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all duration-300 flex items-center gap-2 border ${
            activeTab === 'java'
              ? 'bg-purple-600/10 border-purple-500/50 text-purple-300 shadow-lg shadow-purple-500/10'
              : 'border-white/10 text-gray-400 hover:border-white/20 hover:text-white bg-transparent'
          }`}
        >
          <i className="fa-solid fa-mug-hot text-xs text-orange-400" />
          Java & Spring Boot ({javaProjects.length})
        </button>
        <button
          onClick={() => { setActiveTab('other'); setCodeProject(null); }}
          className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all duration-300 flex items-center gap-2 border ${
            activeTab === 'other'
              ? 'bg-purple-600/10 border-purple-500/50 text-purple-300 shadow-lg shadow-purple-500/10'
              : 'border-white/10 text-gray-400 hover:border-white/20 hover:text-white bg-transparent'
          }`}
        >
          <i className="fa-solid fa-folder text-xs text-gray-400" />
          Otros Proyectos ({otherProjects.length})
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {currentProjects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            onViewCode={handleViewCode}
          />
        ))}
      </div>

      {/* Code Sandbox Section */}
      <div id="code-sandbox">
        {activeTab === 'java' && projectsWithCode.length > 0 && (
          <div className="mt-16">
            <div className="flex flex-col items-center mb-10 text-center">
              <span className="section-label flex items-center gap-1.5 justify-center">
                <i className="fa-solid fa-shield-halved text-purple-400 text-xs" />
                Explora el código
              </span>
              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                Sandbox <span className="gradient-text">Código Real</span>
              </h3>
              <div className="glow-bar" />
              <p className="text-gray-500 text-sm mt-5 max-w-xl">
                Selecciona un proyecto para explorar su código Java real: seguridad, controladores, servicios y configuración.
              </p>
            </div>

            {/* Project selector buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {projectsWithCode.map((p) => {
                const isSelected = (codeProject || projectsWithCode[0]).slug === p.slug;
                return (
                  <button
                    key={p.slug}
                    onClick={() => handleViewCode(p)}
                    className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 flex items-center gap-2 border ${
                      isSelected
                        ? 'border-purple-500/50 text-purple-300 bg-purple-600/10 shadow-lg shadow-purple-500/10'
                        : 'border-white/10 text-gray-400 hover:border-purple-500/50 hover:text-purple-300 hover:bg-purple-600/10 hover:shadow-lg hover:shadow-purple-500/10'
                    }`}
                  >
                    <i className="fa-solid fa-code text-xs text-purple-400" />
                    {p.title}
                    <span className="text-[10px] text-gray-600 ml-1">({p.codeFiles.length} archivos)</span>
                  </button>
                );
              })}
            </div>

            {/* Code sandbox for selected project or default to first */}
            <CodeSandbox 
              project={codeProject || projectsWithCode[0]} 
              onClose={codeProject ? () => setCodeProject(null) : undefined}
            />
          </div>
        )}

        {/* For other tabs, show Code Sandbox only if a project is selected */}
        {activeTab !== 'java' && codeProject && codeProject.codeFiles.length > 0 && (
          <div className="mt-8">
            <CodeSandbox
              project={codeProject}
              onClose={() => setCodeProject(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
