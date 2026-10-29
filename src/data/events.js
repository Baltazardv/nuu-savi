// Próximos eventos / agenda. Reemplazar con los eventos reales del municipio.
// `cat` referencia a eventCategories (color + ícono). `img` es la foto del evento.

export const eventCategories = {
  comunidad: { label: "Comunidad", color: "#14716a", icon: "people" },
  civico: { label: "Cívico", color: "#2f8f86", icon: "flag" },
  salud: { label: "Salud", color: "#b5502f", icon: "health" },
  cultura: { label: "Cultura", color: "#e6b23c", icon: "culture" },
  ambiente: { label: "Medio ambiente", color: "#5f8b4c", icon: "tree" },
};

// Resuelve la categoría de un evento (con respaldo si viene de WordPress sin `cat`).
export function resolveCat(ev) {
  if (ev.cat && eventCategories[ev.cat]) return { key: ev.cat, ...eventCategories[ev.cat] };
  const t = (ev.tag || "").toLowerCase();
  const found = Object.keys(eventCategories).find((k) => eventCategories[k].label.toLowerCase() === t || k === t);
  const key = found || "comunidad";
  return { key, ...eventCategories[key] };
}

export const events = [
  {
    id: 1,
    day: "07",
    month: "SEP",
    cat: "comunidad",
    title: "Asamblea comunitaria de Ñuu Savi",
    place: "Explanada municipal · Coapinola",
    img: "/assets/fotos/eventos/asamblea.webp",
    fallback: "/assets/fotos/asamblea.webp",
  },
  {
    id: 2,
    day: "15",
    month: "SEP",
    cat: "civico",
    title: "Ceremonia del Grito de Independencia",
    place: "Plaza principal · Coapinola",
    img: "/assets/fotos/eventos/grito.webp",
    fallback: "/assets/fotos/cabildo-grupo.webp",
  },
  {
    id: 3,
    day: "28",
    month: "SEP",
    cat: "salud",
    title: "Jornada de salud comunitaria",
    place: "Centro de salud municipal",
    img: "/assets/fotos/eventos/salud.webp",
    fallback: "/assets/fotos/administracion.webp",
  },
  {
    id: 4,
    day: "12",
    month: "OCT",
    cat: "cultura",
    title: "Encuentro de lengua Tu'un Savi",
    place: "Casa de la cultura",
    img: "/assets/fotos/eventos/lengua.webp",
    fallback: "/assets/fotos/reunion-2.webp",
  },
  {
    id: 5,
    day: "20",
    month: "OCT",
    cat: "ambiente",
    title: "Faena y reforestación comunitaria",
    place: "Cerro de Coapinola",
    img: "/assets/fotos/eventos/reforestacion.webp",
    fallback: "/assets/fotos/capacitacion-4.webp",
  },
];
