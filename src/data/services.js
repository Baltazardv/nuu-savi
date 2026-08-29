// Trámites y servicios en línea.
// `to` = ruta interna; `href` = enlace externo (oficial); `badge` = etiqueta si aún no hay enlace.
export const services = [
  {
    title: "Transparencia",
    desc: "Consulta la información pública y la rendición de cuentas del municipio.",
    icon: "shield",
    color: "#14716a",
    to: "/transparencia",
    cta: "Ver transparencia",
  },
  {
    title: "Gaceta Municipal",
    desc: "Publicaciones oficiales, acuerdos y avisos del H. Ayuntamiento.",
    icon: "doc",
    color: "#2f8f86",
    badge: "Enlace por definir",
  },
  {
    title: "Imprime tu CURP",
    desc: "Consulta e imprime tu Clave Única de Registro de Población.",
    icon: "idCard",
    color: "#b5502f",
    href: "https://www.gob.mx/curp/",
    official: true,
    cta: "Ir al trámite",
  },
  {
    title: "Imprime tu Acta de Nacimiento",
    desc: "Solicita e imprime tu acta de nacimiento certificada en línea.",
    icon: "doc",
    color: "#e6b23c",
    href: "https://www.gob.mx/ActaNacimiento/folioSeguimiento/",
    official: true,
    cta: "Ir al trámite",
  },
];
