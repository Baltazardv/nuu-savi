// Contratos de obra pública. Genera 001–033 (sin el 032, como en el sitio actual).
// Cuando los PDF estén disponibles, colocarlos en /assets/contratos/ con estos nombres.

export const contracts = [];
for (let i = 1; i <= 33; i++) {
  if (i === 32) continue; // salto en el 032
  const id = String(i).padStart(3, "0");
  contracts.push({
    id,
    label: "Obra pública municipal",
    contrato: `/assets/contratos/Contrato-${id}.pdf`,
    insumos: `/assets/contratos/Insumos-${id}.pdf`,
  });
}
