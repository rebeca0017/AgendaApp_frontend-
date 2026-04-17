import { AppointmentDates } from './AppointmentDates'
import { timeOnly } from '../utils/appointmentHelpers'

export function ReminderGroup({ title, items, emptyText, openDetails, saving, action, todayOnly = false }) {
  return (
    <div className="reminder-group">
      <h4>{title}</h4>
      {items.length === 0 ? (
        <p className="empty">{emptyText}</p>
      ) : (
        <div className="reminder-list">
          {items.map((cita) => (
            <article className="reminder-item" key={`${title}-${cita.id}`}>
              <div className="reminder-main">
                <strong>{cita.cliente}</strong>
                <span>{cita.servicio}</span>
                {todayOnly ? (
                  <time className="reminder-visit-time">{timeOnly(cita.fechaInicio)}</time>
                ) : (
                  <AppointmentDates cita={cita} compact />
                )}
              </div>
              <div className="reminder-actions">
                {action?.(cita)}
                <button className="secondary reminder-action action-view" onClick={() => openDetails(cita)} disabled={saving}>Ver</button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
