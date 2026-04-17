import { FormPanel } from '../../../components/common/FormPanel'
import { metodosPago } from '../../../constants/appConstants'
import { dateTime } from '../../../utils/formatters'

export function IngresoForm({
  editing,
  ingresoForm,
  setIngresoForm,
  submitIngreso,
  resetIngreso,
  saving,
  clientesActivos,
  citasDisponiblesParaIngreso,
}) {
  return (
    <FormPanel
      title={editing.ingreso ? 'Editar ingreso' : 'Nuevo ingreso'}
      onSubmit={submitIngreso}
      submitText={editing.ingreso ? 'Actualizar ingreso' : 'Registrar ingreso'}
      onCancel={editing.ingreso ? resetIngreso : null}
      saving={saving}
    >
      <label>
        Cliente
        <select value={ingresoForm.clienteId} onChange={(event) => setIngresoForm({ clienteId: event.target.value })}>
          <option value="">Sin cliente</option>
          {clientesActivos.map((cliente) => <option value={cliente.id} key={cliente.id}>{cliente.nombres} {cliente.apellidos}</option>)}
        </select>
      </label>
      <label>
        Cita
        <select value={ingresoForm.citaId} onChange={(event) => setIngresoForm({ citaId: event.target.value })}>
          <option value="">Sin cita</option>
          {citasDisponiblesParaIngreso.map((cita) => <option value={cita.id} key={cita.id}>{cita.cliente} - {cita.estado} - {dateTime(cita.fechaInicio)}</option>)}
        </select>
      </label>
      <label>Concepto<input required value={ingresoForm.concepto} onChange={(event) => setIngresoForm({ concepto: event.target.value })} /></label>
      <label>Monto<input required type="number" min="0.01" step="0.01" value={ingresoForm.monto} onChange={(event) => setIngresoForm({ monto: event.target.value })} /></label>
      <label>
        Metodo
        <select value={ingresoForm.metodoPago} onChange={(event) => setIngresoForm({ metodoPago: event.target.value })}>
          {metodosPago.map((metodo) => <option value={metodo} key={metodo}>{metodo}</option>)}
        </select>
      </label>
      <label>Fecha de pago<input required type="datetime-local" value={ingresoForm.fechaPago} onChange={(event) => setIngresoForm({ fechaPago: event.target.value })} /></label>
      <label className="span-2">Referencia<input value={ingresoForm.referencia} onChange={(event) => setIngresoForm({ referencia: event.target.value })} /></label>
    </FormPanel>
  )
}
