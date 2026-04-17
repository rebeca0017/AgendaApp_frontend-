export function money(value) {
  return new Intl.NumberFormat('es-EC', { style: 'currency', currency: 'USD' }).format(Number(value ?? 0))
}

export function dateTime(value) {
  return new Intl.DateTimeFormat('es-EC', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
}

export function toInputDate(value) {
  const date = new Date(value)
  const offset = date.getTimezoneOffset()
  return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 16)
}

export function normalize(value) {
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()
}

export function labelEstado(value) {
  const labels = { Programada: 'Programada', Confirmada: 'Confirmada', Completada: 'Completada', Cancelada: 'Cancelada', NoAsistio: 'No asistio' }
  return labels[value] ?? value
}
