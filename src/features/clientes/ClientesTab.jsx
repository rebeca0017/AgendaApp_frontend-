import { ClienteForm } from './components/ClienteForm'
import { ClientesTable } from './components/ClientesTable'
import { useClientes } from './hooks/useClientes'

export function ClientesTab() {
  const clientes = useClientes()

  return (
    <div className="grid two-columns clientes-tab">
      <ClienteForm
        editing={clientes.editing}
        clienteForm={clientes.clienteForm}
        setClienteForm={clientes.setClienteForm}
        submitCliente={clientes.submitCliente}
        resetCliente={clientes.resetCliente}
        saving={clientes.saving}
      />
      <ClientesTable
        search={clientes.search}
        setSearch={clientes.setSearch}
        clientesFiltrados={clientes.clientesFiltrados}
        editCliente={clientes.editCliente}
        cambiarEstadoCliente={clientes.cambiarEstadoCliente}
        deleteCliente={clientes.deleteCliente}
        saving={clientes.saving}
      />
    </div>
  )
}
