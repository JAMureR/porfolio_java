// src/components/CodeSandbox.tsx
// Visor IDE interactivo para explorar el código de CADA proyecto
// Muestra código real extraído de los proyectos (Regla 2, 6)

import React, { useState } from 'react';
import type { Project, CodeFile } from '../types';
import { highlightJava } from '../utils/syntaxHighlight';

interface CodeSandboxProps {
  project: Project;
  onClose?: () => void;
}

const CodeSandbox: React.FC<CodeSandboxProps> = ({ project, onClose }) => {
  const [activeFileIdx, setActiveFileIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  if (project.codeFiles.length === 0) return null;

  const activeFile = project.codeFiles[activeFileIdx];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-fadeInUp">


      {/* IDE Mockup */}
      <div className="w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border border-white/10 bg-[#0d0e12] shadow-2xl shadow-purple-500/5">
        {/* IDE Header */}
        <div className="bg-[#15171e] px-4 py-3 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="text-xs text-gray-500 font-mono flex items-center gap-2">
            <i className="fa-solid fa-folder-open text-purple-400" />
            <span>{project.title} — {activeFile.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCopy(activeFile.code)}
              className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-mono"
            >
              {copied ? (
                <>
                  <i className="fa-solid fa-check text-green-400" />
                  Copiado
                </>
              ) : (
                <>
                  <i className="fa-solid fa-copy" />
                  Copy
                </>
              )}
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-mono"
              >
                <i className="fa-solid fa-xmark" />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 min-h-[480px]">
          {/* IDE Sidebar - File explorer */}
          <div className="col-span-1 bg-[#121318] p-4 border-r border-white/5 flex flex-col gap-2 font-mono">
            <div className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
              <i className="fa-solid fa-sitemap" />
              Explorador
            </div>
            {project.codeFiles.map((file, i) => (
              <button
                key={file.name}
                onClick={() => { setActiveFileIdx(i); setCopied(false); }}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-left text-xs transition-all ${
                  activeFileIdx === i
                    ? 'bg-purple-500/10 border border-purple-500/20 text-purple-200'
                    : 'border border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/[0.02]'
                }`}
              >
                <i className={`${file.icon} text-sm`} style={{ color: file.color }} />
                <span className="truncate">{file.name}</span>
              </button>
            ))}

            <div className="mt-auto pt-6 border-t border-white/5 text-[11px] text-gray-500 leading-relaxed font-sans">
              <i className="fa-solid fa-info-circle text-purple-400 mr-1.5" />
              Código real extraído de {project.title}.
            </div>
          </div>

          {/* IDE Editor Pane */}
          <div className="col-span-1 md:col-span-3 flex flex-col bg-[#0b0c10]">
            {/* File tabs */}
            <div className="flex bg-[#121318] overflow-x-auto border-b border-white/5">
              {project.codeFiles.map((file, i) => (
                <button
                  key={file.name + '-tab'}
                  onClick={() => { setActiveFileIdx(i); setCopied(false); }}
                  className={`flex items-center gap-2 px-5 py-3 text-xs font-mono border-r border-white/5 transition-all flex-shrink-0 ${
                    activeFileIdx === i
                      ? 'bg-[#0b0c10] text-white border-t-2 border-t-purple-500'
                      : 'text-gray-500 bg-[#121318] hover:text-gray-300'
                  }`}
                >
                  <i className={file.icon} style={{ color: file.color }} />
                  {file.name}
                </button>
              ))}
            </div>

            {/* Explanation Banner */}
            <div className="p-4 bg-purple-500/[0.02] border-b border-white/5 flex gap-3 text-xs text-gray-400">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center bg-purple-500/10 text-purple-300 flex-shrink-0">
                <i className="fa-solid fa-circle-question text-[10px]" />
              </div>
              <p className="leading-relaxed">{activeFile.description}</p>
            </div>

            {/* Code Window */}
            <div className="p-6 overflow-auto max-h-[380px] font-mono text-xs text-gray-300 leading-6 relative select-text">
              <pre className="flex">
                {/* Line Numbers */}
                <span className="text-gray-600 text-right pr-6 select-none flex flex-col">
                  {activeFile.code.split('\n').map((_, idx) => (
                    <span key={idx}>{idx + 1}</span>
                  ))}
                </span>
                {/* Syntax Highlighted Code */}
                <code
                  className="flex-1 whitespace-pre"
                  dangerouslySetInnerHTML={{
                    __html: highlightJava(activeFile.code)
                  }}
                />
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeSandbox;
