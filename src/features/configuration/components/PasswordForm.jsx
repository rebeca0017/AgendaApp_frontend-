import { FormPanel } from '../../../components/common/FormPanel'

export function PasswordForm({ cambioPassword, setCambioPassword, submitCambiarPassword, saving }) {
  return (
    <FormPanel
      title="Actualizar contrasena"
      onSubmit={submitCambiarPassword}
      submitText="Actualizar contrasena"
      saving={saving}
    >
      <label>Contrasena actual<input required type="password" value={cambioPassword.passwordActual} onChange={(event) => setCambioPassword({ ...cambioPassword, passwordActual: event.target.value })} /></label>
      <label>Contrasena nueva<input required type="password" value={cambioPassword.passwordNueva} onChange={(event) => setCambioPassword({ ...cambioPassword, passwordNueva: event.target.value })} /></label>
    </FormPanel>
  )
}
