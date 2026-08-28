import { useEffect, useRef, useState } from "react";
import { events as fallbackEvents, eventCategories, resolveCat } from "../data/events.js";
import { getEventos } from "../lib/wp.js";
import { asset } from "../lib/asset.js";
import { site } from "../data/site.js";
import Icon from "./Icons.jsx";

export default function Events() {
  const trackRef = useRef(null);
  const [events, setEvents] = useState(fallbackEvents);
  const [filter, setFilter] = useState("todos");

  useEffect(() => {
    let alive = true;
    getEventos(8).then((data) => {
      if (alive && data && data.length) setEvents(data);
    });
    return () => { alive = false; };
  }, []);

  const presentCats = [...new Set(events.map((e) => resolveCat(e).key))];
  const filters = ["todos", ...presentCats];
  const shown = filter === "todos" ? events : events.filter((e) => resolveCat(e).key === filter);

  const scrollByCards = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(".event");
    const amount = card ? card.offsetWidth + 22 : 340;
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="section events" id="eventos">
      <div className="events__watermark" aria-hidden="true" />

      <div className="container events__head">
        <div>
          <p className="events__kicker">Cultura, salud y momentos importantes</p>
          <h2 className="h2">Próximos eventos</h2>
          <span className="events__greca" aria-hidden="true" style={{ backgroundImage: `url(${asset("/assets/fotos/greca.png")})` }} />
          <p className="events__lead">
            Participa en las actividades que fortalecen nuestra comunidad. Conoce, asiste y sé
            parte de lo que construimos juntos.
          </p>
        </div>
        <div className="events__nav">
          <button aria-label="Anterior" onClick={() => scrollByCards(-1)}><Icon name="chevronLeft" size={22} /></button>
          <button aria-label="Siguiente" onClick={() => scrollByCards(1)}><Icon name="chevronRight" size={22} /></button>
        </div>
      </div>

      <div className="container events__filters">
        {filters.map((f) => {
          const isAll = f === "todos";
          const c = isAll ? { label: "Todos", color: "#14716a" } : eventCategories[f];
          const activeStyle = filter === f ? { background: c.color, borderColor: c.color, color: "#fff" } : undefined;
          return (
            <button key={f} className={"events__filter" + (filter === f ? " is-active" : "")} onClick={() => setFilter(f)} style={activeStyle}>
              {!isAll && <span className="events__dot" style={{ background: c.color }} />}
              {c.label}
            </button>
          );
        })}
      </div>

      <div className="events__track" ref={trackRef}>
        {shown.map((ev) => {
          const c = resolveCat(ev);
          return (
            <article className="event" key={ev.id}>
              <div className="event__media" style={{ background: `linear-gradient(150deg, ${c.color}, ${c.color}99)` }}>
                <img src={asset(ev.img)} alt={ev.title} loading="lazy" onError={(e) => { e.currentTarget.style.visibility = "hidden"; }} />
                <span className="event__badge">{c.label}</span>
                <span className="event__cat-icon" style={{ background: c.color }}><Icon name={c.icon} size={19} /></span>
              </div>
              <div className="event__body">
                <div className="event__row">
                  <div className="event__date" style={{ background: `${c.color}1f`, color: c.color }}>
                    <span className="event__day">{ev.day}</span>
                    <span className="event__month">{ev.month}</span>
                  </div>
                  <h3 className="event__title">{ev.title}</h3>
                </div>
                <p className="event__place"><Icon name="marker" size={15} /> {ev.place}</p>
                <a href="#eventos" className="event__more" style={{ color: c.color }}>Ver detalles <Icon name="arrowRight" size={15} /></a>
              </div>
            </article>
          );
        })}
      </div>

      <div className="container">
        <div className="events__cta">
          <span className="events__cta-icon"><Icon name="calendar" size={28} /></span>
          <div className="events__cta-text">
            <strong>¿Tienes un evento para compartir?</strong>
            <span>Envíanos la información y ayúdanos a mantener a nuestra comunidad informada.</span>
          </div>
          <a href={site.facebook} target="_blank" rel="noopener" className="btn btn--solid events__cta-btn">
            <Icon name="calendar" size={17} /> Enviar mi evento
          </a>
          <div className="events__cta-phone">
            O contáctanos en <a href={site.phoneHref}><Icon name="phone" size={14} /> {site.phone}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
