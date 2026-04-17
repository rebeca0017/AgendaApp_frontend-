export function saveGasto(request, id, gastoForm) {
  return request(id ? `/api/gastos/${id}` : '/api/gastos', {
    method: id ? 'PUT' : 'POST',
    body: JSON.stringify({
      ...gastoForm,
      id: id ?? 0,
      monto: Number(gastoForm.monto),
      fechaGasto: gastoForm.fechaGasto,
    }),
  })
}

export function deleteGasto(deleteEntity, gasto) {
  return deleteEntity(`/api/gastos/${gasto.id}`, 'Gasto eliminado.')
}
