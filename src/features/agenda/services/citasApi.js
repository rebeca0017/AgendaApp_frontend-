export function saveCita(request, id, citaForm) {
  return request(id ? `/api/citas/${id}` : '/api/citas', {
    method: id ? 'PUT' : 'POST',
    body: JSON.stringify({
      ...citaForm,
      id: id ?? 0,
      clienteId: Number(citaForm.clienteId),
      servicioId: Number(citaForm.servicioId),
      fechaInicio: citaForm.fechaInicio,
      fechaFin: citaForm.fechaFin || null,
    }),
  })
}

export function updateCitaEstado(request, id, estado, observaciones) {
  return request(`/api/citas/${id}/estado`, {
    method: 'PATCH',
    body: JSON.stringify({ estado, observaciones }),
  })
}
