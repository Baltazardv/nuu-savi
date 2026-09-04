import { GUERRERO_PATH, GUERRERO_PIN, GUERRERO_VIEWBOX } from "../data/guerrero.js";

export default function GuerreroLocator() {
  return (
    <figure className="glocator">
      <div className="glocator__mapbox">
        <svg viewBox={GUERRERO_VIEWBOX} className="glocator__svg" role="img"
          aria-label="Ubicación del Municipio de Ñuu Savi en el estado de Guerrero">
          <path className="glocator__state" d={GUERRERO_PATH} />
          <g transform={`translate(${GUERRERO_PIN.x},${GUERRERO_PIN.y})`}>
            <circle className="glocator__halo" cx="0" cy="0" r="30" />
            <ellipse cx="0" cy="1.5" rx="9" ry="3" fill="rgba(0,0,0,.25)" />
            <path className="glocator__pin"
              d="M0 0 C-11 -15 -16 -21 -16 -29 A16 16 0 1 1 16 -29 C16 -21 11 -15 0 0 Z" />
            <circle cx="0" cy="-29" r="6" fill="#fff" />
          </g>
        </svg>
      </div>
      <figcaption className="glocator__cap">
        <span className="glocator__dot" aria-hidden="true" />
        <span><strong>Ñuu Savi</strong> se ubica en el estado de Guerrero (cabecera: Coapinola).</span>
      </figcaption>
    </figure>
  );
}
