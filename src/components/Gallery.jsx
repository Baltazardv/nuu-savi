import { useEffect, useState } from "react";
import Icon from "./Icons.jsx";

const photos = [
  { src: "/assets/fotos/capacitacion-1.jpg", cap: "Capacitación: Manual de Organización de la Administración Pública Municipal" },
  { src: "/assets/fotos/capacitacion-2.jpg", cap: "Formación continua de las y los servidores públicos" },
  { src: "/assets/fotos/reunion-1.jpg", cap: "Reunión de trabajo del cabildo municipal" },
  { src: "/assets/fotos/capacitacion-4.jpg", cap: "Jornada de capacitación al personal municipal" },
  { src: "/assets/fotos/administracion.jpg", cap: "Trabajo administrativo en las oficinas del ayuntamiento" },
  { src: "/assets/fotos/reunion-3.jpg", cap: "Sesión de cabildo del Municipio de Ñuu Savi" },
  { src: "/assets/fotos/capacitacion-3.jpg", cap: "Taller sobre el Código de Conducta municipal" },
  { src: "/assets/fotos/asamblea.jpg", cap: "Asamblea con la comunidad" },
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

  return (
    <section className="section gallery" id="capacitaciones">
      <div className="container section-head--center" style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <p className="kicker" style={{ marginBottom: ".5rem" }}>Gobierno cercano</p>
        <h2 className="h2">Seguimos capacitando a nuestros servidores públicos</h2>
        <p className="section-sub" style={{ maxWidth: "56ch", margin: "1rem auto 0", color: "var(--ink-soft)" }}>
          El Ayuntamiento de Ñuu Savi impulsa la formación continua de su personal para brindar
          un mejor servicio a la comunidad.
        </p>
      </div>

      <div className="container gallery__grid">
        {photos.map((p, i) => (
          <button className="gallery__item" key={p.src} onClick={() => setIndex(i)} aria-label={`Ampliar: ${p.cap}`}>
            <img src={p.src} alt={p.cap} loading="lazy" />
            <span className="gallery__zoom"><Icon name="search" size={18} /></span>
          </button>
        ))}
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
            <img src={photos[index].src} alt={photos[index].cap} />
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
