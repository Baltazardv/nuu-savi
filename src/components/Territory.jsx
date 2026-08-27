import { Link } from "react-router-dom";
import Icon from "./Icons.jsx";

const regions = [
  { id: "a", name: "Coapinola (cabecera)", d: "M40,92 L152,70 L164,152 L58,172 Z" },
  { id: "b", name: "Zona norte", d: "M152,70 L252,82 L256,160 L164,152 Z" },
  { id: "c", name: "Zona oriente", d: "M252,82 L352,112 L340,192 L256,160 Z" },
  { id: "d", name: "Zona poniente", d: "M58,172 L164,152 L178,262 L80,276 Z" },
  { id: "e", name: "Zona centro-sur", d: "M164,152 L256,160 L266,256 L178,262 Z" },
  { id: "f", name: "Zona sur", d: "M256,160 L340,192 L330,272 L266,256 Z" },
];

export default function Territory() {
  return (
    <section className="section territory" id="territorio">
      <div className="container territory__grid">
        <div className="territory__text">
          <h2 className="h2">Explora el territorio</h2>
          <p className="kicker">Tu mapa interactivo</p>
          <p>
            Localiza en un clic los equipamientos, servicios y lugares clave del municipio de
            Ñuu Savi.
          </p>
          <p>
            El mapa interactivo permite recorrer las comunidades, ubicar los edificios públicos,
            los centros de salud, las escuelas y los espacios culturales del territorio.
          </p>
          <p>Una herramienta simple y práctica para conocer mejor tu municipio día a día.</p>
          <Link to="/historia" className="btn btn--solid">
            Ver el mapa interactivo
            <Icon name="arrowRight" size={18} />
          </Link>
        </div>

        <div className="territory__mapwrap">
          <svg className="territory__map" viewBox="0 0 400 340" role="img" aria-label="Mapa estilizado del territorio de Ñuu Savi">
            <g className="territory__regions">
              {regions.map((r) => (
                <path key={r.id} className="region" d={r.d}>
                  <title>{r.name}</title>
                </path>
              ))}
            </g>
            {/* Marcador de la cabecera municipal */}
            <g className="territory__pin" transform="translate(96,120)">
              <path d="M0,-22 C10,-22 16,-14 16,-6 C16,6 0,20 0,20 C0,20 -16,6 -16,-6 C-16,-14 -10,-22 0,-22 Z" />
              <circle cx="0" cy="-6" r="5.5" className="territory__pin-dot" />
            </g>
          </svg>
          <p className="territory__note">Mapa ilustrativo · se sustituirá por la cartografía oficial del municipio.</p>
        </div>
      </div>
    </section>
  );
}
