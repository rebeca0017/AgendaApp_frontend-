import { GastoForm } from './components/GastoForm'
import { GastosSummary } from './components/GastosSummary'
import { GastosTable } from './components/GastosTable'
import { useGastos } from './hooks/useGastos'

export function GastosTab() {
  const gastos = useGastos()

  return (
    <div className="grid two-columns gastos-tab">
      <GastoForm
        editing={gastos.editing}
        gastoForm={gastos.gastoForm}
        setGastoForm={gastos.setGastoForm}
        submitGasto={gastos.submitGasto}
        resetGasto={gastos.resetGasto}
        saving={gastos.saving}
      />

      <div className="stack">
        <GastosSummary resumenGastos={gastos.resumenGastos} gastosSuperanIngresos={gastos.gastosSuperanIngresos} />
        <GastosTable
          gastos={gastos.gastos}
          gastosSuperanIngresos={gastos.gastosSuperanIngresos}
          editGasto={gastos.editGasto}
          deleteGasto={gastos.deleteGasto}
          saving={gastos.saving}
        />
      </div>
    </div>
  )
}
