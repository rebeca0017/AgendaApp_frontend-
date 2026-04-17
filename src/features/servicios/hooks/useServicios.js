import { useMemo, useState } from 'react'
import { useAgendaContext } from '../../../context/useAgendaContext'
import { emptyServicio } from '../../../constants/appConstants'
import { MINUTOS_POR_DIA } from '../utils/serviceHelpers'
import { deleteServicio, saveServicio } from '../services/serviciosApi'

export function useServicios() {
  const {
    actions: { deleteEntity, loadData, request, saveAction, setMessage },
    data: { servicios },
    editing,
    navigation: { setActiveTab },
    setEditing,
    ui: { saving },
  } = useAgendaContext()
  const [servicioForm, setServicioForm] = useState(emptyServicio)

  const serviciosActivos = useMemo(() => servicios.filter((servicio) => servicio.activo), [servicios])

  async function submitServicio(event) {
    event.preventDefault()
    await saveAction(async () => {
      const id = editing.servicio
      await saveServicio(request, id, servicioForm)
      resetServicio()
      setMessage(id ? 'Servicio actualizado.' : 'Servicio registrado.')
      await loadData()
    })
  }

  function editServicio(servicio) {
    setServicioForm({
      nombre: servicio.nombre,
      descripcion: servicio.descripcion ?? '',
      precio: servicio.precio,
      duracionDias: Math.max(1, Math.ceil(servicio.duracionMinutos / MINUTOS_POR_DIA)),
    })
    setEditing((current) => ({ ...current, servicio: servicio.id }))
    setActiveTab('servicios')
  }

  function resetServicio() {
    setServicioForm(emptyServicio)
    setEditing((current) => ({ ...current, servicio: null }))
  }

  return {
    deleteServicio: (servicio) => deleteServicio(deleteEntity, servicio),
    editServicio,
    editing,
    resetServicio,
    saving,
    servicioForm,
    servicios,
    serviciosActivos,
    setServicioForm,
    submitServicio,
  }
}
