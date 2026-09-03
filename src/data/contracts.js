// Contratos de obra pública, divididos por año (2024–2026).
// Cuando los PDF estén disponibles, colocarlos en /assets/contratos/ con estos nombres
// y ajustar la lista de cada año. `year` define en qué pestaña aparece el contrato.

export const contractYears = [2024, 2025, 2026];

// Genera los contratos de un año a partir de un rango de folios.
function makeContracts(year, from, to, { skip = [] } = {}) {
  const list = [];
  for (let i = from; i <= to; i++) {
    if (skip.includes(i)) continue;
    const id = String(i).padStart(3, "0");
    list.push({
      id,
      year,
      label: "Obra pública municipal",
      contrato: `/assets/contratos/${year}/Contrato-${id}.pdf`,
      insumos: `/assets/contratos/${year}/Insumos-${id}.pdf`,
    });
  }
  return list;
}

// Distribución provisional (se ajustará con la relación oficial del municipio).
export const contractsByYear = {
  2024: makeContracts(2024, 1, 18),
  2025: makeContracts(2025, 19, 33, { skip: [32] }),
  2026: [], // Por publicar
};

// Lista plana (compatibilidad).
export const contracts = contractYears.flatMap((y) => contractsByYear[y]);
