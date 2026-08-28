import PageHero from "../components/PageHero.jsx";
import Icon from "../components/Icons.jsx";
import { asset } from "../lib/asset.js";

export default function Historia() {
  // Cuando el municipio comparta el PDF, colócalo en /assets/Cacicazgo-de-Coapinola.pdf
  const pdf = "/assets/Cacicazgo-de-Coapinola.pdf";
  const pdfDisponible = false; // cambiar a true cuando exista el archivo

  return (
    <>
      <PageHero
        title="Historia del Cacicazgo en Coapinola"
        subtitle="Datos históricos del antiguo Cacicazgo de Coapinola, raíz y memoria del pueblo de Ñuu Savi."
        crumbs={[{ label: "Inicio", to: "/" }, { label: "Historia" }]}
      />
      <section className="section">
        <div className="container">
          <div className="prose">
            <p>
              <strong>Ñuu Savi</strong> —del mixteco <em>Ñuu</em> ‘pueblo’ y <em>Savi</em> ‘lluvia’,
              «pueblo de la lluvia»— es uno de los 85 municipios que integran el estado de Guerrero.
              Su historia se remonta mucho más atrás de su fundación: al antiguo Cacicazgo de
              Coapinola, del que este pueblo es heredero.
            </p>

            <h3>Creación del municipio</h3>
            <p>
              El <strong>13 de julio de 2021</strong>, el Congreso del Estado de Guerrero aceptó la
              iniciativa para la creación de cuatro nuevos municipios en el estado. Para validar la
              creación de Ñuu Savi se realizó una encuesta de opinión entre las y los habitantes de
              su territorio los días <strong>15 y 16 de agosto</strong>, con el apoyo de la Facultad
              de Matemáticas de la Universidad Autónoma de Guerrero.
            </p>
            <p>
              El <strong>31 de agosto de 2021</strong>, el Congreso del Estado aprobó formalmente la
              creación del municipio, escindiendo <strong>37 localidades</strong> del municipio de
              Ayutla de los Libres. Su cabecera es la localidad de <strong>Coapinola</strong>.
            </p>
            <p>
              El territorio conserva la memoria de las generaciones que lo habitaron, su lengua
              <strong> Tu'un Savi</strong>, sus tradiciones y su vínculo con la tierra y el cultivo.
              El documento histórico que se presenta a continuación reúne los datos que sostienen
              esta identidad.
            </p>
            <h3>Documento histórico</h3>
          </div>

          <div className="doc-embed">
            {pdfDisponible ? (
              <iframe className="doc-embed__frame" src={asset(pdf)} title="Cacicazgo de Coapinola" />
            ) : (
              <div className="doc-embed__placeholder">
                <Icon name="doc" size={54} />
                <div>
                  <p className="doc-embed__filename">Cacicazgo-de-Coapinola.pdf</p>
                  <p>Documento de 8 páginas. Se incrustará aquí cuando el municipio comparta el archivo.</p>
                </div>
              </div>
            )}
          </div>

          <div className="callout">
            <Icon name="info" size={22} />
            <span>El PDF histórico del sitio actual se migrará a esta sección. Colócalo en <strong>public/assets/Cacicazgo-de-Coapinola.pdf</strong> y cambia <code>pdfDisponible</code> a <code>true</code> en <code>Historia.jsx</code>.</span>
          </div>
        </div>
      </section>
    </>
  );
}
