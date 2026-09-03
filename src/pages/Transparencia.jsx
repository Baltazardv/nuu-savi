import { Link } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import Icon from "../components/Icons.jsx";
import VisitCounter from "../components/VisitCounter.jsx";
import { transparenciaLinks } from "../data/site.js";

// Información que el municipio proporcionará para completar el apartado (punto 9).
const pendientes = [
  "Directorio de servidores públicos y remuneraciones",
  "Presupuesto asignado y ejercido por ejercicio",
  "Padrón de proveedores y contratistas",
  "Informes de gobierno y cuenta pública",
  "Datos de la Unidad de Transparencia (titular y contacto)",
];

const rows = [
  { label: "Marco normativo aplicable", years: [1, 1, 1, 1] },
  { label: "Estructura orgánica", years: [1, 1, 1, 1] },
  { label: "Facultades de cada área", years: [1, 1, 1, 1] },
  { label: "Remuneración del personal", years: [1, 1, 1, 0] },
  { label: "Contrataciones de obra pública", years: [1, 1, 1, 1] },
  { label: "Presupuesto asignado y ejercido", years: [1, 1, 1, 0] },
  { label: "Padrón de proveedores y contratistas", years: [1, 1, 1, 0] },
];

export default function Transparencia() {
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
              <span className="card__badge">Ver tabla abajo</span>
            </div>
            <div className="card">
              <span className="card__icon"><Icon name="people" size={26} /></span>
              <h3 className="card__title">Solicitudes de Información</h3>
              <p className="card__text">Ejerce tu derecho de acceso a la información ante la Unidad de Transparencia del municipio.</p>
              <span className="card__badge">Enlace por definir</span>
            </div>
          </div>

          <div className="table-wrap">
            <table className="data">
              <caption>Aplicabilidad de las obligaciones de Transparencia Comunes y Específicas</caption>
              <thead>
                <tr><th>Obligación / Fracción</th><th>2024</th><th>2023</th><th>2022</th><th>2021</th></tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.label}>
                    <td>{r.label}</td>
                    {r.years.map((y, i) => (
                      <td key={i}>{y ? <span className="tag-yes">Aplica</span> : <span className="tag-na">N/A</span>}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="callout">
            <Icon name="info" size={22} />
            <span>La tabla anterior reproduce la estructura del sitio actual. <strong>Debe validarse con la información oficial</strong> de la Unidad de Transparencia antes de publicarse, para confirmar qué obligaciones aplican en cada ejercicio (2021–2024).</span>
          </div>

          {/* Punto 8: plataformas oficiales de transparencia nacional y estatal */}
          <h2 className="h2" style={{ marginTop: "3.2rem" }}>Plataformas oficiales de transparencia</h2>
          <p className="section-sub" style={{ marginBottom: "1.6rem" }}>
            Consulta y realiza solicitudes de información en las plataformas oficiales a nivel nacional y estatal.
          </p>
          <div className="cards cards--2" style={{ marginBottom: "3rem" }}>
            {transparenciaLinks.map((p) => (
              <a key={p.href} className="card" href={p.href} target="_blank" rel="noopener noreferrer">
                <span className="card__scope">{p.scope}</span>
                <span className="card__icon"><Icon name="shield" size={26} /></span>
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
