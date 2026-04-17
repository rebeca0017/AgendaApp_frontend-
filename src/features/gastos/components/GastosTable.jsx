import { useMemo, useState } from 'react'
import { PaginationControls } from '../../../components/common/PaginationControls'
import { TablePanel } from '../../../components/common/TablePanel'
import { dateTime, money } from '../../../utils/formatters'

const PAGE_SIZE = 8

export function GastosTable({ gastos, gastosSuperanIngresos, viewGasto, editGasto, deleteGasto, saving }) {
  const [page, setPage] = useState(1)
  const pageCount = Math.max(1, Math.ceil(gastos.length / PAGE_SIZE))
  const visibleGastos = useMemo(() => gastos.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), [gastos, page])

  return (
    <TablePanel title="Ultimos gastos" columns={['Concepto', 'Categoria', 'Monto', 'Fecha', 'Acciones']}>
      {visibleGastos.map((gasto) => (
        <tr key={gasto.id}>
          <td>{gasto.concepto}</td>
          <td>{gasto.categoria}</td>
          <td className={gastosSuperanIngresos ? 'amount-danger' : ''}>{money(gasto.monto)}</td>
          <td>{dateTime(gasto.fechaGasto)}</td>
          <td>
            <div className="table-actions">
              <button className="secondary action-view" onClick={() => viewGasto(gasto)} disabled={saving}>Ver</button>
              <button className="secondary action-edit" onClick={() => editGasto(gasto)} disabled={saving}>Editar</button>
              <button className="ghost" onClick={() => deleteGasto(gasto)} disabled={saving}>Borrar</button>
            </div>
          </td>
        </tr>
      ))}
      <tr className="table-pagination-row"><td colSpan="5"><PaginationControls page={Math.min(page, pageCount)} pageCount={pageCount} onPageChange={setPage} /></td></tr>
    </TablePanel>
  )
}
