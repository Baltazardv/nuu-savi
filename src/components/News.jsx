import { useEffect, useState } from "react";
import { news as fallbackNews, newsCategories, resolveNewsCat } from "../data/news.js";
import { getActualidades } from "../lib/wp.js";
import { asset } from "../lib/asset.js";
import { site } from "../data/site.js";
import Icon from "./Icons.jsx";

const featuredHighlights = [
  { icon: "doc", label: "Información", sub: "clara y accesible" },
  { icon: "people", label: "Servicios", sub: "para la comunidad" },
  { icon: "shield", label: "Transparencia", sub: "y rendición de cuentas" },
];

// Detecta el tipo de video y devuelve el reproductor adecuado (YouTube, Facebook o archivo mp4).
function ytId(u) {
  const m = String(u || "").match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);
  return m ? m[1] : null;
}
function VideoEmbed({ url }) {
  const yt = ytId(url);
  if (yt) {
    return (
      <iframe className="news__video" src={`https://www.youtube.com/embed/${yt}?rel=0&autoplay=1`}
        title="Video de la nota" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen />
    );
  }
  if (/facebook\.com/.test(url)) {
    return (
      <iframe className="news__video" src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&autoplay=true`}
        title="Video de la nota" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        scrolling="no" allowFullScreen />
    );
  }
  return <video className="news__video" src={asset(url)} controls autoPlay playsInline />;
}

export default function News() {
  const [items, setItems] = useState(fallbackNews);
  const [filter, setFilter] = useState("todos");
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    let alive = true;
    getActualidades(6).then((d) => { if (alive && d && d.length) setItems(d); });
    return () => { alive = false; };
  }, []);

  const featured = items.find((n) => n.featured) || items[0];
  const rest = items.filter((n) => n.id !== featured.id);
  const presentCats = [...new Set(items.map((n) => resolveNewsCat(n).key))];
  const filters = ["todos", ...presentCats];
  const shownRest = filter === "todos" ? rest : rest.filter((n) => resolveNewsCat(n).key === filter);

  const grecaStyle = { backgroundImage: `url(${asset("/assets/fotos/greca.png")})` };

  const imgProps = (n) => ({
    src: asset(n.img || n.image),
    onError: (e) => {
      const el = e.currentTarget;
      if (n.fallback && !el.dataset.fb) { el.dataset.fb = "1"; el.src = asset(n.fallback); }
      else el.style.visibility = "hidden";
    },
  });

  const fc = resolveNewsCat(featured);

  return (
    <section className="section news" id="actualidades">
      <div className="news__watermark" aria-hidden="true" />

      <div className="container news__head">
        <div>
          <h2 className="h2">Actualidades</h2>
          <span className="news__greca" aria-hidden="true" style={grecaStyle} />
          <p className="section-sub">Avisos y noticias del municipio</p>
        </div>
        <a href={site.facebook} target="_blank" rel="noopener" className="btn btn--ghost news__all">
          <Icon name="doc" size={17} /> Todas las noticias
        </a>
      </div>

      {filters.length > 2 && (
        <div className="container events__filters news__filters">
          {filters.map((f) => {
            const isAll = f === "todos";
            const c = isAll ? { label: "Todos", color: "#14716a" } : newsCategories[f];
            return (
              <button key={f} className={"events__filter" + (filter === f ? " is-active" : "")} onClick={() => setFilter(f)}
                style={filter === f ? { background: c.color, borderColor: c.color, color: "#fff" } : undefined}>
                {!isAll && <span className="events__dot" style={{ background: c.color }} />}{c.label}
              </button>
            );
          })}
        </div>
      )}

      <div className="container news__grid">
        <article className="news-featured">
          <div className="news-featured__media">
            {featured.video && playing ? (
              <VideoEmbed url={featured.video} />
            ) : (
              <>
                <img alt={featured.title} loading="lazy" {...imgProps(featured)} />
                {featured.video && (
                  <button type="button" className="news__play" onClick={() => setPlaying(true)} aria-label="Reproducir video">
                    <Icon name="play" size={30} />
                  </button>
                )}
                <span className="news__badge" style={{ background: fc.color }}>{fc.label}</span>
                {featured.day && (
                  <span className="news-featured__date"><strong>{featured.day}</strong><span>{featured.month}</span><span>{featured.year}</span></span>
                )}
              </>
            )}
          </div>
          <div className="news-featured__body">
            <h3>{featured.title}</h3>
            <p className="news__date">{featured.date}</p>
            <p className="news__excerpt">{featured.excerpt}</p>
            <a href={featured.link || site.facebook} className="link-arrow">Leer la nota <Icon name="arrowRight" size={17} /></a>
            <ul className="news-featured__highlights">
              {featuredHighlights.map((h) => (
                <li key={h.label}><span className="news-featured__hl-icon"><Icon name={h.icon} size={17} /></span><span><strong>{h.label}</strong> {h.sub}</span></li>
              ))}
            </ul>
          </div>
        </article>

        <div className="news__list">
          {shownRest.map((n) => {
            const c = resolveNewsCat(n);
            return (
              <article className="news-card" key={n.id} style={{ borderLeftColor: c.color }}>
                <div className="news-card__media">
                  <img alt={n.title} loading="lazy" {...imgProps(n)} />
                  {n.video && <span className="news-card__play" aria-hidden="true"><Icon name="play" size={16} /></span>}
                </div>
                <div className="news-card__body">
                  <span className="news__badge news__badge--sm" style={{ background: c.color }}>{c.label}</span>
                  <h4>{n.title}</h4>
                  <p className="news__date"><Icon name="calendar" size={13} /> {n.date}</p>
                  <p className="news-card__excerpt">{n.excerpt}</p>
                  {n.video ? (
                    <a href={n.video} target="_blank" rel="noopener noreferrer" className="link-arrow link-arrow--sm">Ver video <Icon name="play" size={14} /></a>
                  ) : (
                    <a href={n.link || site.facebook} className="link-arrow link-arrow--sm">Leer la nota <Icon name="arrowRight" size={15} /></a>
                  )}
                </div>
                <span className="news-card__icon" style={{ color: c.color, background: `${c.color}18` }}><Icon name={c.icon} size={20} /></span>
              </article>
            );
          })}
        </div>
      </div>

      <div className="container">
        <div className="news__cta">
          <span className="news__cta-icon"><Icon name="megaphone" size={26} /></span>
          <div className="news__cta-text">
            <strong>¿Tienes algo que compartir?</strong>
            <span>Envíanos información de tu comunidad, actividades o avisos importantes.</span>
          </div>
          <a href={site.facebook} target="_blank" rel="noopener" className="btn btn--solid news__cta-btn">
            <Icon name="send" size={17} /> Enviar información
          </a>
          <div className="news__cta-phone">O contáctanos en <a href={site.phoneHref}><Icon name="phone" size={14} /> {site.phone}</a></div>
        </div>
      </div>
    </section>
  );
}
