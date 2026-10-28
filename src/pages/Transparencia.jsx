import { useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import Icon from "../components/Icons.jsx";
import VisitCounter from "../components/VisitCounter.jsx";
import { transparenciaLinks } from "../data/site.js";
import { obligacionesPorAnio, aniosObligaciones, informes } from "../data/transparencia.js";
import { asset } from "../lib/asset.js";

// Información que el municipio proporcionará para completar el apartado (punto 9).
const pendientes = [
  "Directorio de servidores públicos y remuneraciones",
  "Presupuesto asignado y ejercido por ejercicio",
  "Padrón de proveedores y contratistas",
  "Datos de la Unidad de Transparencia (titular y contacto)",
];

function NoProporcionada({ texto = "Información no proporcionada" }) {
  return (
    <p className="no-data"><Icon name="info" size={16} /> {texto}</p>
  );
}

export default function Transparencia() {
  const [anio, setAnio] = useState(aniosObligaciones[0]);
  const [informeKey, setInformeKey] = useState(informes[0].key);

  const leyes = obligacionesPorAnio[anio];
  const informe = informes.find((i) => i.key === informeKey) || informes[0];

  return (
    <>
      <PageHero
        title="Transparencia y Acceso a la Información Pública"
        subtitle="El Municipio de Ñuu Savi pone a disposición de la ciudadanía la información que garantiza el derecho de acceso a la información pública y la rendición de cuentas."
        crumbs={[{ label: "Inicio", to: "/" }, { label: "Transparencia" }]}
      />
      <section className="section">
        <div className="container">
          <p className="welcome-line">Bienvenidos al portal de Transparencia del Ayuntamiento de Ñuu Savi.</p>

          {/* Plan Municipal de Desarrollo (documento rector) */}
          <div className="pmd">
            <span className="pmd__icon"><Icon name="doc" size={32} /></span>
            <div className="pmd__body">
              <h2 className="pmd__title">Plan Municipal de Desarrollo 2024–2027</h2>
              <p className="pmd__desc">Documento rector de la planeación del municipio de Ñuu Savi. Consúltalo o descárgalo en formato PDF.</p>
              <a className="btn btn--solid" href={asset("/assets/PMD-Nuu-Savi-2024-2027.pdf")} target="_blank" rel="noopener noreferrer">
                <Icon name="doc" size={17} /> Ver el Plan Municipal de Desarrollo <Icon name="external" size={15} />
              </a>
            </div>
          </div>

          <div className="cards cards--3" style={{ marginBottom: "3rem" }}>
            <Link to="/contratos" className="card">
              <span className="card__icon"><Icon name="doc" size={26} /></span>
              <h3 className="card__title">Contratos de Obras Públicas</h3>
              <p className="card__text">Consulta el listado de contratos de obra pública del municipio con sus documentos e insumos.</p>
              <span className="card__link">Ver contratos →</span>
            </Link>
            <div className="card">
              <span className="card__icon"><Icon name="shield" size={26} /></span>
              <h3 className="card__title">Obligaciones de Transparencia</h3>
              <p className="card__text">Aplicabilidad de las obligaciones comunes y específicas por ejercicio, conforme a la normatividad vigente.</p>
              <span className="card__badge">Ver abajo por año</span>
            </div>
            <div className="card">
              <span className="card__icon"><Icon name="people" size={26} /></span>
              <h3 className="card__title">Solicitudes de Información</h3>
              <p className="card__text">Ejerce tu derecho de acceso a la información ante la Unidad de Transparencia del municipio.</p>
              <span className="card__badge">Enlace por definir</span>
            </div>
          </div>

          {/* Obligaciones de Transparencia — selector por ejercicio fiscal */}
          <h2 className="h2" id="obligaciones">Obligaciones de Transparencia Comunes y Específicas</h2>
          <p className="section-sub" style={{ marginBottom: "1.4rem" }}>
            Selecciona el ejercicio fiscal para consultar la información disponible, organizada por ley aplicable.
          </p>

          <div className="year-select">
            <label htmlFor="anio-obligaciones"><Icon name="calendar" size={18} /> Ejercicio fiscal</label>
            <select id="anio-obligaciones" value={anio} onChange={(e) => setAnio(Number(e.target.value))}>
              {aniosObligaciones.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          <div className="obliga">
            {!leyes ? (
              <NoProporcionada texto={`Información no proporcionada para el ejercicio ${anio}.`} />
            ) : (
              leyes.map((l) => (
                <div className="obliga__ley" key={l.ley}>
                  <h3 className="obliga__ley-title"><Icon name="shield" size={18} /> {l.ley}</h3>
                  {l.docs.length === 0 ? (
                    <NoProporcionada />
                  ) : (
                    <ul className="doc-list">
                      {l.docs.map((d) => (
                        <li key={d.file}>
                          <a href={asset(d.file)} target="_blank" rel="noopener noreferrer">
                            <Icon name="doc" size={16} /> <span>{d.label}</span>
                            <Icon name="external" size={13} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Informes de Rendición de Cuentas */}
          <h2 className="h2" id="informes" style={{ marginTop: "3.2rem" }}>Informes de Rendición de Cuentas</h2>
          <p className="section-sub" style={{ marginBottom: "1.4rem" }}>
            Informes de gobierno del Ayuntamiento de Ñuu Savi 2024–2027.
          </p>

          <div className="year-select">
            <label htmlFor="informe-sel"><Icon name="doc" size={18} /> Informe</label>
            <select id="informe-sel" value={informeKey} onChange={(e) => setInformeKey(e.target.value)}>
              {informes.map((i) => (
                <option key={i.key} value={i.key}>{i.label}{!i.aplica ? " (No aplica)" : ""}</option>
              ))}
            </select>
          </div>

          <div className="informe-card">
            <span className="informe-card__icon"><Icon name="doc" size={30} /></span>
            <div className="informe-card__body">
              <h3 className="informe-card__title">{informe.label}</h3>
              {informe.aplica ? (
                <a className="btn btn--solid" href={asset(informe.file)} target="_blank" rel="noopener noreferrer">
                  <Icon name="doc" size={16} /> Ver informe <Icon name="external" size={14} />
                </a>
              ) : (
                <NoProporcionada texto="No aplica para este periodo." />
              )}
            </div>
          </div>

          {/* Punto 8: plataformas oficiales de transparencia nacional y estatal */}
          <h2 className="h2" style={{ marginTop: "3.2rem" }}>Plataformas oficiales de transparencia</h2>
          <p className="section-sub" style={{ marginBottom: "1.6rem" }}>
            Consulta y realiza solicitudes de información en las plataformas oficiales a nivel nacional y estatal.
          </p>
          <div className="cards cards--2" style={{ marginBottom: "3rem" }}>
            {transparenciaLinks.map((p) => (
              <a key={p.href} className="card card--plat" href={p.href} target="_blank" rel="noopener noreferrer">
                <span className="card__scope">{p.scope}</span>
                {p.logo ? (
                  <span className="card__logo"><img src={asset(p.logo)} alt={p.label} loading="lazy" /></span>
                ) : (
                  <span className="card__icon"><Icon name="shield" size={26} /></span>
                )}
                <h3 className="card__title">{p.label}</h3>
                <p className="card__text">{p.desc}</p>
                <span className="card__link">Ir a la plataforma <Icon name="external" size={14} /></span>
              </a>
            ))}
          </div>

          {/* Punto 10: contador de visitas semanal y mensual */}
          <VisitCounter />

          {/* Punto 9: información pendiente de proporcionar por el municipio */}
          <div className="pending" style={{ marginTop: "3rem" }}>
            <h3 className="pending__title"><Icon name="clock" size={20} /> Información en proceso de integración</h3>
            <p className="pending__lead">El municipio proporcionará la siguiente información para completar este apartado:</p>
            <ul className="pending__list">
              {pendientes.map((p) => (
                <li key={p}><Icon name="doc" size={16} /> {p}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
