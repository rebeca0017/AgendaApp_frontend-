import { MINUTOS_POR_DIA } from '../utils/serviceHelpers'

export function saveServicio(request, id, servicioForm) {
  return request(id ? `/api/servicios/${id}` : '/api/servicios', {
    method: id ? 'PUT' : 'POST',
    body: JSON.stringify({
      ...servicioForm,
      id: id ?? 0,
      precio: Number(servicioForm.precio),
      duracionMinutos: Number(servicioForm.duracionDias) * MINUTOS_POR_DIA,
    }),
  })
}

export function deleteServicio(deleteEntity, servicio) {
  return deleteEntity(`/api/servicios/${servicio.id}`, 'Servicio eliminado.')
}
