import { site } from "../data/site.js";
import Icon from "./Icons.jsx";

// Vista previa interactiva de la página de Facebook (Page Plugin oficial de Meta).
// Muestra la portada, publicaciones recientes y botón de "Seguir", como en el sitio anterior.
export default function FacebookFeed() {
  const pageUrl = site.facebook;
  const pluginSrc =
    "https://www.facebook.com/plugins/page.php?href=" +
    encodeURIComponent(pageUrl) +
    "&tabs=timeline&width=380&height=560&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&lazy=true";

  return (
    <section className="section facebook" id="facebook">
      <div className="container facebook__grid">
        <div className="facebook__intro">
          <p className="kicker">Redes sociales</p>
          <h2 className="h2">Síguenos en Facebook</h2>
          <p>
            Mantente al día con las actividades, avisos y comunicados del H. Ayuntamiento de
            Ñuu Savi directamente desde nuestra página oficial de Facebook.
          </p>
          <a href={pageUrl} target="_blank" rel="noopener" className="btn btn--solid">
            <Icon name="facebook" size={18} /> Ir a nuestra página
          </a>
        </div>

        <div className="facebook__embed">
          <iframe
            title="Página de Facebook del H. Ayuntamiento de Ñuu Savi"
            src={pluginSrc}
            width="380"
            height="560"
            style={{ border: "none", overflow: "hidden" }}
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
