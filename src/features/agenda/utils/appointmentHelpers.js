export const CITAS_POR_PAGINA = 5

export function groupAppointments(citas) {
  return {
    citasProgramadas: citas.filter((cita) => cita.estado === 'Programada'),
    citasConfirmadas: citas.filter((cita) => cita.estado === 'Confirmada'),
    citasInformativas: citas.filter((cita) => ['Completada', 'Cancelada', 'NoAsistio'].includes(cita.estado)),
  }
}

export function requiereObservacion(estado) {
  return ['Cancelada', 'NoAsistio'].includes(estado)
}

export function statusPillClass(estado) {
  const classes = {
    Programada: 'status-pill-scheduled',
    Confirmada: 'status-pill-confirmed',
    Completada: 'status-pill-completed',
    Cancelada: 'status-pill-canceled',
    NoAsistio: 'status-pill-no-show',
  }

  return classes[estado] ?? 'status-pill-muted'
}

export function isCitaVencida(cita) {
  return Boolean(
    cita.fechaFin
    && !['Completada', 'Cancelada', 'NoAsistio'].includes(cita.estado)
    && new Date(cita.fechaFin) < new Date(),
  )
}

export function timeOnly(value) {
  return new Intl.DateTimeFormat('es-EC', { timeStyle: 'short' }).format(new Date(value))
}

export function shortDateTime(value) {
  return new Intl.DateTimeFormat('es-EC', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}
