export const MINUTOS_POR_DIA = 1440

export function serviceDurationLabel(servicio) {
  return `${Math.max(1, Math.ceil(servicio.duracionMinutos / MINUTOS_POR_DIA))} dia(s)`
}
