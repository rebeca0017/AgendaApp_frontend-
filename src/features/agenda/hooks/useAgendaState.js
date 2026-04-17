import { useState } from 'react'
import { requiereObservacion } from '../utils/appointmentHelpers'

export function useAgendaState({ cambiarEstadoCita, editCita }) {
  const [estadoPendiente, setEstadoPendiente] = useState(null)
  const [observacionEstado, setObservacionEstado] = useState('')
  const [citaDetalle, setCitaDetalle] = useState(null)

  function solicitarCambioEstado(cita, estado) {
    if (requiereObservacion(estado)) {
      setEstadoPendiente({ cita, estado })
      setObservacionEstado('')
      return
    }

    cambiarEstadoCita(cita.id, estado)
  }

  function cerrarModalEstado() {
    setEstadoPendiente(null)
    setObservacionEstado('')
  }

  async function confirmarCambioEstado(event) {
    event.preventDefault()
    const observacion = observacionEstado.trim()
    if (!estadoPendiente || !observacion) return

    await cambiarEstadoCita(estadoPendiente.cita.id, estadoPendiente.estado, observacion)
    cerrarModalEstado()
  }

  function abrirDetalleCita(cita) {
    setCitaDetalle(cita)
  }

  function cerrarDetalleCita() {
    setCitaDetalle(null)
  }

  function editarDesdeDetalle(cita) {
    cerrarDetalleCita()
    editCita(cita)
  }

  return {
    abrirDetalleCita,
    cerrarDetalleCita,
    cerrarModalEstado,
    citaDetalle,
    confirmarCambioEstado,
    editarDesdeDetalle,
    estadoPendiente,
    observacionEstado,
    setObservacionEstado,
    solicitarCambioEstado,
  }
}
