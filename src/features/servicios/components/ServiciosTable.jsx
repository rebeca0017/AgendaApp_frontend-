import { useMemo, useState } from 'react'
import { PaginationControls } from '../../../components/common/PaginationControls'
import { TablePanel } from '../../../components/common/TablePanel'
import { money } from '../../../utils/formatters'
import { serviceDurationLabel } from '../utils/serviceHelpers'

const PAGE_SIZE = 8

export function ServiciosTable({ servicios, editServicio, deleteServicio, saving }) {
  const [page, setPage] = useState(1)
  const pageCount = Math.max(1, Math.ceil(servicios.length / PAGE_SIZE))
  const visibleServicios = useMemo(() => servicios.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), [servicios, page])

  return (
    <TablePanel title="Servicios" columns={['Servicio', 'Precio', 'Duracion', 'Acciones']}>
      {visibleServicios.map((servicio) => (
        <tr key={servicio.id}>
          <td>{servicio.nombre}</td>
          <td>{money(servicio.precio)}</td>
          <td>{serviceDurationLabel(servicio)}</td>
          <td>
            <div className="table-actions">
              <button className="secondary action-edit" onClick={() => editServicio(servicio)} disabled={saving}>Editar</button>
              <button className="ghost" onClick={() => deleteServicio(servicio)} disabled={saving}>Borrar</button>
            </div>
          </td>
        </tr>
      ))}
      <tr className="table-pagination-row"><td colSpan="4"><PaginationControls page={Math.min(page, pageCount)} pageCount={pageCount} onPageChange={setPage} /></td></tr>
    </TablePanel>
  )
}
