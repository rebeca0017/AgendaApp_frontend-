export function saveCliente(request, id, clienteForm) {
  return request(id ? `/api/clientes/${id}` : '/api/clientes', {
    method: id ? 'PUT' : 'POST',
    body: JSON.stringify({ ...clienteForm, id: id ?? 0 }),
  })
}

export function updateClienteEstado(request, cliente) {
  return request(`/api/clientes/${cliente.id}/estado`, {
    method: 'PATCH',
    body: JSON.stringify({ activo: !cliente.activo }),
  })
}

export function deleteCliente(deleteEntity, cliente) {
  return deleteEntity(`/api/clientes/${cliente.id}`, 'Cliente desactivado.')
}
