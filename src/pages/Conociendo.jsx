import { useEffect, useState } from "react";
import PageHero from "../components/PageHero.jsx";
import Icon from "../components/Icons.jsx";
import { asset } from "../lib/asset.js";
import { secciones } from "../data/conociendo.js";

const MAP_QUERY = "Coapinola, Guerrero, México";
const MAP_EMBED = "https://maps.google.com/maps?q=" + encodeURIComponent(MAP_QUERY) + "&z=12&hl=es&output=embed";

const datos = [
  { icon: "calendar", strong: "31 de agosto de 2021", sub: "Constitución del municipio" },
  { icon: "landmark", strong: "Coapinola", sub: "Cabecera municipal" },
  { icon: "map", strong: "37 localidades", sub: "Integran el territorio" },
  { icon: "book", strong: "Tu'un Savi", sub: "Lengua originaria (mixteco)" },
  { icon: "flag", strong: "Guerrero", sub: "Uno de los 85 municipios" },
  { icon: "cloudRain", strong: "Pueblo de la lluvia", sub: "Significado de «Ñuu Savi»" },
];

// Índice global de cada foto para el lightbox.
const allPhotos = secciones.flatMap((s) => s.photos);
const globalIndex = (sKey, i) => {
  let n = 0;
  for (const s of secciones) {
    if (s.key === sKey) return n + i;
    n += s.photos.length;
  }
  return 0;
};

export default function Conociendo() {
  const [index, setIndex] = useState(-1);
  const open = index >= 0;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setIndex(-1);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % allPhotos.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + allPhotos.length) % allPhotos.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <PageHero
        title="Conociendo Ñuu Savi"
        subtitle="Conoce el origen, la cultura, las tradiciones y la riqueza natural del pueblo de la lluvia."
        crumbs={[{ label: "Inicio", to: "/" }, { label: "Conociendo Ñuu Savi" }]}
      />

      <section className="section">
        <div className="container">
          <div className="conoce__facts">
            {datos.map((d) => (
              <div className="conoce__fact" key={d.strong}>
                <span className="conoce__fact-icon"><Icon name={d.icon} size={22} /></span>
                <div><strong>{d.strong}</strong><span>{d.sub}</span></div>
              </div>
            ))}
          </div>

          <div className="prose" style={{ marginBottom: "1rem" }}>
            <p>
              <strong>Ñuu Savi</strong> —del mixteco <em>Ñuu</em> ‘pueblo’ y <em>Savi</em> ‘lluvia’,
              «pueblo de la lluvia»— es uno de los 85 municipios del estado de Guerrero. Su cabecera es
              <strong> Coapinola</strong>, y su territorio reúne <strong>37 localidades</strong> que
              comparten lengua, tradiciones y un profundo vínculo con la tierra. Aquí te compartimos
              parte de su riqueza natural y cultural.
            </p>
          </div>
        </div>

        {/* Secciones culturales con galería */}
        {secciones.map((s, si) => (
          <div className="container conoce__block" key={s.key} id={s.key}>
            <div className="conoce__block-head">
              <span className="conoce__block-icon"><Icon name={s.icon} size={24} /></span>
              <h2 className="h2">{s.title}</h2>
            </div>
            <p className="conoce__block-text">{s.text}</p>
            {s.audio && (
              <figure className="conoce__audio">
                <figcaption><Icon name="music" size={18} /> {s.audio.title}</figcaption>
                <audio controls preload="none" src={asset(s.audio.src)}>
                  Tu navegador no puede reproducir el audio.
                </audio>
              </figure>
            )}
            <div className="conoce__gallery">
              {s.photos.map((p, i) => (
                <button className="conoce__photo" key={p.src} onClick={() => setIndex(globalIndex(s.key, i))} aria-label={`Ampliar: ${p.cap}`}>
                  <img src={asset(p.src)} alt={p.cap} loading="lazy" />
                  <span className="conoce__photo-cap">{p.cap}</span>
                  <span className="conoce__photo-zoom"><Icon name="expand" size={16} /></span>
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="container">
          <div className="conoce__block-head" style={{ marginTop: "1rem" }}>
            <span className="conoce__block-icon"><Icon name="marker" size={24} /></span>
            <h2 className="h2">¿Dónde estamos?</h2>
          </div>
          <figure className="conoce__map">
            <iframe
              title="Mapa interactivo de Ñuu Savi (Coapinola, Guerrero)"
              src={MAP_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </figure>
        </div>
      </section>

      {open && (
        <div className="lightbox" onClick={() => setIndex(-1)} role="dialog" aria-modal="true">
          <button className="lightbox__close" aria-label="Cerrar" onClick={() => setIndex(-1)}>
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
          <button className="lightbox__nav lightbox__prev" aria-label="Anterior" onClick={(e) => { e.stopPropagation(); setIndex((i) => (i - 1 + allPhotos.length) % allPhotos.length); }}>
            <Icon name="chevronLeft" size={30} />
          </button>
          <figure className="lightbox__fig" onClick={(e) => e.stopPropagation()}>
            <img src={asset(allPhotos[index].src)} alt={allPhotos[index].cap} />
            <figcaption>{allPhotos[index].cap}</figcaption>
          </figure>
          <button className="lightbox__nav lightbox__next" aria-label="Siguiente" onClick={(e) => { e.stopPropagation(); setIndex((i) => (i + 1) % allPhotos.length); }}>
            <Icon name="chevronRight" size={30} />
          </button>
        </div>
      )}
    </>
  );
}
