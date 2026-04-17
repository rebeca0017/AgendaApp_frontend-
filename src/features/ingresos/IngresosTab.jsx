import { IngresoForm } from './components/IngresoForm'
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
      />

      <div className="stack">
        <IngresosSummary resumen={ingresos.resumen} />
        <IngresosTable
          ingresos={ingresos.ingresos}
          editIngreso={ingresos.editIngreso}
          deleteIngreso={ingresos.deleteIngreso}
          saving={ingresos.saving}
        />
      </div>
    </div>
  )
}
