// Prefija una ruta de asset con el base del sitio.
// Funciona en la raíz (cPanel: base "/") y en subcarpeta (GitHub Pages: "/nuu-savi/").
// Uso: asset("/assets/fotos/x.jpg") -> "/assets/fotos/x.jpg" o "/nuu-savi/assets/fotos/x.jpg"
// Las URLs absolutas (http(s):// , // , data:) se devuelven sin cambios (p. ej. imágenes de WordPress).
export const asset = (p) => {
  const s = String(p || "");
  if (/^(https?:)?\/\//.test(s) || s.startsWith("data:")) return s;
  return import.meta.env.BASE_URL + s.replace(/^\//, "");
};
