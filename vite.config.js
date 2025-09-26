import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: '.', // Indica que el root es la carpeta actual (frontend)
  build: {
    outDir: "dist"
  },
  server: {
    port: 3000
  },
  // SOLUCIÓN GARANTIZADA: Forzar la inyección de la URL del backend en el código compilado
  define: {
    // Usamos la URL de tu backend y la hacemos una cadena literal en el código
    'process.env.VITE_API_URL': JSON.stringify('https://detodounpocobackend.onrender.com') 
  }
});