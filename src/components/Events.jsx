import { useEffect, useRef, useState } from "react";
import { events as fallbackEvents } from "../data/events.js";
import { getEventos } from "../lib/wp.js";
import Icon from "./Icons.jsx";

export default function Events() {
  const trackRef = useRef(null);
  const [events, setEvents] = useState(fallbackEvents);

  useEffect(() => {
    let alive = true;
    getEventos(8).then((data) => {
      if (alive && data && data.length) setEvents(data);
    });
    return () => { alive = false; };
  }, []);

  const scrollByCards = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(".event");
    const amount = card ? card.offsetWidth + 20 : 320;
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="section events" id="eventos">
      <div className="container events__head">
        <div>
          <h2 className="h2">Próximos eventos</h2>
          <p className="kicker">Cultura, salidas y momentos importantes</p>
        </div>
        <div className="events__nav">
          <button aria-label="Anterior" onClick={() => scrollByCards(-1)}><Icon name="chevronLeft" size={22} /></button>
          <button aria-label="Siguiente" onClick={() => scrollByCards(1)}><Icon name="chevronRight" size={22} /></button>
        </div>
      </div>

      <div className="events__track" ref={trackRef}>
        {events.map((ev, i) => (
          <article className="event" key={ev.id}>
            <div className={`event__media tone-${(i % 4) + 1}`} style={ev.img ? { backgroundImage: `url(${ev.img})` } : undefined}>
              {ev.tag && <span className="event__tag">{ev.tag}</span>}
            </div>
            <div className="event__body">
              <div className="event__date">
                <span className="event__day">{ev.day}</span>
                <span className="event__month">{ev.month}</span>
              </div>
              <div>
                <h3 className="event__title">{ev.title}</h3>
                <p className="event__place"><Icon name="marker" size={15} /> {ev.place}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
