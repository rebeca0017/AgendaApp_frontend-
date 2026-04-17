import { IngresoForm } from './components/IngresoForm'
import { IngresoDetailModal } from './components/IngresoDetailModal'
import { IngresosSummary } from './components/IngresosSummary'
import { IngresosTable } from './components/IngresosTable'
import { useIngresos } from './hooks/useIngresos'

export function IngresosTab() {
  const ingresos = useIngresos()

  return (
    <div className="grid two-columns ingresos-tab">
      <IngresoForm
        editing={ingresos.editing}
        ingresoForm={ingresos.ingresoForm}
        setIngresoForm={ingresos.setIngresoForm}
        submitIngreso={ingresos.submitIngreso}
        resetIngreso={ingresos.resetIngreso}
        saving={ingresos.saving}
        clientesActivos={ingresos.clientesActivos}
        citasDisponiblesParaIngreso={ingresos.citasDisponiblesParaIngreso}
        saldoCitaSeleccionada={ingresos.saldoCitaSeleccionada}
      />

      <div className="stack">
        <IngresosSummary resumen={ingresos.resumen} />
        <IngresosTable
          ingresos={ingresos.ingresos}
          viewIngreso={ingresos.viewIngreso}
          editIngreso={ingresos.editIngreso}
          deleteIngreso={ingresos.deleteIngreso}
          saving={ingresos.saving}
        />
      </div>

      {ingresos.selectedIngreso && (
        <IngresoDetailModal
          ingreso={ingresos.selectedIngreso}
          onClose={ingresos.closeIngresoDetail}
          saving={ingresos.saving}
        />
      )}
    </div>
  )
}
