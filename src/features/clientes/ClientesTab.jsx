import { ClienteDetailModal } from './components/ClienteDetailModal'
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
        mensajeIdentificacion={clientes.mensajeIdentificacion}
        submitCliente={clientes.submitCliente}
        resetCliente={clientes.resetCliente}
        saving={clientes.saving}
      />
      <ClientesTable
        search={clientes.search}
        setSearch={clientes.setSearch}
        clientesFiltrados={clientes.clientesFiltrados}
        viewCliente={clientes.viewCliente}
        editCliente={clientes.editCliente}
        cambiarEstadoCliente={clientes.cambiarEstadoCliente}
        deleteCliente={clientes.deleteCliente}
        saving={clientes.saving}
      />
      {clientes.selectedCliente && (
        <ClienteDetailModal
          cliente={clientes.selectedCliente}
          historialFinanciero={clientes.historialFinanciero}
          onClose={clientes.closeClienteDetail}
          saving={clientes.saving}
        />
      )}
    </div>
  )
}
