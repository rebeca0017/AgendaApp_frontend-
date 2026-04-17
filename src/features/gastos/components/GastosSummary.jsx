import { DataPanel } from '../../../components/common/DataPanel'
import { money } from '../../../utils/formatters'

export function GastosSummary({ resumenGastos, gastosSuperanIngresos }) {
  return (
    <DataPanel title="Gastos por categoria">
      <div className="method-list">
        {resumenGastos.porCategoria.map((item) => (
          <div className={`method-row ${gastosSuperanIngresos ? 'amount-danger' : ''}`} key={item.categoria}>
            <span>{item.categoria}</span>
            <strong>{money(item.total)}</strong>
          </div>
        ))}
        {resumenGastos.porCategoria.length === 0 && <p className="empty">Sin gastos registrados.</p>}
      </div>
    </DataPanel>
  )
}
