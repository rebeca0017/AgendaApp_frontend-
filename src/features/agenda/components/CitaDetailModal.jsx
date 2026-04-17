import { dateTime, labelEstado } from '../../../utils/formatters'
import { isCitaVencida, statusPillClass } from '../utils/appointmentHelpers'

export function CitaDetailModal({ cita, onClose, onEdit, saving }) {
  const cerrada = ['Completada', 'Cancelada', 'NoAsistio'].includes(cita.estado)

  return (
    <div className="modal-backdrop" role="presentation">
      <article className="detail-modal" role="dialog" aria-modal="true" aria-labelledby="detail-modal-title">
        <div className="detail-modal-header">
          <div>
            <p>Detalle de cita</p>
            <h3 id="detail-modal-title">{cita.cliente}</h3>
          </div>
          <button type="button" className="modal-close" onClick={onClose} disabled={saving} aria-label="Cerrar">x</button>
        </div>

        <div className="detail-status-row">
          <span className={`status-pill ${statusPillClass(cita.estado)}`}>{labelEstado(cita.estado)}</span>
          {isCitaVencida(cita) && <span className="detail-overdue">Vencido</span>}
        </div>

        <dl className="detail-grid">
          <div>
            <dt>Cliente</dt>
            <dd>{cita.cliente}</dd>
          </div>
          <div>
            <dt>Servicio</dt>
            <dd>{cita.servicio}</dd>
          </div>
          <div>
            <dt>Fecha de visita</dt>
            <dd>{dateTime(cita.fechaInicio)}</dd>
          </div>
          <div>
            <dt>Fecha para completar</dt>
            <dd className={isCitaVencida(cita) ? 'detail-deadline-overdue' : ''}>{cita.fechaFin ? dateTime(cita.fechaFin) : 'Sin fecha limite.'}</dd>
          </div>
          <div>
            <dt>Motivo</dt>
            <dd>{cita.motivo || 'Sin motivo registrado.'}</dd>
          </div>
          <div>
            <dt>Observaciones</dt>
            <dd>{cita.observaciones || 'Sin observaciones.'}</dd>
          </div>
        </dl>

        <div className="modal-actions">
          {!cerrada && (
            <button type="button" className="secondary action-edit" onClick={() => onEdit(cita)} disabled={saving}>Editar</button>
          )}
        </div>
      </article>
    </div>
  )
}
