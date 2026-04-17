import { Metric } from '../common/Metric'
import { money } from '../../utils/formatters'
import citasIcon from '../../assets/metrics/citas.png'
import clientesIcon from '../../assets/metrics/clientes.png'
import gastosIcon from '../../assets/metrics/gastos.png'
import ingresosIcon from '../../assets/metrics/ingresos.png'
import serviciosIcon from '../../assets/metrics/servicios.png'

export function MetricsBar({ clientesActivos, serviciosActivos, citasCompletadas, totalIngresos, totalGastos }) {
  const gastosSuperanIngresos = totalGastos > totalIngresos

  return (
    <section className="metrics" aria-label="Resumen">
      <Metric label="Clientes activos" value={clientesActivos} icon={clientesIcon} />
      <Metric label="Servicios activos" value={serviciosActivos} icon={serviciosIcon} />
      <Metric label="Citas completas" value={citasCompletadas} icon={citasIcon} />
      <Metric label="Ingresos" value={money(totalIngresos)} icon={ingresosIcon} />
      <Metric label="Gastos" value={money(totalGastos)} icon={gastosIcon} variant={gastosSuperanIngresos ? 'metric-danger' : ''} />
    </section>
  )
}
