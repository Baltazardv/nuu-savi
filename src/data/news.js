// Actualidades / noticias del municipio. Reemplazar con contenido real.
// `cat` → newsCategories (color + ícono). `img` foto; `fallback` respaldo si `img` no existe.
//
// VIDEO (opcional): una nota puede llevar video además de foto. Agrega:
//   video: "https://www.youtube.com/watch?v=XXXX"   // YouTube, o
//   video: "https://www.facebook.com/.../videos/XXXX/"  // Facebook, o
//   video: "/assets/fotos/noticias/mi-video.mp4"    // archivo local (mp4)
// El reproductor se detecta automáticamente. El video se muestra en la nota destacada
// y las notas de la lista muestran un botón de reproducción.

export const newsCategories = {
  vida: { label: "Vida municipal", color: "#b5502f", icon: "landmark" },
  obras: { label: "Obras públicas", color: "#14716a", icon: "building" },
  cultura: { label: "Cultura", color: "#e6b23c", icon: "culture" },
  ambiente: { label: "Medio ambiente", color: "#5f8b4c", icon: "tree" },
  registro: { label: "Registro civil", color: "#5b6cb5", icon: "idCard" },
};

export function resolveNewsCat(n) {
  if (n.cat && newsCategories[n.cat]) return { key: n.cat, ...newsCategories[n.cat] };
  const t = (n.category || "").toLowerCase();
  const found = Object.keys(newsCategories).find((k) => newsCategories[k].label.toLowerCase() === t || k === t);
  const key = found || "vida";
  return { key, ...newsCategories[key] };
}

export const news = [
  {
    id: 1,
    cat: "vida",
    day: "12", month: "AGO", year: "2025",
    date: "Publicado el 12 de agosto de 2025",
    title: "Bienvenida al nuevo sitio del Municipio de Ñuu Savi",
    excerpt:
      "Estrenamos un espacio digital para acercar los servicios, la historia y la transparencia del municipio a toda la comunidad.",
    featured: true,
    img: "/assets/fotos/noticias/bienvenida.jpg",
    fallback: "/assets/fotos/asamblea.jpg",
  },
  {
    id: 2,
    cat: "obras",
    day: "05", month: "AGO", year: "2025",
    date: "Publicado el 5 de agosto de 2025",
    title: "Avanzan trabajos de mejora en caminos rurales",
    excerpt:
      "El ayuntamiento informa sobre las obras en marcha para mejorar la conectividad entre las comunidades del territorio.",
    img: "/assets/fotos/noticias/obras.jpg",
    fallback: "/assets/fotos/administracion.jpg",
  },
  {
    id: 3,
    cat: "cultura",
    day: "28", month: "JUL", year: "2025",
    date: "Publicado el 28 de julio de 2025",
    title: "Convocatoria: talleres de lengua y cultura mixteca",
    excerpt:
      "Abrimos inscripciones para los talleres comunitarios dedicados a preservar la lengua Tu'un Savi y las tradiciones locales.",
    img: "/assets/fotos/noticias/cultura.jpg",
    fallback: "/assets/fotos/eventos/lengua.jpg",
  },
  {
    id: 4,
    cat: "ambiente",
    day: "18", month: "JUL", year: "2025",
    date: "Publicado el 18 de julio de 2025",
    title: "Faena comunitaria de reforestación en Cerro Verde",
    excerpt:
      "Agradecemos a todas y todos los que participaron en esta jornada por nuestro territorio y las futuras generaciones.",
    img: "/assets/fotos/noticias/reforestacion.jpg",
    fallback: "/assets/fotos/eventos/reforestacion.jpg",
  },
  {
    id: 5,
    cat: "registro",
    day: "01", month: "SEP", year: "2025",
    date: "Publicado el 1 de septiembre de 2025",
    title: "Registro Civil: horarios y trámites disponibles",
    excerpt:
      "La oficina del Registro Civil del municipio informa los horarios de atención y los trámites de actas de nacimiento, matrimonio y defunción. (Información por confirmar con el municipio.)",
    img: "/assets/fotos/administracion.jpg",
    fallback: "/assets/fotos/asamblea.jpg",
    // Para agregar un video a esta nota:
    // video: "https://www.facebook.com/61550486085759/videos/XXXXXXXX/",
  },
];
