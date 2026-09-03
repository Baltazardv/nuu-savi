// Publicaciones destacadas para la tarjeta estilo Facebook.
// Cifras de reacciones ilustrativas — editar con las reales o vaciar.
// `img` foto; `fallback` respaldo si `img` no existe.
export const fbPosts = [
  {
    img: "/assets/fotos/noticias/bienvenida.jpg",
    fallback: "/assets/fotos/asamblea.jpg",
    date: "12 de agosto de 2025",
    title: "Asamblea comunitaria en Coapinola",
    excerpt: "Seguimos trabajando de la mano con nuestra comunidad.",
    likes: 142, comments: 12, shares: 8,
  },
  {
    img: "/assets/fotos/noticias/obras.jpg",
    fallback: "/assets/fotos/administracion.jpg",
    date: "5 de agosto de 2025",
    title: "Avanzan trabajos de mejora en caminos rurales",
    excerpt: "Mejor infraestructura para comunidades más conectadas.",
    likes: 98, comments: 7, shares: 5,
  },
  {
    img: "/assets/fotos/eventos/reforestacion.jpg",
    fallback: "/assets/fotos/capacitacion-4.jpg",
    date: "28 de julio de 2025",
    title: "Faena comunitaria de reforestación",
    excerpt: "Cuidamos nuestra tierra, sembramos futuro para las próximas generaciones.",
    likes: 115, comments: 10, shares: 6,
  },
];

export const fbHighlights = [
  { icon: "bell", strong: "Avisos", sub: "oportunos" },
  { icon: "calendar", strong: "Eventos", sub: "y actividades" },
  { icon: "people", strong: "Comunidad", sub: "informada" },
];
