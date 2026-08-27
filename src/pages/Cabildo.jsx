import { useEffect, useState } from "react";
import PageHero from "../components/PageHero.jsx";
import { officials, initialsOf } from "../data/officials.js";
import Icon from "../components/Icons.jsx";

function OfficialModal({ member, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!member) return null;

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={`Semblanza de ${member.name}`} onClick={onClose}>
      <div className="modal__panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Cerrar">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        <div className="modal__grid">
          <div className="modal__photo">
            {member.photo ? (
              <img src={member.photo} alt={member.name} />
            ) : (
              <div className="modal__initials">{initialsOf(member.name)}</div>
            )}
          </div>
          <div className="modal__body">
            <span className="official__role">{member.role}</span>
            <h2 className="modal__name">{member.name}</h2>
            <p className="modal__title">{member.title}</p>

            <h3 className="modal__h3"><Icon name="spark" size={17} /> Formación académica</h3>
            <p>{member.formacion}</p>

            <h3 className="modal__h3"><Icon name="hands" size={17} /> Trayectoria comunitaria</h3>
            <ul className="modal__list">
              {member.comunitarios.map((c, i) => <li key={i}>{c}</li>)}
            </ul>

            <h3 className="modal__h3"><Icon name="shield" size={17} /> Comisiones en el cabildo</h3>
            <ul className="modal__tags">
              {member.comisiones.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Cabildo() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <PageHero
        title="Nuestro Cabildo"
        subtitle="Servidoras y servidores públicos que integran el H. Ayuntamiento del Municipio de Ñuu Savi, periodo 2024–2027, bajo el Sistema Normativo Propio de Usos y Costumbres."
        crumbs={[{ label: "Inicio", to: "/" }, { label: "Cabildo" }]}
      />

      <section className="section" style={{ paddingBottom: "1rem" }}>
        <div className="container">
          <figure className="cabildo-group">
            <img src="/assets/fotos/cabildo-grupo.jpg" alt="Integrantes del Cabildo de Ñuu Savi 2024–2027" />
            <figcaption>Instalación del H. Ayuntamiento de Ñuu Savi · Periodo 2024–2027</figcaption>
          </figure>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "2rem" }}>
        <div className="container">
          <div className="officials">
            {officials.map((o) => (
              <article
                className="official official--clickable"
                key={o.slug}
                onClick={() => setSelected(o)}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setSelected(o))}
              >
                <div className="official__photo" data-initial={initialsOf(o.name)}>
                  {o.photo && <img src={o.photo} alt={o.name} loading="lazy" />}
                </div>
                <div className="official__body">
                  <span className="official__role">{o.role}</span>
                  <h3 className="official__name">{o.name}</h3>
                  <p className="official__sub">{o.title}</p>
                  <span className="official__more">Ver semblanza <Icon name="arrowRight" size={15} /></span>
                </div>
              </article>
            ))}
          </div>

          <div className="callout">
            <Icon name="info" size={22} />
            <span>La fotografía del regidor <strong>Felipe García Camilo</strong> se incorporará cuando el municipio la proporcione. Da clic en cada integrante para ver su semblanza completa.</span>
          </div>
        </div>
      </section>

      {selected && <OfficialModal member={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
