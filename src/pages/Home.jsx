import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import CabildoTeaser from "../components/CabildoTeaser.jsx";
import Territory from "../components/Territory.jsx";
import Events from "../components/Events.jsx";
import Gallery from "../components/Gallery.jsx";
import News from "../components/News.jsx";
import FacebookFeed from "../components/FacebookFeed.jsx";

function AboutStrip() {
  return (
    <section className="section about" id="sobre">
      <div className="container about__inner">
        <p className="kicker">Comunidad de Ñuu Savi</p>
        <h2 className="h2 about__title">Pueblo de la lluvia</h2>
        <p className="about__text">
          El municipio de <strong>Ñuu Savi</strong> —del mixteco <em>Ñuu</em> ‘pueblo’ y
          <em> Savi</em> ‘lluvia’— es uno de los 85 municipios del estado de Guerrero.
          Fue constituido el <strong>31 de agosto de 2021</strong> a partir de 37 localidades
          del municipio de Ayutla de los Libres. Su cabecera es la localidad de <strong>Coapinola</strong>.
        </p>
        <ul className="about__facts">
          <li><strong>2021</strong><span>Año de constitución</span></li>
          <li><strong>37</strong><span>Localidades</span></li>
          <li><strong>Coapinola</strong><span>Cabecera municipal</span></li>
          <li><strong>Tu'un Savi</strong><span>Lengua originaria</span></li>
        </ul>
      </div>
    </section>
  );
}

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) window.setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
    }
  }, [hash]);

  return (
    <>
      <Hero />
      <AboutStrip />
      <CabildoTeaser />
      <Territory />
      <Events />
      <Gallery />
      <News />
      <FacebookFeed />
    </>
  );
}
