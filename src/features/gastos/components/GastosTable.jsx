import { TablePanel } from '../../../components/common/TablePanel'
import { dateTime, money } from '../../../utils/formatters'

export function GastosTable({ gastos, gastosSuperanIngresos, editGasto, deleteGasto, saving }) {
  return (
    <TablePanel title="Ultimos gastos" columns={['Concepto', 'Categoria', 'Monto', 'Fecha', 'Acciones']}>
      {gastos.slice(0, 8).map((gasto) => (
        <tr key={gasto.id}>
          <td>{gasto.concepto}</td>
          <td>{gasto.categoria}</td>
          <td className={gastosSuperanIngresos ? 'amount-danger' : ''}>{money(gasto.monto)}</td>
          <td>{dateTime(gasto.fechaGasto)}</td>
          <td>
            <div className="table-actions">
              <button className="secondary action-edit" onClick={() => editGasto(gasto)} disabled={saving}>Editar</button>
              <button className="ghost" onClick={() => deleteGasto(gasto)} disabled={saving}>Borrar</button>
            </div>
          </td>
        </tr>
      ))}
    </TablePanel>
  )
}
