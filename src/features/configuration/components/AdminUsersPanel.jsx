import { DataPanel } from '../../../components/common/DataPanel'

export function AdminUsersPanel({
  adminEmail,
  setAdminEmail,
  submitEnviarRecuperacionAdmin,
  submitPasswordTemporalAdmin,
  usuariosAdmin,
  cargarUsuariosAdmin,
  saving,
}) {
  return (
    <DataPanel title="Administracion de usuarios">
      <form className="admin-user-actions" onSubmit={submitEnviarRecuperacionAdmin}>
        <label>Email del usuario<input required type="email" value={adminEmail} onChange={(event) => setAdminEmail(event.target.value)} /></label>
        <div className="form-actions">
          <button className="primary" disabled={saving}>{saving ? 'Enviando...' : 'Enviar recuperacion'}</button>
          <button type="button" className="secondary" onClick={submitPasswordTemporalAdmin} disabled={saving || !adminEmail.trim()}>Generar clave temporal</button>
        </div>
      </form>

      <div className="admin-users-list">
        <div className="admin-users-header">
          <strong>Usuarios registrados</strong>
          <button type="button" className="link-button" onClick={cargarUsuariosAdmin}>Actualizar</button>
        </div>
        {usuariosAdmin.length === 0 ? (
          <p>No hay usuarios para mostrar.</p>
        ) : (
          usuariosAdmin.map((usuario) => (
            <button type="button" key={usuario.id} className="admin-user-row" onClick={() => setAdminEmail(usuario.email)}>
              <span>{usuario.email}</span>
              <small>{usuario.emailConfirmed ? 'Confirmado' : 'Pendiente'}</small>
            </button>
          ))
        )}
      </div>
    </DataPanel>
  )
}
