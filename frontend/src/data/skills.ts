// src/data/skills.ts
// Catálogo centralizado de skills y tecnologías (Regla 5)

import type { Skill, SkillCategory, SecondarySkill, TechIconInfo } from '../types';

/** Mapa de iconos de tecnologías — reutilizado en tarjetas y skills */
export const techIconMap: Record<string, TechIconInfo> = {
  "React":        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",            color: "#61DAFB" },
  "Java":         { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",              color: "#f89820" },
  "Spring Boot":  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",          color: "#6DB33F" },
  "SQL":          { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",             color: "#4479A1" },
  "MySQL":        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",             color: "#4479A1" },
  "WordPress":    { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-original.svg",     color: "#21759B" },
  "PHP":          { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",                 color: "#8892BF" },
  "CSS3":         { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",               color: "#264de4" },
  "Angular":      { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg",         color: "#DD0031" },
  "Laravel":      { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",         color: "#FF2D20" },
  "TailwindCSS":  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", color: "#06B6D4" },
  "JavaScript":   { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",   color: "#F7DF1E" },
  "HTML5":        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",             color: "#E34F26" },
  "TypeScript":   { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",   color: "#3178C6" },
  "Spring Security": { icon: "fa-solid fa-shield-halved",                                                                  color: "#6DB33F" },
  "JWT":          { icon: "fa-solid fa-user-lock",                                                                          color: "#F50057" },
  "H2":           { icon: "fa-solid fa-database",                                                                           color: "#1a73e8" },
  "Swagger":      { icon: "fa-solid fa-book-open",                                                                          color: "#85EA2D" },
  "Docker":       { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",           color: "#2496ED" },
  "Maven":        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/maven/maven-original.svg",             color: "#C71A36" },
  "Vite":         { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",           color: "#646CFF" },
};

/** Categorías principales de skills */
export const skillCategories: SkillCategory[] = [
  {
    title: "Backend & Seguridad (Core)",
    emoji: "🔐",
    skills: [
      { name: "Java",             icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",              color: "#f89820" },
      { name: "Spring Boot",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",            color: "#6DB33F" },
      { name: "Spring Security",  icon: "fa-solid fa-shield-halved",                                                                      color: "#6DB33F" },
      { name: "JWT (Tokens)",     icon: "fa-solid fa-user-lock",                                                                           color: "#F50057" },
      { name: "JPA / Hibernate",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/hibernate/hibernate-original.svg",      color: "#b7b7b7" },
      { name: "Maven",            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/maven/maven-original.svg",              color: "#C71A36" },
    ]
  },
  {
    title: "Bases de Datos & Testing",
    emoji: "🗄",
    skills: [
      { name: "MySQL",            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",              color: "#4479A1" },
      { name: "PostgreSQL",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",    color: "#336791" },
      { name: "JUnit & Testing",  icon: "fa-solid fa-vial-circle-check",                                                                   color: "#C2185B" },
    ]
  },
  {
    title: "Frontend Companion",
    emoji: "💻",
    skills: [
      { name: "React",            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",              color: "#61DAFB" },
      { name: "Angular",          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg",           color: "#DD0031" },
      { name: "TypeScript",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",    color: "#3178C6" },
      { name: "Tailwind",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",  color: "#06B6D4" },
    ]
  },
  {
    title: "Herramientas & DevOps",
    emoji: "🛠",
    skills: [
      { name: "Docker",           icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",            color: "#2496ED" },
      { name: "Git",              icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",                   color: "#F05032" },
      { name: "GitHub",           icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",             color: "#e0e0e0" },
      { name: "Postman",          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",            color: "#FF6C37" },
    ]
  }
];

/** Skills secundarios */
export const secondarySkills: SecondarySkill[] = [
  { name: "PHP",            color: "#8892BF" },
  { name: "Laravel",        color: "#FF2D20" },
  { name: "WordPress",      color: "#21759B" },
  { name: "JavaScript",     color: "#F7DF1E" },
  { name: "HTML5 & CSS3",   color: "#E34F26" },
  { name: "Bootstrap",      color: "#7952B3" },
];
