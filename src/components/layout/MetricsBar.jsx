import { Metric } from '../common/Metric'
import { money } from '../../utils/formatters'

export function MetricsBar({ clientesActivos, serviciosActivos, citasCompletadas, totalIngresos, totalGastos }) {
  const gastosSuperanIngresos = totalGastos > totalIngresos

  return (
    <section className="metrics" aria-label="Resumen">
      <Metric label="Clientes activos" value={clientesActivos} />
      <Metric label="Servicios activos" value={serviciosActivos} />
      <Metric label="Citas completas" value={citasCompletadas} />
      <Metric label="Ingresos" value={money(totalIngresos)} />
      <Metric label="Gastos" value={money(totalGastos)} variant={gastosSuperanIngresos ? 'metric-danger' : ''} />
    </section>
  )
}
