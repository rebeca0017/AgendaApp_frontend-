import { FormPanel } from '../../../components/common/FormPanel'

export function ClienteForm({ editing, clienteForm, setClienteForm, mensajeIdentificacion, submitCliente, resetCliente, saving }) {
  return (
    <FormPanel
      title={editing.cliente ? 'Editar cliente' : 'Nuevo cliente'}
      onSubmit={submitCliente}
      submitText={editing.cliente ? 'Actualizar cliente' : 'Guardar cliente'}
      onCancel={editing.cliente ? resetCliente : null}
      saving={saving}
    >
      <label>Nombres<input required value={clienteForm.nombres} onChange={(event) => setClienteForm({ ...clienteForm, nombres: event.target.value })} /></label>
      <label>Apellidos<input required value={clienteForm.apellidos} onChange={(event) => setClienteForm({ ...clienteForm, apellidos: event.target.value })} /></label>
      <label>
        Identificacion
        <input className={mensajeIdentificacion ? 'input-error' : ''} value={clienteForm.identificacion} onChange={(event) => setClienteForm({ ...clienteForm, identificacion: event.target.value })} />
        {mensajeIdentificacion && <span className="field-error">{mensajeIdentificacion}</span>}
      </label>
      <label>Telefono<input value={clienteForm.telefono} onChange={(event) => setClienteForm({ ...clienteForm, telefono: event.target.value })} /></label>
      <label className="span-2">Email<input type="email" value={clienteForm.email} onChange={(event) => setClienteForm({ ...clienteForm, email: event.target.value })} /></label>
    </FormPanel>
  )
}
