// -----------------------------------------------------------------------------
// Cliente de la API REST de WordPress (headless).
//
// El sitio React SOLO LEE contenido publicado. La edición y los usuarios/roles
// viven en el panel de WordPress (wp-admin). No hay login en el frontend.
//
// Configura la URL de tu WordPress en un archivo .env (ver .env.example):
//   VITE_WP_URL=https://cms.nuu-savi.gob.mx
//
// Si VITE_WP_URL no está definida o la API falla, las funciones devuelven null
// y los componentes usan sus datos de ejemplo (fallback). Así el sitio nunca
// se rompe mientras WordPress aún no está conectado.
// -----------------------------------------------------------------------------

const BASE = (import.meta.env.VITE_WP_URL || "").replace(/\/+$/, "");
export const wpEnabled = Boolean(BASE);

// Quita etiquetas HTML y decodifica entidades básicas (para extractos/títulos).
function stripHtml(html = "") {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return (tmp.textContent || tmp.innerText || "").trim();
}

async function wpFetch(path) {
  if (!BASE) return null;
  try {
    const res = await fetch(`${BASE}/wp-json/wp/v2/${path}`, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null; // sin red / CORS / WP caído -> el componente usa su fallback
  }
}

// --- Mappers puros (fáciles de probar) -------------------------------------

const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

// Parsea una fecha como LOCAL (evita el desfase de zona horaria con fechas
// tipo "2025-09-07", que new Date() interpreta como UTC y retrocede un día).
function parseLocalDate(v) {
  if (!v) return null;
  if (typeof v === "string") {
    const m = v.match(/^(\d{4})-?(\d{2})-?(\d{2})(?:[T ](\d{2}):(\d{2}))?/);
    if (m) return new Date(+m[1], +m[2] - 1, +m[3], +(m[4] || 0), +(m[5] || 0));
  }
  const d = new Date(v);
  return isNaN(d) ? null : d;
}

function formatFecha(iso) {
  const d = parseLocalDate(iso);
  if (!d) return "";
  return `Publicado el ${d.getDate()} de ${["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"][d.getMonth()]} de ${d.getFullYear()}`;
}

// Normaliza el valor de un campo "file" de ACF (puede venir como URL o como objeto).
function fileUrl(v) {
  if (!v) return "";
  if (typeof v === "string") return v;
  return v.url || "";
}

// Convierte un post de WP (?_embed) al formato que usa el componente News.
export function mapPost(raw, index = 0) {
  const embedded = raw._embedded || {};
  const media = embedded["wp:featuredmedia"] && embedded["wp:featuredmedia"][0];
  const terms = (embedded["wp:term"] && embedded["wp:term"].flat()) || [];
  const category = terms.find((t) => t && t.taxonomy === "category");
  const acf = raw.acf || {};
  return {
    id: raw.id,
    date: formatFecha(raw.date),
    category: category ? category.name : "Municipio",
    title: stripHtml(raw.title && raw.title.rendered),
    excerpt: stripHtml(raw.excerpt && raw.excerpt.rendered).replace(/\s*\[…\]$/, "…"),
    image: media ? media.source_url : null,
    video: acf.video || null,
    link: raw.link,
    featured: index === 0,
  };
}

// Convierte una "capacitación" (CPT con imagen destacada + campo etiqueta) al formato de Gallery.
export function mapCapacitacion(raw) {
  const embedded = raw._embedded || {};
  const media = embedded["wp:featuredmedia"] && embedded["wp:featuredmedia"][0];
  const acf = raw.acf || {};
  return {
    id: raw.id,
    src: media ? media.source_url : null,
    tag: acf.etiqueta || "",
    cap: stripHtml(raw.title && raw.title.rendered),
  };
}

// Convierte un "contrato" (CPT con campos ACF) al formato de la página Contratos.
export function mapContrato(raw) {
  const acf = raw.acf || {};
  return {
    id: acf.numero || String(raw.id),
    year: parseInt(acf.anio, 10) || null,
    label: stripHtml(raw.title && raw.title.rendered) || "Obra pública municipal",
    contrato: fileUrl(acf.archivo_contrato),
    insumos: fileUrl(acf.archivo_insumos),
  };
}

// Convierte un evento (CPT "evento" con campos ACF) al formato del componente Events.
export function mapEvent(raw, index = 0) {
  const acf = raw.acf || {};
  const d = parseLocalDate(acf.fecha || raw.date);
  const embedded = raw._embedded || {};
  const media = embedded["wp:featuredmedia"] && embedded["wp:featuredmedia"][0];
  return {
    id: raw.id,
    day: d ? String(d.getDate()).padStart(2, "0") : "",
    month: d ? MESES[d.getMonth()].toUpperCase() : "",
    title: stripHtml(raw.title && raw.title.rendered),
    place: acf.lugar || "",
    tag: acf.categoria || "",
    img: media ? media.source_url : null,
  };
}

// --- Fetchers de alto nivel -------------------------------------------------

export async function getActualidades(perPage = 4) {
  const data = await wpFetch(`posts?_embed&per_page=${perPage}&status=publish`);
  if (!Array.isArray(data) || data.length === 0) return null;
  return data.map(mapPost);
}

export async function getEventos(perPage = 8) {
  // Requiere un tipo de contenido "evento" (plugin CPT UI + ACF). Ver guía CMS.
  const data = await wpFetch(`evento?_embed&per_page=${perPage}&status=publish`);
  if (!Array.isArray(data) || data.length === 0) return null;
  return data.map(mapEvent);
}

export async function getCapacitaciones(perPage = 12) {
  // Requiere el tipo "capacitacion" (CPT UI + ACF, campo etiqueta) + imagen destacada.
  const data = await wpFetch(`capacitacion?_embed&per_page=${perPage}&status=publish`);
  if (!Array.isArray(data) || data.length === 0) return null;
  return data.map(mapCapacitacion).filter((c) => c.src);
}

export async function getContratos(perPage = 100) {
  // Requiere el tipo "contrato" (CPT UI + ACF: anio, numero, archivo_contrato, archivo_insumos).
  const data = await wpFetch(`contrato?_embed&per_page=${perPage}&status=publish`);
  if (!Array.isArray(data) || data.length === 0) return null;
  return data.map(mapContrato);
}
