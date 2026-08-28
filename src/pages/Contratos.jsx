import PageHero from "../components/PageHero.jsx";
import { contracts } from "../data/contracts.js";
import Icon from "../components/Icons.jsx";
import { asset } from "../lib/asset.js";

export default function Contratos() {
  return (
    <>
      <PageHero
        title="Contratos de Obras Públicas"
        subtitle="Cada contrato incluye su documento y la relación de insumos correspondiente, en formato PDF descargable."
        crumbs={[{ label: "Inicio", to: "/" }, { label: "Transparencia", to: "/transparencia" }, { label: "Contratos" }]}
      />
      <section className="section">
        <div className="container">
          <div className="contracts">
            {contracts.map((c) => (
              <article className="contract" key={c.id}>
                <div>
                  <div className="contract__id">Contrato {c.id}</div>
                  <div className="contract__label">{c.label}</div>
                </div>
                <div className="contract__docs">
                  <a className="doc-btn" href={asset(c.contrato)}><Icon name="download" size={14} /> Contrato</a>
                  <a className="doc-btn" href={asset(c.insumos)}><Icon name="download" size={14} /> Insumos</a>
                </div>
              </article>
            ))}
          </div>

          <div className="callout">
            <Icon name="info" size={22} />
            <span>Los archivos PDF de cada contrato e insumos se migrarán a <strong>public/assets/contratos/</strong> con el material del sitio actual. Mientras tanto, los enlaces apuntan a la ruta prevista de cada documento.</span>
          </div>
        </div>
      </section>
    </>
  );
}
