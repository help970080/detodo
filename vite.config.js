import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuración de Vite
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      // 👇 Solo funciona en desarrollo local
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
    },
  },
  // ⚡ Render necesita esto para no dar error 404 en rutas de React Router
  resolve: {
    alias: {},
  },
  optimizeDeps: {},
});
