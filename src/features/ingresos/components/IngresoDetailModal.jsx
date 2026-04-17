import { dateTime, money } from '../../../utils/formatters'

export function IngresoDetailModal({ ingreso, onClose, saving }) {
  return (
    <div className="modal-backdrop" role="presentation">
      <article className="detail-modal" role="dialog" aria-modal="true" aria-labelledby="ingreso-detail-title">
        <div className="detail-modal-header">
          <div>
            <p>Detalle de ingreso</p>
            <h3 id="ingreso-detail-title">{ingreso.concepto}</h3>
          </div>
          <button type="button" className="modal-close" onClick={onClose} disabled={saving} aria-label="Cerrar">x</button>
        </div>

        <div className="detail-status-row">
          <span className="status-pill status-pill-completed">{money(ingreso.monto)}</span>
          <span className="status-pill status-pill-muted">{ingreso.metodoPago}</span>
        </div>

        <dl className="detail-grid">
          <div>
            <dt>Concepto</dt>
            <dd>{ingreso.concepto}</dd>
          </div>
          <div>
            <dt>Monto</dt>
            <dd>{money(ingreso.monto)}</dd>
          </div>
          <div>
            <dt>Cliente</dt>
            <dd>{ingreso.cliente || 'Sin cliente asociado.'}</dd>
          </div>
          <div>
            <dt>Cita</dt>
            <dd>{ingreso.cita || (ingreso.citaId ? `Cita #${ingreso.citaId}` : 'Sin cita asociada.')}</dd>
          </div>
          <div>
            <dt>Metodo de pago</dt>
            <dd>{ingreso.metodoPago}</dd>
          </div>
          <div>
            <dt>Fecha de pago</dt>
            <dd>{dateTime(ingreso.fechaPago)}</dd>
          </div>
          <div>
            <dt>Referencia</dt>
            <dd>{ingreso.referencia || 'Sin referencia.'}</dd>
          </div>
          <div>
            <dt>Notas</dt>
            <dd>{ingreso.notas || 'Sin notas.'}</dd>
          </div>
        </dl>
      </article>
    </div>
  )
}
