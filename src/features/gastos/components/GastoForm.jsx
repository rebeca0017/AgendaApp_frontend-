import { FormPanel } from '../../../components/common/FormPanel'
import { metodosPago } from '../../../constants/appConstants'

export function GastoForm({ editing, gastoForm, setGastoForm, submitGasto, resetGasto, saving }) {
  return (
    <FormPanel
      title={editing.gasto ? 'Editar gasto' : 'Nuevo gasto'}
      onSubmit={submitGasto}
      submitText={editing.gasto ? 'Actualizar gasto' : 'Registrar gasto'}
      onCancel={editing.gasto ? resetGasto : null}
      saving={saving}
    >
      <label className="span-2">Concepto<input required value={gastoForm.concepto} onChange={(event) => setGastoForm({ ...gastoForm, concepto: event.target.value })} /></label>
      <label>Categoria<input required value={gastoForm.categoria} onChange={(event) => setGastoForm({ ...gastoForm, categoria: event.target.value })} /></label>
      <label>Monto<input required type="number" min="0.01" step="0.01" value={gastoForm.monto} onChange={(event) => setGastoForm({ ...gastoForm, monto: event.target.value })} /></label>
      <label>
        Metodo
        <select value={gastoForm.metodoPago} onChange={(event) => setGastoForm({ ...gastoForm, metodoPago: event.target.value })}>
          {metodosPago.map((metodo) => <option value={metodo} key={metodo}>{metodo}</option>)}
        </select>
      </label>
      <label>Fecha<input required type="datetime-local" value={gastoForm.fechaGasto} onChange={(event) => setGastoForm({ ...gastoForm, fechaGasto: event.target.value })} /></label>
      <label className="span-2">Referencia<input value={gastoForm.referencia} onChange={(event) => setGastoForm({ ...gastoForm, referencia: event.target.value })} /></label>
      <label className="span-2">Notas<textarea value={gastoForm.notas} onChange={(event) => setGastoForm({ ...gastoForm, notas: event.target.value })} /></label>
    </FormPanel>
  )
}
