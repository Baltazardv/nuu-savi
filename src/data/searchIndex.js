// Índice de búsqueda del sitio (cliente). Se arma con el contenido real.
// Cada entrada: { title, section, to }  ->  `to` puede ser "/ruta" o "/#seccion".
import { officials } from "./officials.js";
import { events } from "./events.js";
import { news } from "./news.js";

// Normaliza para comparar sin acentos ni mayúsculas.
const norm = (s) =>
  (s || "").toString().normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

// Secciones y páginas fijas.
const staticEntries = [
  {
    title: "Pueblo de la lluvia — Sobre el municipio",
    section: "Inicio",
    to: "/#sobre",
    text: "pueblo de la lluvia mixteco 85 municipios guerrero constituido 31 agosto 2021 37 localidades ayutla de los libres coapinola cabecera tu'un savi lengua originaria ano de constitucion sobre el municipio identidad",
  },
  {
    title: "Conoce a nuestro cabildo",
    section: "Inicio",
    to: "/#cabildo",
    text: "cabildo gobierno municipal ayuntamiento 2024 2027 usos y costumbres sistema normativo propio integrantes servidores publicos",
  },
  {
    title: "Explora el territorio",
    section: "Inicio",
    to: "/#territorio",
    text: "territorio mapa interactivo comunidades equipamientos servicios escuelas centros de salud localidades ubicacion",
  },
  {
    title: "Próximos eventos",
    section: "Inicio",
    to: "/#eventos",
    text: "eventos agenda cultura salidas actividades calendario",
  },
  {
    title: "Capacitación a servidores públicos",
    section: "Inicio",
    to: "/#capacitaciones",
    text: "capacitacion capacitaciones servidores publicos formacion galeria fotos manual de organizacion codigo de conducta gobierno cercano",
  },
  {
    title: "Actualidades",
    section: "Inicio",
    to: "/#actualidades",
    text: "actualidades noticias avisos comunicados",
  },
  {
    title: "Síguenos en Facebook",
    section: "Inicio",
    to: "/#facebook",
    text: "facebook redes sociales siguenos pagina oficial",
  },
  {
    title: "Servicios en línea y trámites",
    section: "Trámites",
    to: "/#servicios",
    text: "servicios en linea tramites gaceta municipal transparencia gobierno de mexico gob.mx",
  },
  {
    title: "Imprime tu CURP",
    section: "Trámites",
    to: "/#servicios",
    text: "curp clave unica de registro de poblacion imprimir tramite gob.mx identidad",
  },
  {
    title: "Imprime tu Acta de Nacimiento",
    section: "Trámites",
    to: "/#servicios",
    text: "acta de nacimiento certificada imprimir tramite registro civil gob.mx",
  },
  {
    title: "Cabildo",
    section: "Página",
    to: "/cabildo",
    text: "cabildo integrantes regidores regidoras sindica presidente semblanza comisiones formacion",
  },
  {
    title: "Historia del Cacicazgo en Coapinola",
    section: "Página",
    to: "/historia",
    text: "historia cacicazgo coapinola creacion del municipio 13 julio 2021 encuesta facultad de matematicas uagro documento historico pdf identidad",
  },
  {
    title: "Transparencia y Acceso a la Información",
    section: "Página",
    to: "/transparencia",
    text: "transparencia acceso informacion publica obligaciones marco normativo estructura organica remuneracion presupuesto solicitudes unidad de transparencia rendicion de cuentas",
  },
  {
    title: "Contratos de Obras Públicas",
    section: "Página",
    to: "/contratos",
    text: "contratos obras publicas insumos pdf licitacion obra",
  },
];

// Integrantes del cabildo (nombre, cargo y comisiones).
const officialEntries = officials.map((o) => ({
  title: o.name,
  section: "Cabildo",
  to: "/cabildo",
  text: [o.title, o.role, ...(o.comisiones || [])].join(" "),
}));

// Eventos y actualidades.
const eventEntries = events.map((e) => ({
  title: e.title,
  section: "Eventos",
  to: "/#eventos",
  text: [e.place, e.tag].join(" "),
}));
const newsEntries = news.map((n) => ({
  title: n.title,
  section: "Actualidades",
  to: "/#actualidades",
  text: [n.category, n.excerpt].join(" "),
}));

const index = [...staticEntries, ...officialEntries, ...eventEntries, ...newsEntries].map((e) => ({
  ...e,
  _norm: norm(e.title + " " + (e.text || "")),
  _title: norm(e.title),
}));

// Busca en el índice y devuelve las mejores coincidencias.
export function searchSite(query, limit = 7) {
  const q = norm(query).trim();
  if (q.length < 2) return [];
  const res = index.filter((e) => e._norm.includes(q));
  res.sort((a, b) => {
    const at = a._title.includes(q) ? 0 : 1;
    const bt = b._title.includes(q) ? 0 : 1;
    if (at !== bt) return at - bt; // primero los que coinciden en el título
    return a._title.indexOf(q) - b._title.indexOf(q);
  });
  return res.slice(0, limit);
}
