import { Link } from "react-router-dom";
import Icon from "./Icons.jsx";
import { asset } from "../lib/asset.js";

export default function CabildoTeaser() {
  return (
    <section className="section cabildo-teaser" id="cabildo">
      <div className="container cabildo-teaser__grid">
        <figure className="cabildo-teaser__media">
          <img src={asset("/assets/fotos/cabildo-grupo.jpg")} alt="Cabildo del Municipio de Ñuu Savi 2024–2027" loading="lazy" />
        </figure>
        <div className="cabildo-teaser__body">
          <p className="kicker">Gobierno municipal</p>
          <h2 className="h2">Conoce a nuestro cabildo</h2>
          <p>
            El H. Ayuntamiento de Ñuu Savi, periodo 2024–2027, está integrado por servidoras y
            servidores públicos electos bajo el <strong>Sistema Normativo Propio de Usos y
            Costumbres</strong>, comprometidos con el bienestar y el progreso comunitario.
          </p>
          <p>
            Conoce la semblanza, formación y comisiones de cada integrante del cabildo.
          </p>
          <Link to="/cabildo" className="btn btn--solid">
            Ver el cabildo completo <Icon name="arrowRight" size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
