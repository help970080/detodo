// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: '.',
  build: {
    outDir: "dist"
  },
  server: {
    port: 3000
  },
  // SOLUCIÓN FINAL: Definir la variable directamente para producción
  define: {
    'process.env.VITE_API_URL': JSON.stringify('https://detodounpocobackend.onrender.com')
  }
});