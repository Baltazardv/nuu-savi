import PageHero from "../components/PageHero.jsx";
import Icon from "../components/Icons.jsx";

const MAP_QUERY = "Coapinola, Guerrero, México";
const MAP_EMBED = "https://maps.google.com/maps?q=" + encodeURIComponent(MAP_QUERY) + "&z=12&hl=es&output=embed";

const datos = [
  { icon: "calendar", strong: "31 de agosto de 2021", sub: "Constitución del municipio" },
  { icon: "landmark", strong: "Coapinola", sub: "Cabecera municipal" },
  { icon: "map", strong: "37 localidades", sub: "Integran el territorio" },
  { icon: "book", strong: "Tu'un Savi", sub: "Lengua originaria (mixteco)" },
  { icon: "flag", strong: "Guerrero", sub: "Uno de los 85 municipios" },
  { icon: "cloudRain", strong: "Pueblo de la lluvia", sub: "Significado de «Ñuu Savi»" },
];

export default function Conociendo() {
  return (
    <>
      <PageHero
        title="Conociendo Ñuu Savi"
        subtitle="Conoce el origen, la lengua, la cultura y el territorio del pueblo de la lluvia."
        crumbs={[{ label: "Inicio", to: "/" }, { label: "Conociendo Ñuu Savi" }]}
      />

      <section className="section">
        <div className="container">
          <div className="conoce__facts">
            {datos.map((d) => (
              <div className="conoce__fact" key={d.strong}>
                <span className="conoce__fact-icon"><Icon name={d.icon} size={22} /></span>
                <div>
                  <strong>{d.strong}</strong>
                  <span>{d.sub}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="prose">
            <h3>El pueblo de la lluvia</h3>
            <p>
              <strong>Ñuu Savi</strong> —del mixteco <em>Ñuu</em> ‘pueblo’ y <em>Savi</em> ‘lluvia’,
              «pueblo de la lluvia»— es uno de los 85 municipios del estado de Guerrero. Su cabecera
              es la localidad de <strong>Coapinola</strong>, y su territorio reúne <strong>37 localidades</strong>
              que comparten lengua, tradiciones y un profundo vínculo con la tierra.
            </p>

            <h3>Lengua y cultura</h3>
            <p>
              La lengua originaria del municipio es el <strong>Tu'un Savi</strong> (mixteco), que se
              conserva y se transmite entre las generaciones. La vida comunitaria se organiza a través de
              usos y costumbres, la asamblea y el trabajo colectivo o faena, pilares de la identidad del pueblo.
            </p>

            <h3>Territorio y clima</h3>
            <p>
              Enclavado en la región de la Costa Chica–Montaña de Guerrero, el territorio de Ñuu Savi
              se caracteriza por sus cerros, ríos y áreas naturales. Las lluvias que dan nombre al pueblo
              marcan el ciclo del cultivo y la vida en el campo.
            </p>

            {/* Reseña ampliada pendiente de proporcionar por el municipio. */}
            <div className="callout">
              <Icon name="info" size={22} />
              <span>Esta página se ampliará con la <strong>reseña oficial, fotografías y datos que proporcione el municipio</strong> (gastronomía, fiestas, sitios de interés y cómo llegar).</span>
            </div>

            <h3>¿Dónde estamos?</h3>
          </div>

          <figure className="conoce__map">
            <iframe
              title="Mapa interactivo de Ñuu Savi (Coapinola, Guerrero)"
              src={MAP_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </figure>
        </div>
      </section>
    </>
  );
}
