import { SearchBox } from '../../../components/common/SearchBox'
import { TablePanel } from '../../../components/common/TablePanel'

export function ClientesTable({
  search,
  setSearch,
  clientesFiltrados,
  editCliente,
  cambiarEstadoCliente,
  deleteCliente,
  saving,
}) {
  return (
    <TablePanel title="Clientes" columns={['Nombre', 'Contacto', 'Estado', 'Acciones']}>
      <tr className="table-filter-row">
        <td colSpan="4">
          <SearchBox value={search.clientes} onChange={(value) => setSearch({ ...search, clientes: value })} placeholder="Buscar por nombre, identificacion, telefono o email" />
        </td>
      </tr>
      {clientesFiltrados.map((cliente) => (
        <tr key={cliente.id}>
          <td>{cliente.nombres} {cliente.apellidos}</td>
          <td>{cliente.telefono || cliente.email || 'Sin contacto'}</td>
          <td><span className={`pill ${cliente.activo ? 'ok' : 'off'}`}>{cliente.activo ? 'Activo' : 'Inactivo'}</span></td>
          <td>
            <div className="table-actions">
              <button className="secondary action-edit" onClick={() => editCliente(cliente)} disabled={saving}>Editar</button>
              <button className={`secondary ${cliente.activo ? 'action-deactivate' : 'action-activate'}`} onClick={() => cambiarEstadoCliente(cliente)} disabled={saving}>{cliente.activo ? 'Inactivar' : 'Activar'}</button>
              <button className="ghost" onClick={() => deleteCliente(cliente)} disabled={saving}>Borrar</button>
            </div>
          </td>
        </tr>
      ))}
    </TablePanel>
  )
}
