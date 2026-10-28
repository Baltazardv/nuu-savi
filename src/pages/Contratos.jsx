import { useEffect, useMemo, useState } from "react";
import PageHero from "../components/PageHero.jsx";
import { contracts as fallbackContracts } from "../data/contracts.js";
import { getContratos } from "../lib/wp.js";
import Icon from "../components/Icons.jsx";
import { asset } from "../lib/asset.js";

export default function Contratos() {
  const [list, setList] = useState(fallbackContracts);
  const [q, setQ] = useState("");

  useEffect(() => {
    let alive = true;
    getContratos(200).then((d) => {
      if (!alive || !d || !d.length) return;
      // Fusiona los del CMS con la relación base, sin duplicar por folio.
      const byId = new Map(fallbackContracts.map((c) => [c.id, c]));
      d.forEach((c) => { if (c.id) byId.set(c.id, c); });
      setList([...byId.values()].sort((a, b) => a.id.localeCompare(b.id)));
    });
    return () => { alive = false; };
  }, []);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return list;
    return list.filter((c) => c.id.includes(t) || (c.label || "").toLowerCase().includes(t));
  }, [list, q]);

  return (
    <>
      <PageHero
        title="Contratos de Obras Públicas"
        subtitle="Cada contrato incluye su documento y la relación de insumos correspondiente, en formato PDF descargable."
        crumbs={[{ label: "Inicio", to: "/" }, { label: "Transparencia", to: "/transparencia" }, { label: "Contratos" }]}
      />
      <section className="section">
        <div className="container">
          <div className="list-toolbar">
            <p className="list-toolbar__count"><Icon name="doc" size={18} /> {filtered.length} contrato{filtered.length === 1 ? "" : "s"}</p>
            <div className="search-box">
              <Icon name="search" size={16} />
              <input
                type="search"
                placeholder="Buscar por número de contrato…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                aria-label="Buscar contrato"
              />
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="contracts">
              {filtered.map((c) => (
                <article className="contract" key={c.id}>
                  <div>
                    <div className="contract__id">Contrato {c.id}</div>
                    <div className="contract__label">{c.label}</div>
                  </div>
                  <div className="contract__docs">
                    <a className="doc-btn" href={asset(c.contrato)} target="_blank" rel="noopener noreferrer"><Icon name="download" size={14} /> Contrato</a>
                    <a className="doc-btn" href={asset(c.insumos)} target="_blank" rel="noopener noreferrer"><Icon name="download" size={14} /> Insumos</a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="pending" style={{ marginBottom: "2rem" }}>
              <h3 className="pending__title"><Icon name="info" size={20} /> Sin resultados</h3>
              <p className="pending__lead">No se encontraron contratos que coincidan con «{q}».</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
