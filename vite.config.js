import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// El sitio se despliega en la raíz del dominio (nuu-savi.gob.mx).
// Si se sube a un subdirectorio, ajustar `base` (p. ej. "/nuevo/").
// base "/" para cPanel (raíz del dominio). En GitHub Pages se sirve en /nuu-savi/,
// por eso el workflow define VITE_BASE=/nuu-savi/ al compilar.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || "/",
  server: { port: 5180 },
});
