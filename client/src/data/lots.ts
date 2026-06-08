/**
 * data/lots.ts
 * Fuente de verdad estática de los lotes de Villas Doña Olga.
 *
 * Por qué aquí y no en el componente:
 *   - Separación de responsabilidades: la UI no debe contener datos de negocio.
 *   - Facilita migración futura: cuando el endpoint GET /api/lots exista,
 *     solo se cambia el origen del dato en availability.tsx, no su estructura.
 *   - Permite reutilizar los datos en otros componentes sin duplicación.
 *
 * Migración futura a API:
 *   Reemplazar importación de LOTS con:
 *   const { data: lots } = useQuery({ queryKey: ["/api/lots"] });
 */

export type LotStatus = "available" | "reserved" | "sold";

export interface Lot {
  id: string;
  number: string;
  area: number;       // m²
  status: LotStatus;
  price: number;      // USD — calculado: area * PRICE_PER_SQM
  description?: string;
}

const PRICE_PER_SQM = 60; // USD/m²

/** Constructor interno para reducir repetición */
const lot = (
  id: string,
  number: string,
  area: number,
  status: LotStatus,
  description?: string,
): Lot => ({ id, number, area, status, price: area * PRICE_PER_SQM, description });

export const LOTS: Lot[] = [
  // ── Disponibles ────────────────────────────────────────────────────────────
  lot("LRC12",  "LR C12", 500,  "available"),
  lot("LRC21",  "LR C21", 500,  "available"),
  lot("LRC13",  "LR C13", 500,  "available"),
  lot("LRC14",  "LR C14", 500,  "available"),
  lot("LRC15",  "LR C15", 500,  "available"),
  lot("LRC16",  "LR C16", 500,  "available"),
  lot("LRC19",  "LR C19", 500,  "available"),
  lot("LRC20",  "LR C20", 500,  "available"),
  lot("LRC28",  "LR C28", 500,  "available"),
  lot("LRC35",  "LR C35", 500,  "available"),
  lot("LRC33",  "LR C33", 500,  "available"),
  lot("LRC29",  "LR C29", 500,  "available"),
  lot("LRC32",  "LR C32", 500,  "available"),
  lot("LR17",   "LR 17",  1705, "available"),
  lot("LR42",   "LR 42",  500,  "available"),
  lot("LRC43",  "LR C43", 500,  "available"),
  lot("LRC44",  "LR C44", 500,  "available"),
  lot("LRC45",  "LR C45", 500,  "available"),
  lot("LRC46",  "LR C46", 500,  "available"),
  lot("LRC47",  "LR C47", 500,  "available"),
  lot("LRC48",  "LR C48", 500,  "available"),
  lot("LRC02",  "LR C02", 1010, "available"),
  lot("LRC03",  "LR C03", 957,  "available"),
  lot("LRC04",  "LR C04", 887,  "available"),
  lot("LRC05",  "LR C05", 669,  "available"),
  lot("LRC06",  "LR C06", 530,  "available"),
  lot("LRC07",  "LR C07", 557,  "available"),
  lot("LRC08",  "LR C08", 628,  "available"),
  lot("LRC09",  "LR C09", 1202, "available"),
  // ── Reservados ─────────────────────────────────────────────────────────────
  lot("LRC11",  "LR C11", 500,  "reserved"),
  lot("LRC22",  "LR C22", 500,  "reserved"),
  lot("LRC25",  "LR C25", 500,  "reserved"),
  lot("LRC27",  "LR C27", 500,  "reserved"),
  lot("LRC34",  "LR C34", 500,  "reserved"),
  lot("LRC18",  "LR C18", 500,  "reserved"),
  lot("LRC17",  "LR C17", 500,  "reserved"),
  lot("LRC30",  "LR C30", 500,  "reserved"),
  lot("LRC31",  "LR C31", 500,  "reserved"),
  // ── No disponibles (vendidos) ───────────────────────────────────────────────
  lot("LC01",   "LC 01",  4963, "sold"),
  lot("LC02",   "LC 02",  2932, "sold"),
  lot("LRC01",  "LR C01", 1047, "sold"),
  lot("LRC10",  "LR C10", 500,  "sold"),
  lot("LRC23",  "LR C23", 500,  "sold"),
  lot("LRC24",  "LR C24", 500,  "sold"),
  lot("LRC37",  "LR C37", 500,  "sold"),
  lot("LRC38",  "LR C38", 1108, "sold"),
  lot("LRC39",  "LR C39", 989,  "sold"),
  lot("LRC40",  "LR C40", 500,  "sold"),
  lot("LRC41",  "LR C41", 500,  "sold"),
  lot("LRC49",  "LR C49", 2205, "sold"),
];

// ── Helpers de consulta ─────────────────────────────────────────────────────
export const availableLots = () => LOTS.filter((l) => l.status === "available");
export const reservedLots  = () => LOTS.filter((l) => l.status === "reserved");
export const soldLots      = () => LOTS.filter((l) => l.status === "sold");
export const getLotById    = (id: string) => LOTS.find((l) => l.id === id);
