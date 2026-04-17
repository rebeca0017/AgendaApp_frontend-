export function saveIngreso(request, id, ingresoForm) {
  return request(id ? `/api/ingresos/${id}` : '/api/ingresos', {
    method: id ? 'PUT' : 'POST',
    body: JSON.stringify({
      ...ingresoForm,
      id: id ?? 0,
      citaId: ingresoForm.citaId ? Number(ingresoForm.citaId) : null,
      clienteId: ingresoForm.clienteId ? Number(ingresoForm.clienteId) : null,
      monto: Number(ingresoForm.monto),
      fechaPago: ingresoForm.fechaPago,
    }),
  })
}

export function deleteIngreso(deleteEntity, ingreso) {
  return deleteEntity(`/api/ingresos/${ingreso.id}`, 'Ingreso eliminado.')
}
