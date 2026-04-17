import { TablePanel } from '../../../components/common/TablePanel'
import { money } from '../../../utils/formatters'
import { serviceDurationLabel } from '../utils/serviceHelpers'

export function ServiciosTable({ servicios, editServicio, deleteServicio, saving }) {
  return (
    <TablePanel title="Servicios" columns={['Servicio', 'Precio', 'Duracion', 'Acciones']}>
      {servicios.map((servicio) => (
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
    </TablePanel>
  )
}
