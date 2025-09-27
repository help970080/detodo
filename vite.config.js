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
  // SOLUCIÓN FINAL: Hardcodeo seguro de la URL de la API.
  // Esto elimina cualquier dependencia de las variables de entorno de Render.
  define: {
    'process.env.VITE_API_URL': JSON.stringify('https://detodounpocobackend.onrender.com') 
  }
});