import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "./Icons.jsx";
import { asset } from "../lib/asset.js";

// Categorías de puntos de interés del territorio.
const categories = [
  { key: "salud", label: "Salud", desc: "Centros de salud y hospitales", icon: "health", color: "#b5502f" },
  { key: "educacion", label: "Educación", desc: "Escuelas y centros educativos", icon: "book", color: "#2f8f86" },
  { key: "cultura", label: "Cultura", desc: "Espacios y centros culturales", icon: "culture", color: "#e6b23c" },
  { key: "servicios", label: "Servicios públicos", desc: "Edificios y oficinas municipales", icon: "landmark", color: "#14716a" },
  { key: "naturaleza", label: "Naturaleza", desc: "Cerros, ríos y áreas naturales", icon: "tree", color: "#5f8b4c" },
];

// Pines de ejemplo sobre el mapa de respaldo (x,y en coordenadas del viewBox 500x380).
const pins = [
  { x: 205, y: 150, cat: "servicios" },
  { x: 285, y: 128, cat: "educacion" },
  { x: 245, y: 210, cat: "salud" },
  { x: 325, y: 188, cat: "cultura" },
  { x: 350, y: 258, cat: "naturaleza" },
  { x: 178, y: 232, cat: "educacion" },
];
const colorOf = (key) => (categories.find((c) => c.key === key) || {}).color || "#14716a";

export default function Territory() {
  const [hasMapImg, setHasMapImg] = useState(true);

  return (
    <section className="section territory" id="territorio">
      {/* Motivos de lluvia (Ñuu Savi = pueblo de la lluvia) */}
      <span className="territory__rain territory__rain--1" aria-hidden="true"><Icon name="cloudRain" size={38} /></span>
      <span className="territory__rain territory__rain--2" aria-hidden="true"><Icon name="cloudRain" size={30} /></span>

      <div className="container territory__grid">
        <div className="territory__text">
          <span className="territory__greca" aria-hidden="true" style={{ backgroundImage: `url(${asset("/assets/fotos/greca.png")})` }} />
          <h2 className="h2">Explora el territorio</h2>
          <p className="territory__kicker">Tu mapa interactivo</p>
          <span className="territory__divider" aria-hidden="true" />

          <p className="territory__lead">
            Localiza en un clic los equipamientos, servicios y lugares clave del municipio de
            Ñuu Savi.
          </p>

          <ul className="territory__legend">
            {categories.map((c) => (
              <li className="territory__cat" key={c.key}>
                <span className="territory__cat-icon" style={{ color: c.color, background: `${c.color}1a` }}>
                  <Icon name={c.icon} size={22} />
                </span>
                <span className="territory__cat-text">
                  <strong>{c.label}</strong>
                  <small>{c.desc}</small>
                </span>
              </li>
            ))}
          </ul>

          <Link to="/historia" className="btn btn--solid">
            Ver el mapa interactivo <Icon name="arrowRight" size={18} />
          </Link>
        </div>

        <div className="territory__mapwrap">
          <span className="territory__dots" aria-hidden="true" />
          <span className="territory__leaf territory__leaf--1" aria-hidden="true"><Icon name="leaf" size={54} /></span>
          <span className="territory__leaf territory__leaf--2" aria-hidden="true"><Icon name="leaf" size={44} /></span>

          <figure className="territory__map-card">
            {hasMapImg ? (
              <img
                src={asset("/assets/fotos/mapa-territorio.png")}
                alt="Mapa del territorio del Municipio de Ñuu Savi"
                onError={() => setHasMapImg(false)}
              />
            ) : (
              <svg className="territory__map-svg" viewBox="0 0 500 380" role="img" aria-label="Mapa ilustrativo del territorio de Ñuu Savi">
                <defs>
                  <linearGradient id="terr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#2f7169" />
                    <stop offset="1" stopColor="#124a43" />
                  </linearGradient>
                </defs>
                {/* Contorno del municipio */}
                <path d="M120 90 C180 58 300 60 362 96 C418 128 440 186 418 236 C402 280 348 312 288 322 C228 332 158 316 120 282 C86 252 72 192 88 146 C98 116 106 100 120 90 Z" fill="url(#terr)" stroke="#0e4f49" strokeWidth="3" />
                {/* Curvas de nivel (topográficas) */}
                <g fill="none" stroke="#ffffff" strokeOpacity="0.16" strokeWidth="1.4">
                  <path d="M150 130 C210 108 300 112 350 145 C392 172 402 214 384 250" />
                  <path d="M170 175 C220 158 300 162 340 190 C368 210 372 240 356 268" />
                  <path d="M195 220 C235 208 295 212 325 232" />
                </g>
                {/* Río */}
                <path d="M150 100 C176 150 214 176 232 226 C246 264 280 286 322 300" fill="none" stroke="#8fd0e0" strokeOpacity="0.7" strokeWidth="4" strokeLinecap="round" />
                {/* Pines por categoría */}
                {pins.map((p, i) => (
                  <g key={i} transform={`translate(${p.x},${p.y})`}>
                    <ellipse cx="0" cy="2" rx="9" ry="3" fill="rgba(0,0,0,.25)" />
                    <path d="M0 0 C-8 -10 -12 -15 -12 -21 A12 12 0 1 1 12 -21 C12 -15 8 -10 0 0 Z" fill={colorOf(p.cat)} stroke="#fff" strokeWidth="2" />
                    <circle cx="0" cy="-21" r="4.5" fill="#fff" />
                  </g>
                ))}
              </svg>
            )}
          </figure>
          <figcaption className="territory__note">Mapa ilustrativo · se sustituirá por la cartografía oficial del municipio.</figcaption>
        </div>
      </div>
    </section>
  );
}
