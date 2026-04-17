import { FormPanel } from '../../../components/common/FormPanel'
import { metodosPago } from '../../../constants/appConstants'
import { dateTime, money } from '../../../utils/formatters'

export function IngresoForm({
  editing,
  ingresoForm,
  setIngresoForm,
  submitIngreso,
  resetIngreso,
  saving,
  clientesActivos,
  citasDisponiblesParaIngreso,
  saldoCitaSeleccionada,
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
          {ingresoForm.clienteId && citasDisponiblesParaIngreso.length === 0 && (
            <option value="" disabled>No hay citas pendientes de cobro</option>
          )}
          {citasDisponiblesParaIngreso.map((cita) => <option value={cita.id} key={cita.id}>{cita.cliente} - {cita.estado} - {dateTime(cita.fechaInicio)}</option>)}
        </select>
        {ingresoForm.clienteId && citasDisponiblesParaIngreso.length === 0 && (
          <small className="field-hint">Este cliente no tiene citas confirmadas o completadas con saldo pendiente.</small>
        )}
      </label>
      <label>Concepto<input required value={ingresoForm.concepto} onChange={(event) => setIngresoForm({ concepto: event.target.value })} /></label>
      <label>
        Monto a pagar / abono
        <input
          required
          type="number"
          min="0.01"
          max={ingresoForm.citaId && saldoCitaSeleccionada > 0 ? saldoCitaSeleccionada.toFixed(2) : undefined}
          step="0.01"
          value={ingresoForm.monto}
          onChange={(event) => setIngresoForm({ monto: event.target.value })}
        />
        {ingresoForm.citaId && saldoCitaSeleccionada > 0 && (
          <small className="field-hint">Saldo pendiente de la cita: {money(saldoCitaSeleccionada)}. Puedes registrar un abono menor.</small>
        )}
      </label>
      <label>
        Metodo
        <select value={ingresoForm.metodoPago} onChange={(event) => setIngresoForm({ metodoPago: event.target.value })}>
          {metodosPago.map((metodo) => <option value={metodo} key={metodo}>{metodo}</option>)}
        </select>
      </label>
      <label>Fecha de pago del ingreso<input required type="datetime-local" value={ingresoForm.fechaPago} onChange={(event) => setIngresoForm({ fechaPago: event.target.value })} /></label>
      <label className="span-2">Referencia<input value={ingresoForm.referencia} onChange={(event) => setIngresoForm({ referencia: event.target.value })} /></label>
    </FormPanel>
  )
}
