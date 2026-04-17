import { DataPanel } from '../../../components/common/DataPanel'
import { money } from '../../../utils/formatters'

export function IngresosSummary({ resumen }) {
  return (
    <DataPanel title="Ingresos por metodo">
      <div className="method-list">
        {resumen.porMetodo.map((item) => (
          <div className="method-row" key={item.metodoPago}>
            <span>{item.metodoPago}</span>
            <strong>{money(item.total)}</strong>
          </div>
        ))}
        {resumen.porMetodo.length === 0 && <p className="empty">Sin ingresos registrados.</p>}
      </div>
    </DataPanel>
  )
}
