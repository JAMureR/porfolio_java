// vite.config.ts
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // Cargar variables de entorno
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: '/', // Configuración estándar para el dominio principal (javiermuredev.com)
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'), // Para que puedas usar @/components/...
      },
    },
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    build: {
      outDir: 'dist',      // Carpeta de salida
      emptyOutDir: true,   // Limpia dist/ antes de build
      rollupOptions: {
        input: 'index.html', // Asegura que Vite use tu index.html
      },
    },
  };
});