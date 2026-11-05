import { site } from "../data/site.js";
import { fbHighlights } from "../data/facebook.js";
import { asset } from "../lib/asset.js";
import Icon from "./Icons.jsx";

// El Page Plugin de Facebook solo incrusta Páginas clásicas; la página oficial del
// municipio es del tipo nuevo (perfil), que Facebook no permite embeber. Por eso
// mostramos una tarjeta propia con la identidad real + enlace a la página.
export default function FacebookFeed() {
  const fb = site.facebook;
  const grecaStyle = { backgroundImage: `url(${asset("/assets/fotos/greca.webp")})` };

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
          <div className="fb-page-card">
            <div
              className="fb-page-card__cover"
              style={{ backgroundImage: `url(${asset("/assets/fotos/hero-comunidad.webp")})` }}
              aria-hidden="true"
            />
            <div className="fb-page-card__body">
              <img className="fb-page-card__avatar" src={asset("/assets/escudo-ayuntamiento.webp")} alt="Escudo del Ayuntamiento de Ñuu Savi" />
              <h3 className="fb-page-card__name">
                H. Ayuntamiento de Ñuu Savi
                <span className="fb-card__verified" title="Página oficial"><Icon name="check" size={11} /></span>
              </h3>
              <p className="fb-page-card__meta">Página oficial · Gobierno Municipal 2024–2027</p>
              <p className="fb-page-card__desc">
                Publicamos avisos, eventos y comunicados oficiales. ¡Síguenos para estar al día
                con lo que pasa en el pueblo de la lluvia!
              </p>
              <a className="btn btn--solid fb-page-card__btn" href={fb} target="_blank" rel="noopener">
                <Icon name="facebook" size={18} /> Visitar nuestra página
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
