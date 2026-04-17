import { dateTime, money } from '../../../utils/formatters'

export function ClienteDetailModal({ cliente, historialFinanciero, onClose, saving }) {
  return (
    <div className="modal-backdrop" role="presentation">
      <article className="detail-modal" role="dialog" aria-modal="true" aria-labelledby="cliente-detail-title">
        <div className="detail-modal-header">
          <div>
            <p>Detalle de cliente</p>
            <h3 id="cliente-detail-title">{cliente.nombres} {cliente.apellidos}</h3>
          </div>
          <button type="button" className="modal-close" onClick={onClose} disabled={saving} aria-label="Cerrar">x</button>
        </div>

        <div className="detail-status-row">
          <span className={`status-pill ${cliente.activo ? 'status-pill-completed' : 'status-pill-muted'}`}>{cliente.activo ? 'Activo' : 'Inactivo'}</span>
        </div>

        <dl className="detail-grid">
          <div>
            <dt>Nombres</dt>
            <dd>{cliente.nombres}</dd>
          </div>
          <div>
            <dt>Apellidos</dt>
            <dd>{cliente.apellidos}</dd>
          </div>
          <div>
            <dt>Identificación</dt>
            <dd>{cliente.identificacion || 'Sin identificacion.'}</dd>
          </div>
          <div>
            <dt>Telefono</dt>
            <dd>{cliente.telefono || 'Sin telefono.'}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{cliente.email || 'Sin email.'}</dd>
          </div>
          <div>
            <dt>Fecha de creación</dt>
            <dd>{cliente.fechaCreacion ? dateTime(cliente.fechaCreacion) : 'Sin fecha registrada.'}</dd>
          </div>
        </dl>

        <div className="detail-status-row">
          <span className="status-pill status-pill-completed">Ingresos: {money(historialFinanciero?.totalIngresos ?? 0)}</span>
          <span className="status-pill status-pill-muted">Saldo pendiente: {money(historialFinanciero?.saldoPendiente ?? 0)}</span>
        </div>

        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Ingreso</th>
                <th>Monto</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {(historialFinanciero?.ingresos ?? []).slice(0, 5).map((ingreso) => (
                <tr key={ingreso.id}>
                  <td>{ingreso.concepto}</td>
                  <td>{money(ingreso.monto)}</td>
                  <td>{dateTime(ingreso.fechaPago)}</td>
                </tr>
              ))}
              {historialFinanciero && historialFinanciero.ingresos.length === 0 && (
                <tr><td colSpan="3">Sin ingresos registrados.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </article>
    </div>
  )
}
