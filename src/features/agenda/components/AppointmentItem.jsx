import { estadosCita } from '../../../constants/appConstants'
import { labelEstado } from '../../../utils/formatters'
import { statusPillClass } from '../utils/appointmentHelpers'
import { AppointmentDates } from './AppointmentDates'

export function AppointmentItem({ cita, readOnly, cambiarEstadoCita, openDetails, saving }) {
  return (
    <article className={`appointment-item ${readOnly ? 'read-only' : ''}`}>
      <div className="appointment-main">
        <strong>{cita.cliente}</strong>
        <span>{cita.servicio}</span>
      </div>
      <div className="appointment-meta">
        <AppointmentDates cita={cita} simple />
        {readOnly && (
          <span className={`status-pill ${statusPillClass(cita.estado)}`}>
            {labelEstado(cita.estado)}
          </span>
        )}
      </div>
      <div className="row-actions">
        {!readOnly && (
          <select
            className={`status-change-select ${statusPillClass(cita.estado)}`}
            aria-label="Cambiar estado"
            value={cita.estado}
            onChange={(event) => {
              if (event.target.value && event.target.value !== cita.estado) {
                cambiarEstadoCita(cita, event.target.value)
              }
            }}
            disabled={saving}
          >
            {estadosCita.map((estado) => (
              <option key={estado} value={estado}>{labelEstado(estado)}</option>
            ))}
          </select>
        )}
        <button className="secondary action-view" onClick={() => openDetails(cita)} disabled={saving}>Ver</button>
      </div>
    </article>
  )
}
