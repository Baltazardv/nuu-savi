// Integrantes del Cabildo del Municipio de Ñuu Savi (periodo 2024–2027).
// Información tomada de las fichas de biografía proporcionadas por el municipio.
// Sistema Normativo Propio (Usos y Costumbres).

export const officials = [
  {
    slug: "presidente",
    order: 1,
    name: "Donaciano Morales Porfirio",
    title: "Presidente Municipal Constitucional",
    role: "Presidencia Municipal",
    photo: "/assets/fotos/cabildo/presidente.jpg",
    formacion:
      "Licenciatura en Sociología por la Universidad Autónoma de Guerrero. Cursó sus estudios profesionales en Chilpancingo de los Bravos durante el periodo 1995–1999.",
    comunitarios: [
      "Consejero regional",
      "Secretario del delegado de la comunidad de San Felipe (2003–2006)",
      "Integrante del Comité Gestor para la Creación del Municipio de Ñuu Savi (2021)",
    ],
    comisiones: [
      "Secretaría General",
      "Tesorería Municipal",
      "Jefatura de la Administración Municipal",
      "Órgano de Control Interno Municipal",
    ],
  },
  {
    slug: "sindicatura",
    order: 2,
    name: "Angelina Montalvo Hernández",
    title: "Síndica Procuradora Municipal",
    role: "Sindicatura",
    photo: "/assets/fotos/cabildo/sindica.jpg",
    formacion: "Licenciatura en Educación Primaria Indígena.",
    comunitarios: [
      "Comité del Consejo de Participación Social de la Escuela",
      "Comité del consejo comunitario",
      "Comité de la Asociación de Padres de Familia",
    ],
    comisiones: [
      "Tesorería",
      "Obras Públicas",
      "Alumbrado Público",
      "Tránsito Municipal",
      "Protección Civil",
    ],
  },
  {
    slug: "obras-publicas",
    order: 3,
    name: "Víctor Bernabé Porfirio",
    title: "Regidor de Obras Públicas y Desarrollo Urbano",
    role: "Regiduría",
    photo: "/assets/fotos/cabildo/obras.jpg",
    formacion:
      "Ingeniero Topógrafo y Geodesta, Ingeniero Civil y Técnico Programador Analista (Computación).",
    comunitarios: [
      "Secretario de delegado",
      "Consejero de la localidad La Fátima",
      "Comité de gestión del municipio de Ñuu Savi",
    ],
    comisiones: ["Obras Públicas", "Desarrollo Urbano", "Catastro"],
  },
  {
    slug: "salud",
    order: 4,
    name: "Crispina Macario Margarita",
    title: "Regidora de Salud Pública y Asistencia Social",
    role: "Regiduría",
    photo: "/assets/fotos/cabildo/salud.jpg",
    formacion: "Licenciatura en Derecho.",
    comunitarios: [
      "Jefa de Manzana en el Centro de Salud",
      "Enlace de la comunidad",
      "Comité de Escuela",
    ],
    comisiones: [
      "Oficialía del Registro Civil",
      "Salud Pública y Asistencia Social",
      "DIF Municipal",
    ],
  },
  {
    slug: "desarrollo-rural",
    order: 5,
    name: "Felipe García Camilo",
    title: "Regidor de Desarrollo Rural y Ecología, Medio Ambiente y Recursos Naturales",
    role: "Regiduría",
    photo: "/assets/fotos/cabildo/desarrollo-rural.jpg",
    formacion:
      "Ingeniero Agrónomo con especialidad en Fitotecnia, egresado del Colegio Superior Agropecuario del Estado de Guerrero (SADER-CSAEGRO), generación 2017.",
    comunitarios: [
      "Secretario de la comunidad de La Angostura (2019, 2021 y 2022)",
      "Integrante del Comité Gestor para la Creación del Municipio de Ñuu Savi (2021)",
      "Jefe de la administración del H. Ayuntamiento de Ñuu Savi (2023–2024)",
      "Docente en la Telesecundaria «Adolfo López Mateos», Tecpan de Galeana (2018–2019)",
    ],
    comisiones: ["Desarrollo Rural", "Ecología, Medio Ambiente y Recursos Naturales"],
  },
  {
    slug: "educacion",
    order: 6,
    name: "Ninfa Neri Cornelio",
    title: "Regidora de Educación, Juventud, Deporte y Cultura",
    role: "Regiduría",
    photo: "/assets/fotos/cabildo/educacion.jpg",
    formacion: "Licenciatura en Desarrollo Sustentable.",
    comunitarios: [
      "Enlace de la comunidad de El Charquito",
      "Apoyo en las necesidades de la comunidad",
    ],
    comisiones: [
      "Educación, Juventud, Deporte y Cultura",
      "Comunicación Social e Informática",
    ],
  },
  {
    slug: "seguridad",
    order: 7,
    name: "Luis Miguel Francisco Delfino",
    title: "Regidor de Seguridad Pública y Transparencia",
    role: "Regiduría",
    photo: "/assets/fotos/cabildo/seguridad.jpg",
    formacion: "Licenciatura en Derecho.",
    comunitarios: [
      "Comité de Agua Potable",
      "Comité de salud de la escuela",
      "Comité de la obra de Faispian",
    ],
    comisiones: [
      "Seguridad Pública",
      "Protección Civil",
      "Alumbrado Público",
      "Tránsito Municipal",
    ],
  },
  {
    slug: "mujer",
    order: 8,
    name: "Hortensia Zuñiga Saturnino",
    title: "Regidora de Participación Social de la Mujer y Asuntos Indígenas",
    role: "Regiduría",
    photo: "/assets/fotos/cabildo/mujer.jpg",
    formacion: "No aplica.",
    comunitarios: ["Comité de Salud", "Comité de Comedor Comunitario"],
    comisiones: [
      "Participación Social de la Mujer y Asuntos Indígenas",
      "Limpieza",
      "Cocina",
    ],
  },
];

// Iniciales para el respaldo cuando no hay foto.
export function initialsOf(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}
