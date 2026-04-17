import { FormPanel } from '../../../components/common/FormPanel'

export function UserForm({ modificarUsuario, setModificarUsuario, submitModificarUsuario, saving }) {
  return (
    <FormPanel
      title="Actualizar usuario"
      onSubmit={submitModificarUsuario}
      submitText="Guardar usuario"
      saving={saving}
    >
      <label>Nombre<input required value={modificarUsuario.nombre} onChange={(event) => setModificarUsuario({ ...modificarUsuario, nombre: event.target.value })} /></label>
      <label>Apellido<input required value={modificarUsuario.apellido} onChange={(event) => setModificarUsuario({ ...modificarUsuario, apellido: event.target.value })} /></label>
      <label>Email actual<input required type="email" value={modificarUsuario.emailActual} onChange={(event) => setModificarUsuario({ ...modificarUsuario, emailActual: event.target.value })} /></label>
      <label>Nuevo email<input required type="email" value={modificarUsuario.nuevoEmail} onChange={(event) => setModificarUsuario({ ...modificarUsuario, nuevoEmail: event.target.value })} /></label>
    </FormPanel>
  )
}
