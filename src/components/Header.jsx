import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { site, nav } from "../data/site.js";
import { asset } from "../lib/asset.js";
import Icon from "./Icons.jsx";

export default function Header({ transparentOnTop = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const overHero = transparentOnTop && !scrolled;

  return (
    <>
      <header className={`header${scrolled ? " is-scrolled" : ""}${overHero ? " is-over-hero" : ""}`}>
        <div className="header__bar container">
          <Link to="/" className="brand" aria-label={`Inicio — ${site.longName}`}>
            <img src={asset("/assets/escudo.png")} alt="Escudo de Ñuu Savi" className="brand__mark" />
            <span className="brand__text">
              <strong>Ñuu Savi</strong>
              <small>Gobierno Municipal · Guerrero</small>
            </span>
          </Link>

          <nav className="nav" aria-label="Navegación principal">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) => "nav__link" + (isActive ? " is-active" : "")}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="header__actions">
            <a href={site.phoneHref} className="pill-btn" aria-label={`Llamar ${site.phone}`}>
              <Icon name="phone" size={17} />
              <span>{site.phone}</span>
            </a>
            <button
              className={`nav-toggle${open ? " is-open" : ""}`}
              aria-label="Abrir menú"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
        <div className="header__greca" aria-hidden="true" />
      </header>

      <div className={`mobile-menu${open ? " is-open" : ""}`} aria-hidden={!open}>
        {nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) => (isActive ? "is-active" : "")}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </NavLink>
        ))}
        <a href={site.phoneHref} className="mobile-menu__phone" onClick={() => setOpen(false)}>
          Llamar · {site.phone}
        </a>
      </div>
    </>
  );
}
