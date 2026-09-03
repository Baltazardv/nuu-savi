import { useEffect, useState } from "react";
import Icon from "./Icons.jsx";

// Contador de visitas (semanal y mensual).
// Registro local por dispositivo mientras se conecta la analítica global del sitio.
// Cuando exista backend/analítica, sustituir `readLocal` por la consulta real.
const KEY = "nuusavi_visits";

function readVisits() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function writeVisits(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* modo privado: se ignora */
  }
}

export default function VisitCounter() {
  const [stats, setStats] = useState({ week: 0, month: 0, total: 0 });

  useEffect(() => {
    const now = Date.now();
    let visits = readVisits();

    // Registrar una visita por sesión (evita contar cada render/navegación).
    let sessionMarked = false;
    try { sessionMarked = sessionStorage.getItem("nuusavi_visit_marked") === "1"; } catch { sessionMarked = false; }
    if (!sessionMarked) {
      visits = [...visits, now].slice(-2000); // tope para no crecer indefinidamente
      writeVisits(visits);
      try { sessionStorage.setItem("nuusavi_visit_marked", "1"); } catch { /* noop */ }
    }

    const WEEK = 7 * 24 * 60 * 60 * 1000;
    const MONTH = 30 * 24 * 60 * 60 * 1000;
    setStats({
      week: visits.filter((t) => now - t <= WEEK).length,
      month: visits.filter((t) => now - t <= MONTH).length,
      total: visits.length,
    });
  }, []);

  const cards = [
    { label: "Visitas esta semana", value: stats.week, icon: "calendar" },
    { label: "Visitas este mes", value: stats.month, icon: "chart" },
    { label: "Visitas totales", value: stats.total, icon: "people" },
  ];

  return (
    <div className="visits">
      <h3 className="visits__title"><Icon name="chart" size={20} /> Contador de visitas</h3>
      <div className="visits__grid">
        {cards.map((c) => (
          <div className="visits__card" key={c.label}>
            <span className="visits__icon"><Icon name={c.icon} size={22} /></span>
            <strong className="visits__value">{c.value.toLocaleString("es-MX")}</strong>
            <span className="visits__label">{c.label}</span>
          </div>
        ))}
      </div>
      <p className="visits__note">
        <Icon name="info" size={14} /> Registro por dispositivo. El contador global del sitio se
        conectará con la analítica oficial (WordPress / servicio de estadísticas).
      </p>
    </div>
  );
}
