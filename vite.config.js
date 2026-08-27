import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// El sitio se despliega en la raíz del dominio (nuu-savi.gob.mx).
// Si se sube a un subdirectorio, ajustar `base` (p. ej. "/nuevo/").
export default defineConfig({
  plugins: [react()],
  base: "/",
  server: { port: 5180 },
});
