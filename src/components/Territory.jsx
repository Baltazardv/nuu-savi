import { useState } from "react";
import Icon from "./Icons.jsx";
import { asset } from "../lib/asset.js";

// Mapa interactivo de Google (sin API key) centrado en la cabecera municipal.
const MAP_QUERY = "Coapinola, Guerrero, México";
const MAP_EMBED = "https://maps.google.com/maps?q=" + encodeURIComponent(MAP_QUERY) + "&z=12&hl=es&output=embed";
const MAP_LINK = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(MAP_QUERY);

// Capas del mapa: Ubicación (mapa interactivo) + cartografías oficiales del municipio.
const layers = [
  { key: "ubicacion", label: "Ubicación", icon: "marker", type: "map",
    note: "Mapa interactivo · cabecera municipal de Coapinola, Guerrero. Arrastra y haz zoom para explorar." },
  { key: "relieve", label: "Relieve", icon: "mountain", img: "/assets/fotos/cartografia/relieve.jpg",
    note: "Cartografía de relieve del municipio de Ñuu Savi." },
  { key: "clima", label: "Clima", icon: "cloudRain", img: "/assets/fotos/cartografia/clima.jpg",
    note: "Cartografía de clima del municipio de Ñuu Savi." },
  { key: "hidrologia", label: "Hidrología", icon: "drop", img: "/assets/fotos/cartografia/hidrologia.jpg",
    note: "Cartografía de hidrología del municipio de Ñuu Savi." },
  { key: "uso", label: "Uso de suelo y vegetación", icon: "leaf", img: "/assets/fotos/cartografia/uso-suelo-vegetacion.jpg",
    note: "Cartografía de uso de suelo y vegetación del municipio de Ñuu Savi." },
];

export default function Territory() {
  const [active, setActive] = useState("ubicacion");
  const layer = layers.find((l) => l.key === active) || layers[0];

  return (
    <section className="section territory" id="territorio">
      {/* Motivos de lluvia (Ñuu Savi = pueblo de la lluvia) */}
      <span className="territory__rain territory__rain--1" aria-hidden="true"><Icon name="cloudRain" size={38} /></span>
      <span className="territory__rain territory__rain--2" aria-hidden="true"><Icon name="cloudRain" size={30} /></span>

      <div className="container territory__grid">
        <div className="territory__text">
          <span className="territory__greca" aria-hidden="true" style={{ backgroundImage: `url(${asset("/assets/fotos/greca.png")})` }} />
          <h2 className="h2">Explora el territorio</h2>
          <p className="territory__kicker">Mapa y cartografía del municipio</p>
          <span className="territory__divider" aria-hidden="true" />

          <p className="territory__lead">
            Consulta la ubicación y la cartografía oficial del municipio de Ñuu Savi:
            relieve, clima, hidrología y uso de suelo y vegetación.
          </p>

          <ul className="territory__layers">
            {layers.map((l) => (
              <li key={l.key}>
                <button
                  type="button"
                  className={"territory__layer" + (active === l.key ? " is-active" : "")}
                  onClick={() => setActive(l.key)}
                  aria-pressed={active === l.key}
                >
                  <span className="territory__layer-icon"><Icon name={l.icon} size={18} /></span>
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          <a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className="btn btn--solid">
            Ver en Google Maps <Icon name="external" size={17} />
          </a>
        </div>

        <div className="territory__mapwrap">
          <span className="territory__dots" aria-hidden="true" />
          <span className="territory__leaf territory__leaf--1" aria-hidden="true"><Icon name="leaf" size={54} /></span>
          <span className="territory__leaf territory__leaf--2" aria-hidden="true"><Icon name="leaf" size={44} /></span>

          <figure className="territory__map-card">
            {layer.type === "map" ? (
              <iframe
                className="territory__map-frame"
                title="Mapa interactivo del Municipio de Ñuu Savi (Coapinola, Guerrero)"
                src={MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <a
                className="territory__map-imglink"
                href={asset(layer.img)}
                target="_blank"
                rel="noopener noreferrer"
                title="Ver la cartografía en tamaño completo"
              >
                <img
                  className="territory__map-img"
                  src={asset(layer.img)}
                  alt={`Cartografía: ${layer.label} — Municipio de Ñuu Savi`}
                  loading="lazy"
                />
                <span className="territory__map-expand"><Icon name="expand" size={16} /> Ampliar</span>
              </a>
            )}
          </figure>
          <figcaption className="territory__note">{layer.note}</figcaption>
        </div>
      </div>
    </section>
  );
}
