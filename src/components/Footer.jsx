import { Link } from "react-router-dom";
import { site, nav, emergency } from "../data/site.js";
import { GUERRERO_PATH, GUERRERO_PIN, GUERRERO_VIEWBOX } from "../data/guerrero.js";
import { asset } from "../lib/asset.js";
import Icon from "./Icons.jsx";

export default function Footer() {
  const year = new Date().getFullYear();
  const grecaStyle = { backgroundImage: `url(${asset("/assets/fotos/greca.png")})` };

  return (
    <footer className="footer">
      <div className="footer__greca" aria-hidden="true" />

      {/* Números de emergencia (24 h) — tarjeta sobre fondo claro */}
      <div className="emergency-band">
        <div className="container">
          <div className="emergency">
            <div className="emergency__head">
              <span className="emergency__icon"><Icon name="warning" size={30} /></span>
              <div className="emergency__headtext">
                <strong>Números de emergencia</strong>
                <span>Atención 24 horas, los 7 días de la semana</span>
                <span className="emergency__tag">Tu seguridad es prioridad</span>
              </div>
            </div>
            <ul className="emergency__list">
              {emergency.map((e) => (
                <li key={e.label} className="emergency__item">
                  <span className="emergency__label"><Icon name={e.icon} size={16} /> {e.label}</span>
                  {e.href ? (
                    <a href={e.href} className="emergency__phone"><Icon name="phone" size={16} /> {e.phone}</a>
                  ) : (
                    <span className="emergency__phone emergency__phone--pending">{e.phone}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Cuerpo principal (oscuro) */}
      <div className="footer__main">
        <div className="container footer__grid">
          <div className="footer__brand">
            <img src={asset("/assets/escudo-ayuntamiento.png")} alt="Escudo del Ayuntamiento de Ñuu Savi" />
            <p className="footer__motto">Por nuestra identidad,<br />historia y progreso.</p>
            <span className="footer__diamonds" aria-hidden="true">◆ ◆ ◆</span>
            <p className="footer__social-label">Síguenos en redes sociales</p>
            <div className="footer__social">
              <a href={site.facebook} target="_blank" rel="noopener" aria-label="Facebook"><Icon name="facebook" size={18} /></a>
              <a href={site.facebook} target="_blank" rel="noopener" aria-label="YouTube"><Icon name="youtube" size={18} /></a>
            </div>
          </div>

          <div className="footer__col">
            <h4>Municipio</h4>
            <nav className="footer__links">
              {nav.map((n) => (
                <Link key={n.to} to={n.to}><Icon name="chevronRight" size={13} /> {n.label}</Link>
              ))}
            </nav>
          </div>

          <div className="footer__col footer__contact">
            <h4>Contacto</h4>
            <p className="footer__contact-item">
              <Icon name="marker" size={16} />
              <span>{site.address.line1}<br />{site.address.line2}</span>
            </p>
            <a className="footer__contact-item" href={site.phoneHref}>
              <Icon name="phone" size={16} /> <span>{site.phone}</span>
            </a>
            <a className="footer__contact-item" href={`mailto:${site.email}`}>
              <Icon name="mail" size={16} /> <span>{site.email}</span>
            </a>
            <div className="footer__contact-divider" />
            <p className="footer__hours-title"><Icon name="clock" size={16} /> Horarios de atención</p>
            {site.hours.map((h, i) => (<p key={i} className="footer__hours">{h}</p>))}
          </div>

          <div className="footer__locator">
            <h4>¿Dónde estamos?</h4>
            <div className="footer__map">
              <svg viewBox={GUERRERO_VIEWBOX} preserveAspectRatio="xMidYMid meet" role="img" aria-label="Ubicación de Ñuu Savi en el estado de Guerrero">
                <path className="footer__mx" d={GUERRERO_PATH} />
                <g className="footer__pin">
                  <circle cx={GUERRERO_PIN.x} cy={GUERRERO_PIN.y} r="15" />
                  <circle cx={GUERRERO_PIN.x} cy={GUERRERO_PIN.y} r="28" className="footer__pin-halo" />
                </g>
              </svg>
              <span className="footer__here"><Icon name="marker" size={15} /> <span><strong>Ñuu Savi</strong><br />Guerrero, México</span></span>
            </div>
          </div>
        </div>

        {/* Greca tejida decorativa */}
        <div className="footer__greca-band" aria-hidden="true" style={grecaStyle} />

        <div className="footer__bottom">
          <div className="container">
            © {year} H. Ayuntamiento de Ñuu Savi, Guerrero. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
