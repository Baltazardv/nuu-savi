import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchSite } from "../data/searchIndex.js";
import Icon from "./Icons.jsx";

export default function SiteSearch() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const rootRef = useRef(null);

  const results = searchSite(q);
  const showList = open && q.trim().length >= 2;

  // Cerrar al hacer clic fuera.
  useEffect(() => {
    const onDoc = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => setActive(0), [q]);

  // Navega a la sección/página y desplaza (compensando el header fijo).
  const go = (item) => {
    if (!item) return;
    setOpen(false);
    setQ("");
    const hashIdx = item.to.indexOf("#");
    const path = hashIdx >= 0 ? item.to.slice(0, hashIdx) || "/" : item.to;
    const hash = hashIdx >= 0 ? item.to.slice(hashIdx + 1) : "";
    navigate(path);
    if (hash) {
      window.setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
      }, 160);
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    go(results[active] || results[0]);
  };

  const onKeyDown = (e) => {
    if (!showList || !results.length) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === "Escape") setOpen(false);
  };

  return (
    <div className="hero__search-wrap" ref={rootRef}>
      <form className="hero__search" onSubmit={onSubmit} role="search" autoComplete="off">
        <input
          type="search"
          placeholder="¿Qué buscas en el sitio?"
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          aria-label="Buscar en el sitio"
          aria-expanded={showList}
          role="combobox"
          aria-controls="search-suggest"
        />
        <button type="submit" aria-label="Buscar">
          <Icon name="search" size={20} />
        </button>
      </form>

      {showList && (
        <ul className="search-suggest" id="search-suggest" role="listbox">
          {results.length ? (
            results.map((r, i) => (
              <li
                key={r.to + r.title}
                role="option"
                aria-selected={i === active}
                className={"search-suggest__item" + (i === active ? " is-active" : "")}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => { e.preventDefault(); go(r); }}
              >
                <Icon name="search" size={15} />
                <span className="search-suggest__title">{r.title}</span>
                <span className="search-suggest__badge">{r.section}</span>
              </li>
            ))
          ) : (
            <li className="search-suggest__empty">Sin resultados para “{q.trim()}”</li>
          )}
        </ul>
      )}
    </div>
  );
}
