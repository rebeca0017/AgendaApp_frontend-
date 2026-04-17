import { useMemo, useState } from 'react'
import { useAgendaContext } from '../../../context/useAgendaContext'
import { emptyCliente } from '../../../constants/appConstants'
import { normalize } from '../../../utils/formatters'
import { deleteCliente, saveCliente, updateClienteEstado } from '../services/clientesApi'

export function useClientes() {
  const {
    actions: { deleteEntity, loadData, request, saveAction, setMessage },
    data: { clientes },
    editing,
    navigation: { setActiveTab },
    search,
    setEditing,
    setSearch,
    ui: { saving },
  } = useAgendaContext()
  const [clienteForm, setClienteForm] = useState(emptyCliente)

  const clientesActivos = useMemo(() => clientes.filter((cliente) => cliente.activo), [clientes])

  const clientesFiltrados = useMemo(() => {
    const term = normalize(search.clientes)
    if (!term) return clientes
    return clientes.filter((cliente) =>
      normalize(`${cliente.nombres} ${cliente.apellidos} ${cliente.identificacion ?? ''} ${cliente.telefono ?? ''} ${cliente.email ?? ''}`).includes(term),
    )
  }, [clientes, search.clientes])

  async function submitCliente(event) {
    event.preventDefault()
    await saveAction(async () => {
      const id = editing.cliente
      await saveCliente(request, id, clienteForm)
      resetCliente()
      setMessage(id ? 'Cliente actualizado.' : 'Cliente registrado.')
      await loadData()
    })
  }

  function editCliente(cliente) {
    setClienteForm({
      nombres: cliente.nombres,
      apellidos: cliente.apellidos,
      identificacion: cliente.identificacion ?? '',
      telefono: cliente.telefono ?? '',
      email: cliente.email ?? '',
    })
    setEditing((current) => ({ ...current, cliente: cliente.id }))
    setActiveTab('clientes')
  }

  async function cambiarEstadoCliente(cliente) {
    await saveAction(async () => {
      await updateClienteEstado(request, cliente)
      setMessage(cliente.activo ? 'Cliente marcado como inactivo.' : 'Cliente reactivado.')
      await loadData()
    })
  }

  function resetCliente() {
    setClienteForm(emptyCliente)
    setEditing((current) => ({ ...current, cliente: null }))
  }

  return {
    cambiarEstadoCliente,
    clienteForm,
    clientesActivos,
    clientesFiltrados,
    deleteCliente: (cliente) => deleteCliente(deleteEntity, cliente),
    editCliente,
    editing,
    resetCliente,
    saving,
    search,
    setClienteForm,
    setSearch,
    submitCliente,
  }
}
