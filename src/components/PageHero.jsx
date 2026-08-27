import { Link } from "react-router-dom";
import Wave from "./Wave.jsx";

// Encabezado de subpágina con migas y ola. `crumbs` = [{label, to?}], último sin `to`.
export default function PageHero({ title, subtitle, crumbs = [] }) {
  return (
    <section className="page-hero">
      <div className="page-hero__scene" aria-hidden="true" />
      <div className="container page-hero__content">
        {crumbs.length > 0 && (
          <nav className="breadcrumb" aria-label="Ruta de navegación">
            {crumbs.map((c, i) => (
              <span key={i}>
                {c.to ? <Link to={c.to}>{c.label}</Link> : <span className="breadcrumb__current">{c.label}</span>}
                {i < crumbs.length - 1 && <span className="breadcrumb__sep">/</span>}
              </span>
            ))}
          </nav>
        )}
        <h1 className="page-hero__title">{title}</h1>
        {subtitle && <p className="page-hero__sub">{subtitle}</p>}
      </div>
      <Wave color="#ffffff" className="page-hero__wave" />
    </section>
  );
}
