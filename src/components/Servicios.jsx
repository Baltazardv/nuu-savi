import { Link } from "react-router-dom";
import { services } from "../data/services.js";
import Icon from "./Icons.jsx";

function CardInner({ s }) {
  return (
    <>
      <span className="service__icon" style={{ color: s.color, background: `${s.color}18` }}>
        <Icon name={s.icon} size={26} />
      </span>
      <div className="service__body">
        <h3 className="service__title">
          {s.title}
          {s.official && <span className="service__gob">gob.mx</span>}
        </h3>
        <p className="service__desc">{s.desc}</p>
      </div>
      {s.badge ? (
        <span className="service__badge">{s.badge}</span>
      ) : (
        <span className="service__cta" style={{ color: s.color }}>
          {s.cta} {s.href ? <Icon name="external" size={15} /> : <Icon name="arrowRight" size={15} />}
        </span>
      )}
    </>
  );
}

export default function Servicios() {
  return (
    <section className="section servicios" id="servicios">
      <div className="container">
        <div className="section-head--center" style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <p className="kicker">Trámites y servicios</p>
          <h2 className="h2">Ventanilla digital</h2>
          <p className="section-sub" style={{ maxWidth: "58ch", margin: "1rem auto 0", color: "var(--ink-soft)" }}>
            Realiza tus trámites de forma rápida. Los enlaces de CURP y Acta de Nacimiento te
            llevan al sitio oficial del Gobierno de México.
          </p>
        </div>

        <div className="servicios__grid">
          {services.map((s) => {
            const style = { borderTopColor: s.color };
            if (s.href) {
              return (
                <a key={s.title} className="service" style={style} href={s.href} target="_blank" rel="noopener noreferrer">
                  <CardInner s={s} />
                </a>
              );
            }
            if (s.to) {
              return (
                <Link key={s.title} className="service" style={style} to={s.to}>
                  <CardInner s={s} />
                </Link>
              );
            }
            return (
              <div key={s.title} className="service service--static" style={style}>
                <CardInner s={s} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
