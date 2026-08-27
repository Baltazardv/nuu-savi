// Datos generales del sitio. Editar aquí para actualizar contacto, menú, etc.

export const site = {
  name: "Ñuu Savi",
  longName: "Comunidad de Ñuu Savi",
  tagline: "Pueblo de la lluvia",
  phone: "747 226 4882",
  phoneHref: "tel:7472264882",
  address: {
    line1: "Ayuntamiento de Ñuu Savi, Gro.",
    line2: "C.P. 39210, Coapinola, Guerrero",
  },
  hours: [
    "Lunes a jueves de 9:00 a 15:00 h",
    "Viernes de 9:00 a 14:00 h",
  ],
  facebook: "https://www.facebook.com/people/H-Ayuntamiento-Municipal-De-Ñuu-Savi-2024-2027/61550486085759/",
  domain: "nuu-savi.gob.mx",
};

export const nav = [
  { label: "Inicio", to: "/" },
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
