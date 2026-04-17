import { useMemo, useState } from 'react'
import { PaginationControls } from '../../../components/common/PaginationControls'
import { TablePanel } from '../../../components/common/TablePanel'
import { dateTime, money } from '../../../utils/formatters'

const PAGE_SIZE = 8

export function IngresosTable({ ingresos, editIngreso, viewIngreso, deleteIngreso, saving }) {
  const [page, setPage] = useState(1)
  const pageCount = Math.max(1, Math.ceil(ingresos.length / PAGE_SIZE))
  const visibleIngresos = useMemo(() => ingresos.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), [ingresos, page])

  return (
    <TablePanel title="Ultimos ingresos" columns={['Concepto', 'Monto', 'Fecha', 'Acciones']}>
      {visibleIngresos.map((ingreso) => (
        <tr key={ingreso.id}>
          <td>{ingreso.concepto}</td>
          <td>{money(ingreso.monto)}</td>
          <td>{dateTime(ingreso.fechaPago)}</td>
          <td>
            <div className="table-actions">
              <button className="secondary action-view" onClick={() => viewIngreso(ingreso)} disabled={saving}>Ver</button>
              <button className="secondary action-edit" onClick={() => editIngreso(ingreso)} disabled={saving}>Editar</button>
              <button className="ghost" onClick={() => deleteIngreso(ingreso)} disabled={saving}>Borrar</button>
            </div>
          </td>
        </tr>
      ))}
      <tr className="table-pagination-row"><td colSpan="4"><PaginationControls page={Math.min(page, pageCount)} pageCount={pageCount} onPageChange={setPage} /></td></tr>
    </TablePanel>
  )
}
