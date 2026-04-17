import { useState } from 'react'
import { useAgendaContext } from '../../../context/useAgendaContext'
import { emptyIngreso } from '../../../constants/appConstants'
import { toInputDate } from '../../../utils/formatters'
import { deleteIngreso, saveIngreso } from '../services/ingresosApi'

export function useIngresos() {
  const {
    actions: { deleteEntity, loadData, request, saveAction, setMessage },
    data: { citas, clientes, ingresos, resumen },
    editing,
    navigation: { setActiveTab },
    setEditing,
    ui: { saving },
  } = useAgendaContext()
  const [ingresoForm, setIngresoForm] = useState(emptyIngreso)
  const clientesActivos = clientes.filter((cliente) => cliente.activo)
  const citasDisponiblesParaIngreso = citas.filter((cita) => !['Cancelada', 'NoAsistio'].includes(cita.estado))

  async function submitIngreso(event) {
    event.preventDefault()
    await saveAction(async () => {
      const id = editing.ingreso
      await saveIngreso(request, id, ingresoForm)
      resetIngreso()
      setMessage(id ? 'Ingreso actualizado.' : 'Ingreso registrado.')
      await loadData()
    })
  }

  function editIngreso(ingreso) {
    setIngresoForm({
      citaId: ingreso.citaId ? String(ingreso.citaId) : '',
      clienteId: ingreso.clienteId ? String(ingreso.clienteId) : '',
      concepto: ingreso.concepto,
      monto: ingreso.monto,
      metodoPago: ingreso.metodoPago,
      fechaPago: toInputDate(ingreso.fechaPago),
      referencia: ingreso.referencia ?? '',
      notas: ingreso.notas ?? '',
    })
    setEditing((current) => ({ ...current, ingreso: ingreso.id }))
    setActiveTab('ingresos')
  }

  function resetIngreso() {
    setIngresoForm(emptyIngreso)
    setEditing((current) => ({ ...current, ingreso: null }))
  }

  return {
    citasDisponiblesParaIngreso,
    clientesActivos,
    deleteIngreso: (ingreso) => deleteIngreso(deleteEntity, ingreso),
    editIngreso,
    editing,
    ingresoForm,
    ingresos,
    resetIngreso,
    resumen,
    saving,
    setIngresoForm,
    submitIngreso,
  }
}
