import { Link } from "react-router-dom";
import Icon from "./Icons.jsx";

// Accesos rápidos del hero (sobre la foto). Cada uno con su barra de color.
const items = [
  { label: "Comunidad", to: "#actualidades", icon: "people", color: "#e0762e", anchor: true },
  { label: "Ubicación", to: "#territorio", icon: "marker", color: "#2f8f86", anchor: true },
  { label: "Servicios", to: "#capacitaciones", icon: "hands", color: "#d6457f", anchor: true },
  { label: "Gobierno", to: "/cabildo", icon: "building", color: "#e6b23c" },
  { label: "Trámites", to: "/transparencia", icon: "doc", color: "#7b5ea7" },
];

// Desplazamiento suave a una sección, compensando el header fijo.
function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top: y, behavior: "smooth" });
  history.replaceState(null, "", "#" + id);
}

export default function QuickAccess() {
  return (
    <nav className="quick" aria-label="Accesos rápidos">
      {items.map((it) => {
        const inner = (
          <>
            <span className="quick__icon"><Icon name={it.icon} size={28} /></span>
            <span className="quick__bar" style={{ background: it.color }} />
            <span className="quick__label">{it.label}</span>
          </>
        );
        return it.anchor ? (
          <a
            key={it.label}
            href={it.to}
            className="quick__item"
            onClick={(e) => { e.preventDefault(); scrollToId(it.to.slice(1)); }}
          >
            {inner}
          </a>
        ) : (
          <Link key={it.label} to={it.to} className="quick__item">{inner}</Link>
        );
      })}
    </nav>
  );
}
