// src/types/index.ts
// Interfaces centralizadas del portfolio

/** Fichero de código fuente de un proyecto, para el visor IDE */
export interface CodeFile {
  name: string;
  icon: string;
  color: string;
  description: string;
  code: string;
}

/** Proyecto del portfolio */
export interface Project {
  title: string;
  slug: string;
  image: string;
  technologies: string[];
  links: { github?: string; web?: string };
  description: string;
  architecture: string;
  type: 'java' | 'other';
  status: 'completed' | 'in-progress';
  features: string[];
  codeFiles: CodeFile[];
}

/** Tecnología con icono y color */
export interface TechIconInfo {
  icon: string;
  color: string;
}

/** Skill individual */
export interface Skill {
  name: string;
  icon: string;
  color?: string;
}

/** Categoría de skills */
export interface SkillCategory {
  title: string;
  emoji: string;
  skills: Skill[];
}

/** Skill secundario (texto) */
export interface SecondarySkill {
  name: string;
  color: string;
}

/** Enlace social */
export interface SocialLink {
  href: string;
  icon: string;
  label: string;
  color: string;
  glowColor: string;
}

/** Info card para la sección About */
export interface InfoItem {
  icon: string;
  label: string;
  value: string;
  color: string;
}
