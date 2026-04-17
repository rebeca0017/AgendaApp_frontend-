import { useState } from 'react'
import { useAgendaContext } from '../../../context/useAgendaContext'
import { emptyIngreso } from '../../../constants/appConstants'
import { toInputDate } from '../../../utils/formatters'
import { deleteIngreso, saveIngreso } from '../services/ingresosApi'

export function useIngresos() {
  const {
    actions: { deleteEntity, loadData, request, saveAction, setMessage },
    data: { citas, clientes, ingresos, resumen, servicios },
    editing,
    navigation: { setActiveTab },
    setEditing,
    ui: { saving },
  } = useAgendaContext()
  const [ingresoForm, setIngresoForm] = useState(emptyIngreso)
  const [selectedIngreso, setSelectedIngreso] = useState(null)
  const clientesActivos = clientes.filter((cliente) => cliente.activo)
  const obtenerSaldoPendienteCita = (cita) => {
    const servicio = servicios.find((item) => String(item.id) === String(cita.servicioId))
    const totalServicio = Number(cita.servicioPrecio ?? servicio?.precio ?? 0)
    const totalAbonado = ingresos
      .filter((ingreso) => String(ingreso.citaId) === String(cita.id) && ingreso.id !== editing.ingreso)
      .reduce((total, ingreso) => total + Number(ingreso.monto ?? 0), 0)

    return totalServicio - totalAbonado
  }
  const citasDisponiblesParaIngreso = citas.filter((cita) => (
    ['Confirmada', 'Completada'].includes(cita.estado)
    && (!ingresoForm.clienteId || String(cita.clienteId) === String(ingresoForm.clienteId))
    && obtenerSaldoPendienteCita(cita) > 0
  ))
  const citaSeleccionada = citasDisponiblesParaIngreso.find((cita) => String(cita.id) === String(ingresoForm.citaId))
  const saldoCitaSeleccionada = citaSeleccionada ? obtenerSaldoPendienteCita(citaSeleccionada) : 0

  function actualizarIngresoForm(cambios) {
    setIngresoForm((actual) => {
      const siguiente = { ...actual, ...cambios }

      if (Object.prototype.hasOwnProperty.call(cambios, 'citaId')) {
        const citaSeleccionada = citas.find((cita) => String(cita.id) === String(cambios.citaId))

        if (citaSeleccionada) {
          const saldoPendiente = obtenerSaldoPendienteCita(citaSeleccionada)
          siguiente.clienteId = String(citaSeleccionada.clienteId)
          siguiente.monto = saldoPendiente > 0 ? saldoPendiente.toFixed(2) : ''

          if (!siguiente.concepto.trim()) {
            siguiente.concepto = `Pago ${citaSeleccionada.servicio}`
          }
        }
      }

      if (
        Object.prototype.hasOwnProperty.call(cambios, 'clienteId')
        && siguiente.citaId
        && !citas.some((cita) => (
          String(cita.id) === String(siguiente.citaId)
          && String(cita.clienteId) === String(siguiente.clienteId)
          && ['Confirmada', 'Completada'].includes(cita.estado)
          && obtenerSaldoPendienteCita(cita) > 0
        ))
      ) {
        siguiente.citaId = ''
      }

      return siguiente
    })
  }

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
    setSelectedIngreso(null)
    actualizarIngresoForm({
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
    closeIngresoDetail: () => setSelectedIngreso(null),
    citasDisponiblesParaIngreso,
    clientesActivos,
    deleteIngreso: (ingreso) => deleteIngreso(deleteEntity, ingreso),
    editIngreso,
    editing,
    ingresoForm,
    ingresos,
    resetIngreso,
    resumen,
    saldoCitaSeleccionada,
    saving,
    setIngresoForm: actualizarIngresoForm,
    submitIngreso,
    selectedIngreso,
    viewIngreso: setSelectedIngreso,
  }
}
