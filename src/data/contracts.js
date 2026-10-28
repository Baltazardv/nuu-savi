// Contratos de obra pública del municipio (relación oficial).
// Cada contrato tiene su documento (Contrato) y su relación de insumos, en PDF.
// Los PDF (~344 MB) se alojan en el servidor, NO en el repositorio:
//   public_html/assets/contratos/contrato/NNN.pdf
//   public_html/assets/contratos/insumos/NNN.pdf

// Folios entregados por el municipio: 001–031 y 033 (no hay 032).
const FOLIOS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
  17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 33,
];

export const contracts = FOLIOS.map((n) => {
  const id = String(n).padStart(3, "0");
  return {
    id,
    label: "Obra pública municipal",
    contrato: `/assets/contratos/contrato/${id}.pdf`,
    insumos: `/assets/contratos/insumos/${id}.pdf`,
  };
});
