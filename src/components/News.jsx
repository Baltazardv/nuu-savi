import { useEffect, useState } from "react";
import { news as fallbackNews } from "../data/news.js";
import { getActualidades } from "../lib/wp.js";
import { asset } from "../lib/asset.js";
import Icon from "./Icons.jsx";

export default function News() {
  // Arranca con los datos de ejemplo; si WordPress responde, los reemplaza.
  const [items, setItems] = useState(fallbackNews);

  useEffect(() => {
    let alive = true;
    getActualidades(4).then((data) => {
      if (alive && data && data.length) setItems(data);
    });
    return () => { alive = false; };
  }, []);

  const featured = items.find((n) => n.featured) || items[0];
  const rest = items.filter((n) => n.id !== featured.id).slice(0, 3);

  return (
    <section className="section news" id="actualidades">
      <div className="container news__head">
        <div>
          <h2 className="h2">Actualidades</h2>
          <p className="kicker">Avisos y noticias del municipio</p>
        </div>
        <a href="#actualidades" className="btn btn--ghost">Todas las noticias</a>
      </div>

      <div className="container news__grid">
        <article className="news__featured">
          <div
            className={`news__featured-media${featured.image ? "" : " tone-2"}`}
            style={featured.image ? { backgroundImage: `url(${asset(featured.image)})` } : undefined}
            aria-hidden="true"
          />
          <div className="news__featured-body">
            <span className="news__cat">{featured.category}</span>
            <h3>{featured.title}</h3>
            <p className="news__date">{featured.date}</p>
            <p className="news__excerpt">{featured.excerpt}</p>
            <a href={featured.link || "#actualidades"} className="link-arrow">Leer la nota <Icon name="arrowRight" size={17} /></a>
          </div>
        </article>

        <ul className="news__list">
          {rest.map((n) => (
            <li className="news__item" key={n.id}>
              <span className="news__cat news__cat--sm">{n.category}</span>
              <h4>{n.title}</h4>
              <p className="news__date">{n.date}</p>
              <p className="news__excerpt">{n.excerpt}</p>
              <a href={n.link || "#actualidades"} className="link-arrow link-arrow--sm">Leer la nota <Icon name="arrowRight" size={15} /></a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
