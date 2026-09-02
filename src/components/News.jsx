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

export default function News() {
  const [items, setItems] = useState(fallbackNews);
  const [filter, setFilter] = useState("todos");

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
            <img alt={featured.title} loading="lazy" {...imgProps(featured)} />
            <span className="news__badge" style={{ background: fc.color }}>{fc.label}</span>
            {featured.day && (
              <span className="news-featured__date"><strong>{featured.day}</strong><span>{featured.month}</span><span>{featured.year}</span></span>
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
                <div className="news-card__media"><img alt={n.title} loading="lazy" {...imgProps(n)} /></div>
                <div className="news-card__body">
                  <span className="news__badge news__badge--sm" style={{ background: c.color }}>{c.label}</span>
                  <h4>{n.title}</h4>
                  <p className="news__date"><Icon name="calendar" size={13} /> {n.date}</p>
                  <p className="news-card__excerpt">{n.excerpt}</p>
                  <a href={n.link || site.facebook} className="link-arrow link-arrow--sm">Leer la nota <Icon name="arrowRight" size={15} /></a>
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
