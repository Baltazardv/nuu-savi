import { useEffect, useState } from "react";
import PageHero from "../components/PageHero.jsx";
import { contractYears, contractsByYear as fallbackByYear } from "../data/contracts.js";
import { getContratos } from "../lib/wp.js";
import Icon from "../components/Icons.jsx";
import { asset } from "../lib/asset.js";

export default function Contratos() {
  const [year, setYear] = useState(contractYears[0]);
  const [byYear, setByYear] = useState(fallbackByYear);

  useEffect(() => {
    let alive = true;
    getContratos(100).then((d) => {
      if (!alive || !d || !d.length) return;
      const grouped = {};
      contractYears.forEach((y) => { grouped[y] = []; });
      d.forEach((c) => { if (c.year && grouped[c.year]) grouped[c.year].push(c); });
      setByYear(grouped);
    });
    return () => { alive = false; };
  }, []);

  const list = byYear[year] || [];

  return (
    <>
      <PageHero
        title="Contratos de Obras Públicas"
        subtitle="Cada contrato incluye su documento y la relación de insumos correspondiente, en formato PDF descargable."
        crumbs={[{ label: "Inicio", to: "/" }, { label: "Transparencia", to: "/transparencia" }, { label: "Contratos" }]}
      />
      <section className="section">
        <div className="container">
          {/* Punto 11: contratos divididos por año (2024–2026) */}
          <div className="year-tabs" role="tablist" aria-label="Filtrar contratos por año">
            {contractYears.map((y) => {
              const count = (byYear[y] || []).length;
              return (
                <button
                  key={y}
                  role="tab"
                  aria-selected={year === y}
                  className={"year-tab" + (year === y ? " is-active" : "")}
                  onClick={() => setYear(y)}
                >
                  {y} <span className="year-tab__count">{count}</span>
                </button>
              );
            })}
          </div>

          {list.length > 0 ? (
            <div className="contracts">
              {list.map((c) => (
                <article className="contract" key={c.year + "-" + c.id}>
                  <div>
                    <div className="contract__id">Contrato {c.id} · {c.year}</div>
                    <div className="contract__label">{c.label}</div>
                  </div>
                  <div className="contract__docs">
                    <a className="doc-btn" href={asset(c.contrato)}><Icon name="download" size={14} /> Contrato</a>
                    <a className="doc-btn" href={asset(c.insumos)}><Icon name="download" size={14} /> Insumos</a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="pending" style={{ marginBottom: "2rem" }}>
              <h3 className="pending__title"><Icon name="clock" size={20} /> Contratos {year}</h3>
              <p className="pending__lead">Los contratos del ejercicio {year} se publicarán cuando el municipio los proporcione.</p>
            </div>
          )}

          <div className="callout">
            <Icon name="info" size={22} />
            <span>Los archivos PDF de cada contrato e insumos se colocarán en <strong>public/assets/contratos/{year}/</strong>. Mientras tanto, los enlaces apuntan a la ruta prevista de cada documento.</span>
          </div>
        </div>
      </section>
    </>
  );
}
