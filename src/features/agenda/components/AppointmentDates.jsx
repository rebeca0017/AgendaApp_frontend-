import { dateTime } from '../../../utils/formatters'
import { isCitaVencida, shortDateTime } from '../utils/appointmentHelpers'

export function AppointmentDates({ cita, compact = false, simple = false }) {
  const vencida = isCitaVencida(cita)

  return (
    <div className={`appointment-dates ${compact ? 'compact' : ''} ${simple ? 'simple' : ''}`}>
      <time>
        <span className="appointment-date-label">Visita</span>
        <span className="appointment-date-value">{simple ? shortDateTime(cita.fechaInicio) : dateTime(cita.fechaInicio)}</span>
      </time>
      {cita.fechaFin && (
        <time className={`appointment-deadline ${vencida ? 'is-overdue' : ''}`}>
          <span className="appointment-date-label">Entrega</span>
          <span className="appointment-date-value">{simple ? shortDateTime(cita.fechaFin) : dateTime(cita.fechaFin)}</span>
          {vencida && <small>Vencido</small>}
        </time>
      )}
    </div>
  )
}
