import { useEffect, useState } from "react";
import Icon from "./Icons.jsx";
import { asset } from "../lib/asset.js";
import { site } from "../data/site.js";

const highlights = [
  { icon: "school", label: "Capacitación continua" },
  { icon: "check", label: "Mejores prácticas" },
  { icon: "hands", label: "Servicio de calidad" },
  { icon: "people", label: "Comunidad fortalecida" },
];

// Cifras ilustrativas — el municipio puede actualizarlas.
const stats = [
  { icon: "school", num: "24", label: "Capacitaciones realizadas" },
  { icon: "people", num: "186", label: "Servidores públicos capacitados" },
  { icon: "landmark", num: "12", label: "Áreas del gobierno fortalecidas" },
];

const photos = [
  { src: "/assets/fotos/capacitacion-1.jpg", tag: "Taller", cap: "Manual de Organización de la Administración Pública Municipal" },
  { src: "/assets/fotos/capacitacion-2.jpg", tag: "Capacitación", cap: "Formación continua de las y los servidores públicos" },
  { src: "/assets/fotos/reunion-1.jpg", tag: "Reunión", cap: "Reunión de trabajo del cabildo municipal" },
  { src: "/assets/fotos/capacitacion-4.jpg", tag: "Formación", cap: "Jornada de capacitación al personal municipal" },
  { src: "/assets/fotos/administracion.jpg", tag: "Administración", cap: "Trabajo administrativo en las oficinas del ayuntamiento" },
  { src: "/assets/fotos/reunion-3.jpg", tag: "Cabildo", cap: "Sesión de cabildo del Municipio de Ñuu Savi" },
  { src: "/assets/fotos/capacitacion-3.jpg", tag: "Curso", cap: "Taller sobre el Código de Conducta municipal" },
  { src: "/assets/fotos/asamblea.jpg", tag: "Asamblea", cap: "Asamblea con la comunidad" },
];

export default function Gallery() {
  const [index, setIndex] = useState(-1);
  const open = index >= 0;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setIndex(-1);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % photos.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + photos.length) % photos.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const grecaUrl = { backgroundImage: `url(${asset("/assets/fotos/greca.png")})` };

  return (
    <section className="section gallery" id="capacitaciones">
      <div className="container gallery__head">
        <p className="kicker">Gobierno cercano</p>
        <span className="gallery__greca" aria-hidden="true" style={grecaUrl} />
        <h2 className="h2">Seguimos capacitando a nuestros servidores públicos</h2>
        <p className="section-sub gallery__sub">
          El Ayuntamiento de Ñuu Savi impulsa la formación continua de su personal para brindar
          un mejor servicio a la comunidad.
        </p>

        <ul className="gallery__highlights">
          {highlights.map((h) => (
            <li key={h.label}><span className="gallery__hl-icon"><Icon name={h.icon} size={20} /></span>{h.label}</li>
          ))}
        </ul>
      </div>

      <div className="container gallery__grid">
        {photos.map((p, i) => (
          <button className="gallery__item" key={p.src} onClick={() => setIndex(i)} aria-label={`Ampliar: ${p.cap}`}>
            <img src={asset(p.src)} alt={p.cap} loading="lazy" />
            {p.tag && <span className="gallery__tag">{p.tag}</span>}
            <span className="gallery__zoom"><Icon name="search" size={18} /></span>
          </button>
        ))}
      </div>

      <div className="container">
        <span className="gallery__greca gallery__greca--center" aria-hidden="true" style={grecaUrl} />
        <div className="gallery__stats">
          {stats.map((s) => (
            <div className="gallery__stat" key={s.label}>
              <span className="gallery__stat-icon"><Icon name={s.icon} size={24} /></span>
              <div>
                <strong>{s.num}</strong>
                <span>{s.label}</span>
              </div>
            </div>
          ))}
          <div className="gallery__cta">
            <p>La capacitación transforma el servicio y construye un mejor municipio.</p>
            <a href={site.facebook} target="_blank" rel="noopener" className="btn btn--solid">
              Ver todas las capacitaciones <Icon name="arrowRight" size={17} />
            </a>
          </div>
        </div>
      </div>

      {open && (
        <div className="lightbox" onClick={() => setIndex(-1)} role="dialog" aria-modal="true">
          <button className="lightbox__close" aria-label="Cerrar" onClick={() => setIndex(-1)}>
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
          <button className="lightbox__nav lightbox__prev" aria-label="Anterior" onClick={(e) => { e.stopPropagation(); setIndex((i) => (i - 1 + photos.length) % photos.length); }}>
            <Icon name="chevronLeft" size={30} />
          </button>
          <figure className="lightbox__fig" onClick={(e) => e.stopPropagation()}>
            <img src={asset(photos[index].src)} alt={photos[index].cap} />
            <figcaption>{photos[index].cap}</figcaption>
          </figure>
          <button className="lightbox__nav lightbox__next" aria-label="Siguiente" onClick={(e) => { e.stopPropagation(); setIndex((i) => (i + 1) % photos.length); }}>
            <Icon name="chevronRight" size={30} />
          </button>
        </div>
      )}
    </section>
  );
}
