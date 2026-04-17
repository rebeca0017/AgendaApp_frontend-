import { useMemo, useState } from 'react'
import { DataPanel } from '../../../components/common/DataPanel'
import { PaginationControls } from '../../../components/common/PaginationControls'
import { SearchBox } from '../../../components/common/SearchBox'

const PAGE_SIZE = 8

export function ClientesTable({
  search,
  setSearch,
  clientesFiltrados,
  viewCliente,
  editCliente,
  cambiarEstadoCliente,
  deleteCliente,
  saving,
}) {
  const [page, setPage] = useState(1)
  const pageCount = Math.max(1, Math.ceil(clientesFiltrados.length / PAGE_SIZE))
  const visibleClientes = useMemo(() => clientesFiltrados.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), [clientesFiltrados, page])

  return (
    <DataPanel title="Clientes">
      <SearchBox value={search.clientes} onChange={(value) => setSearch({ ...search, clientes: value })} placeholder="Buscar por nombre o identificacion" />
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Contacto</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {visibleClientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.nombres} {cliente.apellidos}</td>
                <td>{cliente.email || cliente.telefono || 'Sin contacto'}</td>
                <td><span className={`pill ${cliente.activo ? 'ok' : 'off'}`}>{cliente.activo ? 'Activo' : 'Inactivo'}</span></td>
                <td>
                  <div className="table-actions">
                    <button className="secondary action-view" onClick={() => viewCliente(cliente)} disabled={saving}>Ver</button>
                    <button className="secondary action-edit" onClick={() => editCliente(cliente)} disabled={saving}>Editar</button>
                    <button className={`secondary ${cliente.activo ? 'action-deactivate' : 'action-activate'}`} onClick={() => cambiarEstadoCliente(cliente)} disabled={saving}>{cliente.activo ? 'Inactivar' : 'Activar'}</button>
                    <button className="ghost" onClick={() => deleteCliente(cliente)} disabled={saving}>Borrar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PaginationControls page={Math.min(page, pageCount)} pageCount={pageCount} onPageChange={setPage} />
    </DataPanel>
  )
}
