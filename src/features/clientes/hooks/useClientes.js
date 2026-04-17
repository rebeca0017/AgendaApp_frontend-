import { useMemo, useState } from 'react'
import { useAgendaContext } from '../../../context/useAgendaContext'
import { emptyCliente } from '../../../constants/appConstants'
import { normalize } from '../../../utils/formatters'
import { deleteCliente, saveCliente, updateClienteEstado } from '../services/clientesApi'

function validarCedulaEcuatoriana(identificacion) {
  const cedula = String(identificacion ?? '').trim()

  if (!cedula) {
    return ''
  }

  if (!/^\d{10}$/.test(cedula)) {
    return 'La identificacion debe tener 10 numeros.'
  }

  const provincia = Number(cedula.slice(0, 2))
  const tercerDigito = Number(cedula[2])

  if (provincia < 1 || provincia > 24 || tercerDigito >= 6) {
    return 'La identificacion no es una cedula ecuatoriana valida.'
  }

  let suma = 0

  for (let i = 0; i < 9; i += 1) {
    const digito = Number(cedula[i])
    let valor = i % 2 === 0 ? digito * 2 : digito

    if (valor > 9) {
      valor -= 9
    }

    suma += valor
  }

  const verificador = suma % 10 === 0 ? 0 : 10 - (suma % 10)
  return verificador === Number(cedula[9]) ? '' : 'La identificacion no es una cedula ecuatoriana valida.'
}

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
  const [selectedCliente, setSelectedCliente] = useState(null)

  const clientesActivos = useMemo(() => clientes.filter((cliente) => cliente.activo), [clientes])
  const errorIdentificacion = useMemo(() => validarCedulaEcuatoriana(clienteForm.identificacion), [clienteForm.identificacion])
  const identificacionDuplicada = useMemo(() => {
    const identificacion = normalize(clienteForm.identificacion ?? '')

    if (!identificacion || errorIdentificacion) {
      return false
    }

    return clientes.some((cliente) => (
      cliente.id !== editing.cliente
      && normalize(cliente.identificacion ?? '') === identificacion
    ))
  }, [clienteForm.identificacion, clientes, editing.cliente, errorIdentificacion])
  const mensajeIdentificacion = errorIdentificacion || (identificacionDuplicada ? 'Esa identificacion ya existe.' : '')

  const clientesFiltrados = useMemo(() => {
    const term = normalize(search.clientes)
    if (!term) return clientes
    return clientes.filter((cliente) =>
      normalize(`${cliente.nombres} ${cliente.apellidos} ${cliente.identificacion ?? ''}`).includes(term),
    )
  }, [clientes, search.clientes])

  async function submitCliente(event) {
    event.preventDefault()

    if (mensajeIdentificacion) {
      return
    }

    await saveAction(async () => {
      const id = editing.cliente
      await saveCliente(request, id, clienteForm)
      resetCliente()
      setMessage(id ? 'Cliente actualizado.' : 'Cliente registrado.')
      await loadData()
    })
  }

  function editCliente(cliente) {
    setSelectedCliente(null)
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
    closeClienteDetail: () => setSelectedCliente(null),
    deleteCliente: (cliente) => deleteCliente(deleteEntity, cliente),
    editCliente,
    editing,
    mensajeIdentificacion,
    resetCliente,
    saving,
    search,
    selectedCliente,
    setClienteForm,
    setSearch,
    submitCliente,
    viewCliente: setSelectedCliente,
  }
}
