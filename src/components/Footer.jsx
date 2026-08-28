import { Link } from "react-router-dom";
import { site, nav } from "../data/site.js";
import { asset } from "../lib/asset.js";
import Icon from "./Icons.jsx";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer__greca" aria-hidden="true" />
      <div className="container footer__grid">
        <div className="footer__brand">
          <img src={asset("/assets/escudo-ayuntamiento.png")} alt="Escudo del Ayuntamiento de Ñuu Savi" />
          <p className="footer__motto">Por nuestra identidad,<br />historia y progreso.</p>
          <div className="footer__social">
            <a href={site.facebook} target="_blank" rel="noopener" aria-label="Facebook"><Icon name="facebook" size={18} /></a>
            <a href={site.facebook} target="_blank" rel="noopener" aria-label="YouTube"><Icon name="youtube" size={18} /></a>
          </div>
        </div>

        <div className="footer__col">
          <h4>Municipio</h4>
          {nav.map((n) => (
            <Link key={n.to} to={n.to}>{n.label}</Link>
          ))}
        </div>

        <div className="footer__col">
          <h4>Contacto</h4>
          <p>{site.address.line1}<br />{site.address.line2}</p>
          <a href={site.phoneHref}>{site.phone}</a>
          <p className="footer__hours-title">Horarios de atención</p>
          {site.hours.map((h, i) => (<p key={i} className="footer__hours">{h}</p>))}
        </div>

        <div className="footer__locator">
          <span className="footer__locator-title">¿Dónde estamos?</span>
          <div className="footer__map" aria-hidden="true">
            <svg viewBox="0 0 220 150" preserveAspectRatio="xMidYMid meet">
              <path
                className="footer__mx"
                d="M20,44 C34,36 52,40 66,34 C78,29 88,20 104,24 C116,27 120,40 134,44 C150,48 168,42 182,52 C196,62 200,78 190,92 C182,103 168,104 160,114 C153,123 152,136 142,138 C133,140 128,130 120,124 C110,117 98,120 90,112 C82,104 84,92 76,86 C66,78 50,82 40,74 C28,64 24,54 20,44 Z"
              />
              <g className="footer__pin">
                <circle cx="96" cy="104" r="5.5" />
                <circle cx="96" cy="104" r="11" className="footer__pin-halo" />
              </g>
            </svg>
            <span className="footer__here"><Icon name="marker" size={14} /> Ñuu Savi · Guerrero</span>
          </div>
        </div>
      </div>

      <div className="footer__bottom container">
        <span>© {year} Municipio de Ñuu Savi. Todos los derechos reservados.</span>
        <span>{site.domain}</span>
      </div>
    </footer>
  );
}
