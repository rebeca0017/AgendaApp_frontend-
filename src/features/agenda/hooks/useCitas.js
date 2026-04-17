import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAgendaContext } from '../../../context/useAgendaContext'
import { emptyCita } from '../../../constants/appConstants'
import { dateTime, normalize, toInputDate } from '../../../utils/formatters'
import { saveCita, updateCitaEstado } from '../services/citasApi'

const RECORDATORIO_CITA_MS = 60 * 60 * 1000

function toSafeInputDate(value) {
  return value ? toInputDate(value) : ''
}

export function useCitas() {
  const {
    actions: { loadData, request, saveAction, setError, setMessage },
    data: { citas, clientes, servicios },
    editing,
    navigation: { setActiveTab },
    search,
    setEditing,
    setSearch,
    ui: { saving },
  } = useAgendaContext()
  const [citaForm, setCitaForm] = useState(emptyCita)
  const [currentTime, setCurrentTime] = useState(() => new Date())

  const citasActivas = useMemo(() => citas.filter((cita) => !['Cancelada', 'NoAsistio'].includes(cita.estado)), [citas])
  const citasCompletadas = useMemo(() => citas.filter((cita) => cita.estado === 'Completada'), [citas])
  const citasDisponiblesParaIngreso = citasActivas
  const clientesActivos = useMemo(() => clientes.filter((cliente) => cliente.activo), [clientes])
  const serviciosActivos = useMemo(() => servicios.filter((servicio) => servicio.activo), [servicios])
  const fechaMinimaCita = toInputDate(new Date())

  const actualizarCitaForm = useCallback((value) => {
    setCitaForm((current) => {
      const next = typeof value === 'function' ? value(current) : value
      const servicio = servicios.find((item) => String(item.id) === String(next.servicioId))

      if (!next.fechaInicio || !servicio) {
        return { ...next, fechaFin: '' }
      }

      const fechaInicio = new Date(next.fechaInicio)
      const fechaFin = toInputDate(new Date(fechaInicio.getTime() + servicio.duracionMinutos * 60000))
      return { ...next, fechaFin }
    })
  }, [servicios])

  useEffect(() => {
    const timerId = window.setInterval(() => setCurrentTime(new Date()), 60000)
    return () => window.clearInterval(timerId)
  }, [])

  const citasHoy = useMemo(() => {
    const today = currentTime.toDateString()
    return citasActivas.filter((cita) => {
      const fechaInicio = new Date(cita.fechaInicio)
      const finRecordatorio = new Date(fechaInicio.getTime() + RECORDATORIO_CITA_MS)
      return cita.estado !== 'Completada' && fechaInicio.toDateString() === today && finRecordatorio >= currentTime
    })
  }, [citasActivas, currentTime])

  const recordatoriosCitas = useMemo(() => ({
    hoy: citasHoy,
    confirmadas: citasActivas
      .filter((cita) => cita.estado === 'Confirmada')
      .sort((a, b) => new Date(a.fechaInicio) - new Date(b.fechaInicio))
      .slice(0, 5),
    pendientesConfirmar: citasActivas
      .filter((cita) => cita.estado === 'Programada')
      .sort((a, b) => new Date(a.fechaInicio) - new Date(b.fechaInicio))
      .slice(0, 5),
  }), [citasActivas, citasHoy])

  const citasFiltradas = useMemo(() => {
    const term = normalize(search.citas)
    if (!term) return citas
    return citas.filter((cita) =>
      normalize(`${cita.cliente} ${cita.servicio} ${cita.estado} ${cita.motivo ?? ''} ${dateTime(cita.fechaInicio)} ${cita.fechaFin ? dateTime(cita.fechaFin) : ''}`).includes(term),
    )
  }, [citas, search.citas])

  const proximasCitas = useMemo(
    () => [...citasFiltradas].sort((a, b) => new Date(b.fechaInicio) - new Date(a.fechaInicio)),
    [citasFiltradas],
  )

  async function submitCita(event) {
    event.preventDefault()
    await saveAction(async () => {
      if (new Date(citaForm.fechaInicio) <= new Date()) {
        throw new Error('La fecha de la cita debe ser posterior a la fecha y hora actual.')
      }

      if (citaForm.fechaFin && new Date(citaForm.fechaFin) <= new Date(citaForm.fechaInicio)) {
        throw new Error('La fecha para completar el pedido debe ser posterior a la fecha de visita.')
      }

      const id = editing.cita
      await saveCita(request, id, citaForm)
      resetCita()
      setMessage(id ? 'Cita actualizada.' : 'Cita agendada.')
      await loadData()
    })
  }

  function editCita(cita) {
    if (cita.estado === 'Completada') {
      setError('La cita completada ya esta cerrada y no se puede modificar.')
      return
    }

    actualizarCitaForm({
      clienteId: String(cita.clienteId),
      servicioId: String(cita.servicioId),
      fechaInicio: toSafeInputDate(cita.fechaInicio),
      fechaFin: toSafeInputDate(cita.fechaFin),
      estado: cita.estado,
      motivo: cita.motivo ?? '',
      observaciones: cita.observaciones ?? '',
    })
    setEditing((current) => ({ ...current, cita: cita.id }))
    setActiveTab('agenda')
  }

  async function cambiarEstadoCita(id, estado, observaciones = null) {
    const cita = citas.find((item) => item.id === id)
    if (cita?.estado === 'Completada' && estado !== 'Completada') {
      setError('La cita completada ya esta cerrada y no se puede cambiar.')
      return
    }

    if (['Cancelada', 'NoAsistio'].includes(estado) && !observaciones) {
      setError('Debe ingresar la razon en observaciones.')
      return
    }

    await saveAction(async () => {
      await updateCitaEstado(request, id, estado, observaciones)
      setMessage('Estado de cita actualizado.')
      await loadData()
    })
  }

  function resetCita() {
    setCitaForm(emptyCita)
    setEditing((current) => ({ ...current, cita: null }))
  }

  return {
    cambiarEstadoCita,
    citaForm,
    citasCompletadas,
    citasDisponiblesParaIngreso,
    citasHoy,
    clientesActivos,
    editCita,
    editing,
    fechaMinimaCita,
    proximasCitas,
    recordatoriosCitas,
    resetCita,
    saving,
    search,
    serviciosActivos,
    setCitaForm: actualizarCitaForm,
    setSearch,
    submitCita,
  }
}
