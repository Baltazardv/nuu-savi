import { useEffect, useState } from "react";
import { site } from "../data/site.js";
import { fbPosts, fbHighlights } from "../data/facebook.js";
import { asset } from "../lib/asset.js";
import Icon from "./Icons.jsx";

// URL numérica de la página (renderiza mejor en el Page Plugin que la URL "/people/...").
const PAGE_URL = "https://www.facebook.com/61550486085759";

// Tarjeta de diseño propia — respaldo si el widget de Facebook no carga.
function FbDesignCard({ fb }) {
  const imgProps = (p) => ({
    src: asset(p.img),
    alt: p.title,
    loading: "lazy",
    onError: (e) => {
      const el = e.currentTarget;
      if (p.fallback && !el.dataset.fb) { el.dataset.fb = "1"; el.src = asset(p.fallback); }
      else el.style.visibility = "hidden";
    },
  });
  return (
    <div className="fb-card">
      <div className="fb-card__header">
        <img className="fb-card__avatar" src={asset("/assets/fotos/escudo-ayuntamiento.png")} alt="" />
        <div className="fb-card__id">
          <span className="fb-card__name">Municipio de Ñuu Savi
            <span className="fb-card__verified" title="Página verificada"><Icon name="check" size={11} /></span>
          </span>
          <span className="fb-card__meta">Página oficial de Facebook · Gobierno Municipal</span>
        </div>
        <a className="fb-card__follow" href={fb} target="_blank" rel="noopener"><Icon name="facebook" size={15} /> Seguir página</a>
      </div>
      <div className="fb-card__posts">
        {fbPosts.map((p) => (
          <a className="fb-post" key={p.title} href={fb} target="_blank" rel="noopener">
            <div className="fb-post__media"><img {...imgProps(p)} /></div>
            <div className="fb-post__body">
              <span className="fb-post__date"><Icon name="calendar" size={12} /> {p.date}</span>
              <h4>{p.title}</h4>
              <p>{p.excerpt}</p>
            </div>
            <div className="fb-post__stats">
              <span><Icon name="thumbsUp" size={14} /> {p.likes}</span>
              <span><Icon name="comment" size={14} /> {p.comments}</span>
              <span><Icon name="share" size={14} /> {p.shares}</span>
            </div>
          </a>
        ))}
      </div>
      <a className="fb-card__more" href={fb} target="_blank" rel="noopener">
        <Icon name="facebook" size={16} /> Ver más publicaciones en Facebook <Icon name="external" size={14} />
      </a>
    </div>
  );
}

export default function FacebookFeed() {
  const fb = site.facebook;
  const grecaStyle = { backgroundImage: `url(${asset("/assets/fotos/greca.png")})` };
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Si el widget no confirma carga en unos segundos (Facebook bloqueado), mostramos el respaldo.
  useEffect(() => {
    const t = window.setTimeout(() => { if (!loaded) setFailed(true); }, 6000);
    return () => window.clearTimeout(t);
  }, [loaded]);

  const pluginSrc =
    "https://www.facebook.com/plugins/page.php?href=" +
    encodeURIComponent(PAGE_URL) +
    "&tabs=timeline&width=500&height=640&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&lazy=true";

  return (
    <section className="section facebook" id="facebook">
      <div className="container facebook__grid">
        <div className="facebook__intro">
          <p className="kicker">Redes sociales</p>
          <h2 className="h2">Síguenos en Facebook</h2>
          <span className="facebook__greca" aria-hidden="true" style={grecaStyle} />
          <p>
            Mantente al día con las actividades, avisos y comunicados del H. Ayuntamiento de
            Ñuu Savi directamente desde nuestra página oficial de Facebook.
          </p>
          <a href={fb} target="_blank" rel="noopener" className="btn btn--solid facebook__btn">
            <Icon name="facebook" size={18} /> Ir a nuestra página <Icon name="arrowRight" size={17} />
          </a>
          <ul className="facebook__highlights">
            {fbHighlights.map((h) => (
              <li key={h.strong}>
                <span className="facebook__hl-icon"><Icon name={h.icon} size={18} /></span>
                <span><strong>{h.strong}</strong> {h.sub}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="facebook__feed">
          {!failed ? (
            <div className="facebook__plugin">
              <iframe
                title="Publicaciones de la página de Facebook del Municipio de Ñuu Savi"
                src={pluginSrc}
                width="500"
                height="640"
                style={{ border: "none", overflow: "hidden" }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                onLoad={() => setLoaded(true)}
                onError={() => setFailed(true)}
              />
            </div>
          ) : (
            <FbDesignCard fb={fb} />
          )}
        </div>
      </div>
    </section>
  );
}
