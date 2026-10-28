// Obligaciones de Transparencia e Informes de Rendición de Cuentas.
// Datos proporcionados por el municipio. Para completar un año, agrega los
// documentos en el arreglo `docs` de la ley correspondiente; si queda vacío,
// el sitio muestra automáticamente "Información no proporcionada".

const BASE_CONTA = "/assets/transparencia/2023/contabilidad/";

// Las 4 leyes que la tabla de aplicabilidad reconoce por ejercicio fiscal.
const LEYES = [
  "Ley General de Contabilidad Gubernamental",
  "Ley de Disciplina Financiera",
  "Ley número 207 de Transparencia y Acceso a la Información Pública del Estado de Guerrero",
  "Ley de Coordinación Fiscal",
];

// Estados e información financiera 2023 (Ley General de Contabilidad Gubernamental).
const contabilidad2023 = [
  "01-Inventario-de-Bienes-Muebles",
  "02-Inventario-de-bienes-inmuebles",
  "03-Estado-de-Variacion-en-la-Hacienda-Publica",
  "04-Estado-de-Situacion-Financiera",
  "05-Estado-Analitico-del-Activo",
  "06-Estado-Analitico-de-Ingresos",
  "07-Estado-Analitico-del-Ejercicio-del-Presupuesto-de-Egresos-Clasificacion-Administrativa",
  "08-Estado-de-Actividades",
  "09-Endeudamiento-Neto",
  "10-Estado-Analitico-del-Ejercicio-del-Presupuesto-de-Egresos-por-Clasificacion-Economica",
  "11-Estado-Analitico-del-Ejercicio-del-Presupuesto-de-Egresos-por-Clasificacion-Funcional",
  "12-Notas-de-Desglose",
  "13-Estado-Analitico-del-Ejercicio-del-Presupuesto-de-Egresos-por-Clasificacion-por-Objeto-del-Gasto",
  "14-Informes-Sobre-Pasivos-Contingentes",
  "15-Estado-de-Flujos-de-Efectivo",
  "16-Estado-de-Cambios-en-la-Situacion-Financiera",
  "17-Intereses-de-la-Deuda",
  "18-Gastos-por-Categoria-Programatica",
  "19-Informacion-Adicional-a-la-Iniciativa-de-Ingresos",
].map((f) => ({
  label: f.replace(/^\d+-/, "").replace(/-/g, " "),
  file: BASE_CONTA + f + ".pdf",
}));

// Un arreglo de 4 leyes; solo la primera trae documentos (las demás quedan vacías).
const ley = (idx, docs = []) => ({ ley: LEYES[idx], docs });

// Años disponibles en el selector (desplegable). `null` = información no proporcionada.
export const obligacionesPorAnio = {
  2024: [ley(0), ley(1), ley(2), ley(3)],
  2023: [ley(0, contabilidad2023), ley(1), ley(2), ley(3)],
  2022: null,
  2021: null,
};

export const aniosObligaciones = [2024, 2023, 2022, 2021];

// Informes de Rendición de Cuentas (Gobierno 2024–2027).
export const informes = [
  {
    key: "primer",
    label: "Primer Informe de Gobierno",
    file: "/assets/informes/primer-informe-gobierno.pdf",
    aplica: true,
  },
  { key: "segundo", label: "Segundo Informe de Gobierno", aplica: false, nota: "No aplica" },
  { key: "tercero", label: "Tercer Informe de Gobierno", aplica: false, nota: "No aplica" },
];
