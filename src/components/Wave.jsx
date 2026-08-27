// Divisor de ola orgánica estilo Mézenc-Loire-Meygal.
// `color` = relleno de la ola; `flip` invierte verticalmente.
export default function Wave({ color = "#ffffff", flip = false, className = "" }) {
  return (
    <div className={`wave ${className}`} style={{ transform: flip ? "rotate(180deg)" : "none" }} aria-hidden="true">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path
          fill={color}
          d="M0,64 C180,110 340,110 520,80 C700,50 860,10 1040,20 C1200,28 1320,72 1440,84 L1440,120 L0,120 Z"
        />
        <path
          fill="none"
          stroke={color === "#ffffff" ? "rgba(23,96,90,.25)" : "rgba(255,255,255,.35)"}
          strokeWidth="2"
          d="M0,58 C180,104 340,104 520,74 C700,44 860,4 1040,14 C1200,22 1320,66 1440,78"
        />
      </svg>
    </div>
  );
}
