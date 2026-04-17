import { dateTime, money } from '../../../utils/formatters'

export function GastoDetailModal({ gasto, onClose, saving }) {
  return (
    <div className="modal-backdrop" role="presentation">
      <article className="detail-modal" role="dialog" aria-modal="true" aria-labelledby="gasto-detail-title">
        <div className="detail-modal-header">
          <div>
            <p>Detalle de gasto</p>
            <h3 id="gasto-detail-title">{gasto.concepto}</h3>
          </div>
          <button type="button" className="modal-close" onClick={onClose} disabled={saving} aria-label="Cerrar">x</button>
        </div>

        <div className="detail-status-row">
          <span className="status-pill status-pill-canceled">{money(gasto.monto)}</span>
          <span className="status-pill status-pill-muted">{gasto.metodoPago}</span>
        </div>

        <dl className="detail-grid">
          <div>
            <dt>Concepto</dt>
            <dd>{gasto.concepto}</dd>
          </div>
          <div>
            <dt>Categoria</dt>
            <dd>{gasto.categoria}</dd>
          </div>
          <div>
            <dt>Monto</dt>
            <dd>{money(gasto.monto)}</dd>
          </div>
          <div>
            <dt>Metodo de pago</dt>
            <dd>{gasto.metodoPago}</dd>
          </div>
          <div>
            <dt>Fecha</dt>
            <dd>{dateTime(gasto.fechaGasto)}</dd>
          </div>
          <div>
            <dt>Referencia</dt>
            <dd>{gasto.referencia || 'Sin referencia.'}</dd>
          </div>
          <div>
            <dt>Notas</dt>
            <dd>{gasto.notas || 'Sin notas.'}</dd>
          </div>
        </dl>
      </article>
    </div>
  )
}
