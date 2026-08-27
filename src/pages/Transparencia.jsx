import { Link } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import Icon from "../components/Icons.jsx";

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
        </div>
      </section>
    </>
  );
}
