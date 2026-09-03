import Icon from "./Icons.jsx";
import { asset } from "../lib/asset.js";

// Mapa interactivo de Google (sin API key) centrado en la cabecera municipal.
const MAP_QUERY = "Coapinola, Guerrero, México";
const MAP_EMBED = "https://maps.google.com/maps?q=" + encodeURIComponent(MAP_QUERY) + "&z=12&hl=es&output=embed";
const MAP_LINK = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(MAP_QUERY);

// Categorías de puntos de interés del territorio.
const categories = [
  { key: "salud", label: "Salud", desc: "Centros de salud y hospitales", icon: "health", color: "#b5502f" },
  { key: "educacion", label: "Educación", desc: "Escuelas y centros educativos", icon: "book", color: "#2f8f86" },
  { key: "cultura", label: "Cultura", desc: "Espacios y centros culturales", icon: "culture", color: "#e6b23c" },
  { key: "servicios", label: "Servicios públicos", desc: "Edificios y oficinas municipales", icon: "landmark", color: "#14716a" },
  { key: "naturaleza", label: "Naturaleza", desc: "Cerros, ríos y áreas naturales", icon: "tree", color: "#5f8b4c" },
];

export default function Territory() {
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

          <a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className="btn btn--solid">
            Ver en Google Maps <Icon name="external" size={17} />
          </a>
        </div>

        <div className="territory__mapwrap">
          <span className="territory__dots" aria-hidden="true" />
          <span className="territory__leaf territory__leaf--1" aria-hidden="true"><Icon name="leaf" size={54} /></span>
          <span className="territory__leaf territory__leaf--2" aria-hidden="true"><Icon name="leaf" size={44} /></span>

          <figure className="territory__map-card">
            <iframe
              className="territory__map-frame"
              title="Mapa interactivo del Municipio de Ñuu Savi (Coapinola, Guerrero)"
              src={MAP_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </figure>
          <figcaption className="territory__note">Mapa interactivo · cabecera municipal de Coapinola, Guerrero. Arrastra y haz zoom para explorar.</figcaption>
        </div>
      </div>
    </section>
  );
}
