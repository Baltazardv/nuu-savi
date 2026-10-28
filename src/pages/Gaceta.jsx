import { useMemo, useState } from "react";
import PageHero from "../components/PageHero.jsx";
import Icon from "../components/Icons.jsx";
import { asset } from "../lib/asset.js";
import { gaceta } from "../data/gaceta.js";

export default function Gaceta() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return gaceta;
    return gaceta.filter((g) => g.title.toLowerCase().includes(t) || String(g.num).includes(t));
  }, [q]);

  return (
    <>
      <PageHero
        title="Gaceta Municipal"
        subtitle="Publicaciones oficiales, acuerdos, reglamentos y documentos del H. Ayuntamiento de Ñuu Savi."
        crumbs={[{ label: "Inicio", to: "/" }, { label: "Gaceta Municipal" }]}
      />
      <section className="section">
        <div className="container">
          <div className="list-toolbar">
            <p className="list-toolbar__count"><Icon name="doc" size={18} /> {filtered.length} publicacion{filtered.length === 1 ? "" : "es"}</p>
            <div className="search-box">
              <Icon name="search" size={16} />
              <input
                type="search"
                placeholder="Buscar publicación…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                aria-label="Buscar publicación en la gaceta"
              />
            </div>
          </div>

          {filtered.length > 0 ? (
            <ul className="gaceta-list">
              {filtered.map((g) => (
                <li key={g.num}>
                  <a className="gaceta-item" href={asset(g.file)} target="_blank" rel="noopener noreferrer">
                    <span className="gaceta-item__num">{String(g.num).padStart(2, "0")}</span>
                    <span className="gaceta-item__title">{g.title}</span>
                    <span className="gaceta-item__dl"><Icon name="download" size={16} /></span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="pending" style={{ marginBottom: "2rem" }}>
              <h3 className="pending__title"><Icon name="info" size={20} /> Sin resultados</h3>
              <p className="pending__lead">No se encontraron publicaciones que coincidan con «{q}».</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
