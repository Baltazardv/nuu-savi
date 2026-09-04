import { Link } from "react-router-dom";
import { site, nav, emergency } from "../data/site.js";
import { GUERRERO_PATH, GUERRERO_PIN, GUERRERO_VIEWBOX } from "../data/guerrero.js";
import { asset } from "../lib/asset.js";
import Icon from "./Icons.jsx";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer__greca" aria-hidden="true" />

      {/* Punto 16: números de emergencia 24 horas */}
      <div className="emergency">
        <div className="container emergency__inner">
          <div className="emergency__head">
            <span className="emergency__icon"><Icon name="warning" size={22} /></span>
            <div>
              <strong>Números de emergencia</strong>
              <span>Atención 24 horas</span>
            </div>
          </div>
          <ul className="emergency__list">
            {emergency.map((e) => (
              <li key={e.label} className={"emergency__item" + (e.pending ? " is-pending" : "")}>
                <span className="emergency__label"><Icon name={e.icon} size={15} /> {e.label}</span>
                {e.href ? (
                  <a href={e.href} className="emergency__phone"><Icon name="phone" size={14} /> {e.phone}</a>
                ) : (
                  <span className="emergency__phone emergency__phone--pending">{e.phone}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

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
          <div className="footer__map">
            <svg viewBox={GUERRERO_VIEWBOX} preserveAspectRatio="xMidYMid meet" role="img" aria-label="Ubicación de Ñuu Savi en el estado de Guerrero">
              <path className="footer__mx" d={GUERRERO_PATH} />
              <g className="footer__pin">
                <circle cx={GUERRERO_PIN.x} cy={GUERRERO_PIN.y} r="15" />
                <circle cx={GUERRERO_PIN.x} cy={GUERRERO_PIN.y} r="28" className="footer__pin-halo" />
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
