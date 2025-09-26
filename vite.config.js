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
  }
});