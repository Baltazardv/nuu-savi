import { useState } from "react";
import QuickAccess from "./QuickAccess.jsx";
import Icon from "./Icons.jsx";

export default function Hero() {
  const [q, setQ] = useState("");

  const onSearch = (e) => {
    e.preventDefault();
    // Punto de enganche para una búsqueda futura del sitio.
  };

  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden="true">
        {/* Foto real de la comunidad; el paisaje SVG queda de respaldo debajo. */}
        <img className="hero__photo" src="/assets/fotos/hero-comunidad.jpg" alt="" loading="eager" />
        <svg className="hero__scene" viewBox="0 0 1440 620" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#bfe3df" />
              <stop offset="0.55" stopColor="#8fc8c2" />
              <stop offset="1" stopColor="#5aa89f" />
            </linearGradient>
          </defs>
          <rect width="1440" height="620" fill="url(#sky)" />
          <path d="M0 380 L220 300 L430 380 L650 290 L880 390 L1120 300 L1440 390 L1440 620 L0 620 Z" fill="#2f7169" opacity="0.75" />
          <path d="M0 470 L260 380 L520 470 L800 370 L1080 470 L1320 400 L1440 460 L1440 620 L0 620 Z" fill="#1c5b53" />
          <path d="M0 560 L300 480 L640 560 L960 470 L1280 560 L1440 520 L1440 620 L0 620 Z" fill="#124a43" />
        </svg>
        <div className="hero__overlay" />
        <div className="hero__rain" />
      </div>

      <div className="container hero__content">
        <p className="hero__eyebrow">Comunidad de</p>
        <h1 className="hero__title">Ñuu Savi</h1>
        <p className="hero__sub">Pueblo de la lluvia · Guerrero, México</p>

        <form className="hero__search" onSubmit={onSearch} role="search">
          <input
            type="search"
            placeholder="¿Qué buscas en el sitio?"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Buscar en el sitio"
          />
          <button type="submit" aria-label="Buscar">
            <Icon name="search" size={20} />
          </button>
        </form>

        <QuickAccess />
      </div>

      {/* Greca recta adherida al borde inferior de la foto + medallón central */}
      <div className="hero__band" aria-hidden="true" />
      <span className="hero__medallion" aria-hidden="true">
        <img src="/assets/fotos/medallon.png" alt="" />
      </span>
    </section>
  );
}
