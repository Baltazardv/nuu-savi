// Datos generales del sitio. Editar aquí para actualizar contacto, menú, etc.

export const site = {
  name: "Ñuu Savi",
  longName: "Municipio de Ñuu Savi",
  tagline: "Pueblo de la lluvia",
  phone: "745 119 3790",
  phoneHref: "tel:7451193790",
  // Correo de contacto — confirmar/crear la cuenta real en cPanel antes de la entrega.
  email: "contacto@nuu-savi.gob.mx",
  address: {
    line1: "Ayuntamiento de Ñuu Savi, Gro.",
    line2: "C.P. 39210, Coapinola, Guerrero",
  },
  hours: [
    "Lunes a viernes de 9:00 a 15:00 h",
  ],
  facebook: "https://www.facebook.com/people/H-Ayuntamiento-Municipal-De-Ñuu-Savi-2024-2027/61550486085759/",
  domain: "nuu-savi.gob.mx",
};

export const nav = [
  { label: "Inicio", to: "/" },
  { label: "Conociendo Ñuu Savi", to: "/conociendo" },
  { label: "Cabildo", to: "/cabildo" },
  { label: "Historia", to: "/historia" },
  { label: "Transparencia", to: "/transparencia" },
  { label: "Contratos", to: "/contratos" },
];

// Accesos rápidos por perfil (fila de íconos circulares del home)
export const profiles = [
  { key: "ciudadania", label: "Ciudadanía", to: "/transparencia", icon: "people" },
  { key: "visitante", label: "Visitante", to: "/historia", icon: "compass" },
  { key: "joven", label: "Juventud", to: "/cabildo", icon: "spark" },
  { key: "empresa", label: "Empresa", to: "/contratos", icon: "building" },
  { key: "asociacion", label: "Asociación", to: "/cabildo", icon: "hands" },
];

// Números de emergencia (24 horas). Reemplazar con los números oficiales del municipio.
// `pending: true` mientras el municipio confirma el número real.
export const emergency = [
  { label: "Emergencias (911)", phone: "911", href: "tel:911", icon: "shield" },
  { label: "Seguridad Pública Municipal", phone: "744 321 7801", href: "tel:7443217801", icon: "shield" },
  { label: "Protección Civil Municipal", phone: "744 321 7801", href: "tel:7443217801", icon: "warning" },
];

// Plataformas oficiales de transparencia (nacional y estatal).
export const transparenciaLinks = [
  {
    label: "Plataforma Nacional de Transparencia (PNT)",
    desc: "Consulta obligaciones de transparencia y presenta solicitudes de información a nivel nacional.",
    href: "https://www.plataformadetransparencia.org.mx/",
    scope: "Nacional",
  },
  {
    label: "ITAIGro — Transparencia Guerrero",
    desc: "Instituto de Transparencia, Acceso a la Información y Protección de Datos Personales del Estado de Guerrero.",
    href: "https://itaigro.org.mx/",
    scope: "Estatal",
  },
];
