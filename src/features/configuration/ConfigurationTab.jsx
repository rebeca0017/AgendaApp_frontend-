import { AdminUsersPanel } from './components/AdminUsersPanel'
import { PasswordForm } from './components/PasswordForm'
import { ProfileImagePanel } from './components/ProfileImagePanel'
import { UserForm } from './components/UserForm'
import { useUserSettings } from './hooks/useUserSettings'

export function ConfigurationTab() {
  const config = useUserSettings()

  if (config.esAdmin) {
    return (
      <div className="configuration-tab">
        <AdminUsersPanel
          adminEmail={config.adminEmail}
          setAdminEmail={config.setAdminEmail}
          submitEnviarRecuperacionAdmin={config.submitEnviarRecuperacionAdmin}
          submitPasswordTemporalAdmin={config.submitPasswordTemporalAdmin}
          usuariosAdmin={config.usuariosAdmin}
          cargarUsuariosAdmin={config.cargarUsuariosAdmin}
          saving={config.saving}
        />
      </div>
    )
  }

  return (
    <div className="grid two-columns configuration-tab">
      <div className="stack">
        <ProfileImagePanel
          authEmail={config.authEmail}
          imagenPerfil={config.imagenPerfil}
          actualizarImagenPerfil={config.actualizarImagenPerfil}
          eliminarImagenPerfil={config.eliminarImagenPerfil}
          saving={config.saving}
        />
        <PasswordForm
          cambioPassword={config.cambioPassword}
          setCambioPassword={config.setCambioPassword}
          submitCambiarPassword={config.submitCambiarPassword}
          saving={config.saving}
        />
      </div>

      <UserForm
        modificarUsuario={config.modificarUsuario}
        setModificarUsuario={config.setModificarUsuario}
        submitModificarUsuario={config.submitModificarUsuario}
        saving={config.saving}
      />
    </div>
  )
}
