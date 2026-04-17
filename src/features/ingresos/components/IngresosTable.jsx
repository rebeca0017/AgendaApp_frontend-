import { TablePanel } from '../../../components/common/TablePanel'
import { dateTime, money } from '../../../utils/formatters'

export function IngresosTable({ ingresos, editIngreso, viewIngreso, deleteIngreso, saving }) {
  return (
    <TablePanel title="Ultimos ingresos" columns={['Concepto', 'Monto', 'Fecha', 'Acciones']}>
      {ingresos.slice(0, 8).map((ingreso) => (
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
    </TablePanel>
  )
}
