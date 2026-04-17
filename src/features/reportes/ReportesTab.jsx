import { useEffect, useState } from 'react'
import { DataPanel } from '../../components/common/DataPanel'
import { useAgendaContext } from '../../context/useAgendaContext'
import { dateTime, money } from '../../utils/formatters'

const estadosCobrables = new Set(['Confirmada', 'Completada'])

const emptyResumen = {
  totalIngresos: 0,
  totalGastos: 0,
  gananciaNeta: 0,
  citasCompletadas: 0,
  citasCanceladas: 0,
  citasNoAsistio: 0,
  ingresosPorMes: [],
  gastosPorMes: [],
}

export function ReportesTab() {
  const {
    actions: { request, setError },
  } = useAgendaContext()
  const [resumen, setResumen] = useState(emptyResumen)
  const [saldos, setSaldos] = useState([])

  useEffect(() => {
    let activo = true

    async function cargarReportes() {
      try {
        const [resumenData, saldosData] = await Promise.all([
          request('/api/reportes/resumen-financiero'),
          request('/api/reportes/saldos-citas'),
        ])

        if (activo) {
          setResumen(resumenData)
          setSaldos(saldosData.filter((cita) => estadosCobrables.has(cita.estadoCita)))
        }
      } catch (err) {
        if (activo) setError(err.message)
      }
    }

    cargarReportes()

    return () => {
      activo = false
    }
  }, [request, setError])

  return (
    <div className="grid reportes-tab">
      <section className="metrics" aria-label="Resumen financiero">
        <article className="metric"><div><span>Ingresos</span><strong>{money(resumen.totalIngresos)}</strong></div></article>
        <article className="metric"><div><span>Gastos</span><strong>{money(resumen.totalGastos)}</strong></div></article>
        <article className={`metric ${resumen.gananciaNeta < 0 ? 'metric-danger' : ''}`}><div><span>Ganancia neta</span><strong>{money(resumen.gananciaNeta)}</strong></div></article>
        <article className="metric"><div><span>Citas completadas</span><strong>{resumen.citasCompletadas}</strong></div></article>
      </section>

      <div className="grid two-columns">
        <DataPanel title="Ingresos por mes">
          <div className="method-list">
            {resumen.ingresosPorMes.length === 0 ? <p className="empty">Sin datos.</p> : resumen.ingresosPorMes.map((item) => (
              <div className="method-row" key={item.mes}><span>{item.mes}</span><strong>{money(item.total)}</strong></div>
            ))}
          </div>
        </DataPanel>

        <DataPanel title="Gastos por mes">
          <div className="method-list">
            {resumen.gastosPorMes.length === 0 ? <p className="empty">Sin datos.</p> : resumen.gastosPorMes.map((item) => (
              <div className="method-row" key={item.mes}><span>{item.mes}</span><strong>{money(item.total)}</strong></div>
            ))}
          </div>
        </DataPanel>
      </div>

      <DataPanel title="Abonos y saldos por cita">
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Servicio</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Abonado</th>
                <th>Saldo</th>
                <th>Pago</th>
              </tr>
            </thead>
            <tbody>
              {saldos.map((cita) => (
                <tr key={cita.citaId}>
                  <td>{cita.cliente}</td>
                  <td>{cita.servicio}</td>
                  <td>{dateTime(cita.fechaInicio)}</td>
                  <td>{money(cita.totalServicio)}</td>
                  <td>{money(cita.totalAbonado)}</td>
                  <td>{money(cita.saldoPendiente)}</td>
                  <td>{cita.estadoPago}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DataPanel>
    </div>
  )
}
