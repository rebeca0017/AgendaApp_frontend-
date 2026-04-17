import { dateTime } from '../../../utils/formatters'

export function ChangeStatusModal({
  estadoPendiente,
  observacionEstado,
  setObservacionEstado,
  confirmarCambioEstado,
  cerrarModalEstado,
  saving,
}) {
  if (!estadoPendiente) return null

  return (
    <form className="modal-backdrop" onSubmit={confirmarCambioEstado}>
      <div className="reason-modal" role="dialog" aria-modal="true" aria-labelledby="reason-modal-title">
        <h3 id="reason-modal-title">
          {estadoPendiente.estado === 'Cancelada' ? 'Cancelar cita' : 'Marcar no asistio'}
        </h3>
        <p>
          {estadoPendiente.cita.cliente} - {dateTime(estadoPendiente.cita.fechaInicio)}
        </p>
        <label>
          Razon
          <textarea
            required
            autoFocus
            value={observacionEstado}
            onChange={(event) => setObservacionEstado(event.target.value)}
            placeholder="Escribe la razon para guardar el cambio"
          />
        </label>
        <div className="modal-actions">
          <button type="button" className="secondary action-view" onClick={cerrarModalEstado} disabled={saving}>Volver</button>
          <button type="submit" className="primary modal-submit" disabled={saving || !observacionEstado.trim()}>Guardar</button>
        </div>
      </div>
    </form>
  )
}
