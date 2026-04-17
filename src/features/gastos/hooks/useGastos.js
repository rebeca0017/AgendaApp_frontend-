import { useState } from 'react'
import { useAgendaContext } from '../../../context/useAgendaContext'
import { emptyGasto } from '../../../constants/appConstants'
import { toInputDate } from '../../../utils/formatters'
import { deleteGasto, saveGasto } from '../services/gastosApi'

export function useGastos() {
  const {
    actions: { deleteEntity, loadData, request, saveAction, setMessage },
    data: { gastos, resumen, resumenGastos },
    editing,
    navigation: { setActiveTab },
    setEditing,
    ui: { saving },
  } = useAgendaContext()
  const [gastoForm, setGastoForm] = useState(emptyGasto)
  const gastosSuperanIngresos = resumenGastos.total > resumen.total

  async function submitGasto(event) {
    event.preventDefault()
    await saveAction(async () => {
      const id = editing.gasto
      await saveGasto(request, id, gastoForm)
      resetGasto()
      setMessage(id ? 'Gasto actualizado.' : 'Gasto registrado.')
      await loadData()
    })
  }

  function editGasto(gasto) {
    setGastoForm({
      concepto: gasto.concepto,
      categoria: gasto.categoria,
      monto: gasto.monto,
      metodoPago: gasto.metodoPago,
      fechaGasto: toInputDate(gasto.fechaGasto),
      referencia: gasto.referencia ?? '',
      notas: gasto.notas ?? '',
    })
    setEditing((current) => ({ ...current, gasto: gasto.id }))
    setActiveTab('gastos')
  }

  function resetGasto() {
    setGastoForm(emptyGasto)
    setEditing((current) => ({ ...current, gasto: null }))
  }

  return {
    deleteGasto: (gasto) => deleteGasto(deleteEntity, gasto),
    editGasto,
    editing,
    gastoForm,
    gastos,
    gastosSuperanIngresos,
    resetGasto,
    resumenGastos,
    saving,
    setGastoForm,
    submitGasto,
  }
}
