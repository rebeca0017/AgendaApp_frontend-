import { useEffect, useMemo, useState } from 'react'
import heroImg from '../../assets/hero.png'
import { apiRequest } from '../../services/apiClient'
import { saveAppBrand } from '../../services/appBrandStorage'

export function AdminDashboard({ auth, appName, logo, setBrand, logout }) {
  const [usuarios, setUsuarios] = useState([])
  const [adminEmail, setAdminEmail] = useState('')
  const [brandDraft, setBrandDraft] = useState({ appName, logo })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [removerAdmin, setRemoverAdmin] = useState({ usuario: null, passwordActual: '' })

  const usuariosNormalizados = useMemo(() => usuarios.map((usuario) => ({
    ...usuario,
    esAdmin: Boolean(usuario.esAdmin),
    esSesionActual: usuario.email?.toLowerCase() === auth.email?.toLowerCase(),
  })), [auth.email, usuarios])

  const stats = useMemo(() => ({
    total: usuariosNormalizados.length,
    administradores: usuariosNormalizados.filter((usuario) => usuario.esAdmin).length,
    normales: usuariosNormalizados.filter((usuario) => !usuario.esAdmin).length,
  }), [usuariosNormalizados])

  useEffect(() => {
    setBrandDraft({ appName, logo })
  }, [appName, logo])

  useEffect(() => {
    let activo = true

    async function cargarInicial() {
      setSaving(true)
      setError('')

      try {
        const data = await apiRequest('/api/usuarios/admin/usuarios', { token: auth.token })
        if (activo) setUsuarios(data)
      } catch (err) {
        if (activo) setError(err.message)
      } finally {
        if (activo) setSaving(false)
      }
    }

    cargarInicial()

    return () => {
      activo = false
    }
  }, [auth.token])

  async function request(path, options = {}) {
    return apiRequest(path, { ...options, token: auth.token })
  }

  async function runAction(action) {
    setSaving(true)
    setError('')
    setMessage('')

    try {
      await action()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function cargarUsuarios() {
    await runAction(async () => {
      const data = await request('/api/usuarios/admin/usuarios')
      setUsuarios(data)
    })
  }

  async function enviarRecuperacion(event) {
    event.preventDefault()
    await runAction(async () => {
      await request('/api/usuarios/admin/enviarrecuperacionpassword', {
        method: 'POST',
        body: JSON.stringify({ email: adminEmail.trim() }),
      })
      setMessage('Correo de recuperacion enviado.')
    })
  }

  async function generarClaveTemporal() {
    await runAction(async () => {
      await request('/api/usuarios/admin/generarpasswordtemporal', {
        method: 'POST',
        body: JSON.stringify({ email: adminEmail.trim() }),
      })
      setMessage('Clave temporal enviada. El usuario debera cambiarla al iniciar sesion.')
    })
  }

  async function hacerAdmin(usuario) {
    await runAction(async () => {
      await request('/api/usuarios/admin/haceradmin', {
        method: 'POST',
        body: JSON.stringify({ email: usuario.email }),
      })
      const data = await request('/api/usuarios/admin/usuarios')
      setUsuarios(data)
      setMessage('Usuario convertido en administrador.')
    })
  }

  function solicitarRemoverAdmin(usuario) {
    setError('')
    setMessage('')
    setRemoverAdmin({ usuario, passwordActual: '' })
  }

  function cerrarRemoverAdmin() {
    if (saving) return
    setRemoverAdmin({ usuario: null, passwordActual: '' })
  }

  async function confirmarRemoverAdmin(event) {
    event.preventDefault()
    const usuario = removerAdmin.usuario
    if (!usuario) return

    await runAction(async () => {
      await request('/api/usuarios/admin/removeradmin', {
        method: 'POST',
        body: JSON.stringify({
          email: usuario.email,
          passwordActual: removerAdmin.passwordActual,
        }),
      })
      const data = await request('/api/usuarios/admin/usuarios')
      setUsuarios(data)
      setMessage('Rol administrador removido.')
      setRemoverAdmin({ usuario: null, passwordActual: '' })
    })
  }

  function cambiarLogo(event) {
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Selecciona una imagen valida.')
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      setError('La imagen debe pesar menos de 2 MB.')
      return
    }

    const reader = new FileReader()
    reader.onload = () => setBrandDraft((current) => ({ ...current, logo: String(reader.result ?? '') }))
    reader.onerror = () => setError('No se pudo cargar la imagen.')
    reader.readAsDataURL(file)
  }

  function guardarMarca(event) {
    event.preventDefault()
    const nextBrand = {
      appName: brandDraft.appName.trim() || 'Mi Agenda',
      logo: brandDraft.logo,
    }

    runAction(async () => {
      const response = await request('/api/configuracion-app', {
        method: 'PUT',
        body: JSON.stringify({
          nombreApp: nextBrand.appName,
          logo: nextBrand.logo,
        }),
      })

      const savedBrand = { appName: response.nombreApp, logo: response.logo || '' }
      saveAppBrand(savedBrand)
      setBrand(savedBrand)
      setMessage('Informacion general actualizada.')
    })
  }

  return (
    <main className="admin-shell">
      <header className="admin-topbar">
        <div className="admin-brand">
          <div className="admin-logo-preview">
            <img src={logo || heroImg} alt={appName} />
          </div>
          <div>
            <span className="eyebrow">Panel administrativo</span>
            <h1>{appName}</h1>
            <p>Informacion general, usuarios y soporte de acceso.</p>
            <p className="session-line">Sesion: {auth.email}</p>
          </div>
        </div>
        <button type="button" className="secondary" onClick={logout}>Cerrar sesion</button>
      </header>

      <section className="admin-metrics">
        <article className="metric-card">
          <span>Usuarios registrados</span>
          <strong>{stats.total}</strong>
        </article>
        <article className="metric-card">
          <span>Administradores</span>
          <strong>{stats.administradores}</strong>
        </article>
        <article className="metric-card">
          <span>Usuarios normales</span>
          <strong>{stats.normales}</strong>
        </article>
      </section>

      <section className="admin-grid">
        <section className="panel">
          <h2>Informacion general</h2>
          <form className="form-grid" onSubmit={guardarMarca}>
            <label>Nombre de la app<input required value={brandDraft.appName} onChange={(event) => setBrandDraft({ ...brandDraft, appName: event.target.value })} /></label>
            <div className="brand-editor">
              <div className="admin-logo-preview large">
                <img src={brandDraft.logo || heroImg} alt="" />
              </div>
              <label className="file-upload">Cambiar logo<input type="file" accept="image/*" onChange={cambiarLogo} /></label>
            </div>
            <div className="form-actions">
              <button className="primary">Guardar cambios</button>
              <button type="button" className="secondary" onClick={() => setBrandDraft({ appName: 'Mi Agenda', logo: '' })}>Restaurar</button>
            </div>
          </form>
        </section>

        <section className="panel">
          <h2>Soporte de acceso</h2>
          <form className="form-grid" onSubmit={enviarRecuperacion}>
            <label>Email del usuario<input required type="email" value={adminEmail} onChange={(event) => setAdminEmail(event.target.value)} /></label>
            <div className="form-actions">
              <button className="primary" disabled={saving}>{saving ? 'Enviando...' : 'Enviar recuperacion'}</button>
              <button type="button" className="secondary" onClick={generarClaveTemporal} disabled={saving || !adminEmail.trim()}>Clave temporal</button>
            </div>
          </form>
        </section>

        <section className="panel admin-users-panel">
          <div className="admin-users-header">
            <h2>Usuarios</h2>
            <button type="button" className="link-button" onClick={cargarUsuarios}>Actualizar</button>
          </div>
          <div className="admin-users-list">
            {usuariosNormalizados.length === 0 ? (
              <p>No hay usuarios para mostrar.</p>
            ) : (
              usuariosNormalizados.map((usuario) => (
                <div key={usuario.id} className="admin-user-row">
                  <button type="button" className="admin-user-select" onClick={() => setAdminEmail(usuario.email)}>
                    <span>{usuario.email}</span>
                    <small>{usuario.esAdmin ? 'Admin' : 'Usuario'}</small>
                  </button>
                  <button
                    type="button"
                    className={usuario.esAdmin ? 'secondary' : 'primary'}
                    onClick={() => (usuario.esAdmin ? solicitarRemoverAdmin(usuario) : hacerAdmin(usuario))}
                    disabled={saving || usuario.esSesionActual}
                  >
                    {usuario.esAdmin ? 'Quitar admin' : 'Hacer admin'}
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </section>

      {message && <p className="notice success">{message}</p>}
      {error && <p className="notice error">{error}</p>}

      {removerAdmin.usuario && (
        <div className="modal-backdrop" role="presentation">
          <form className="reason-modal" onSubmit={confirmarRemoverAdmin}>
            <div className="detail-modal-header">
              <div>
                <p>Confirmar seguridad</p>
                <h3>Quitar admin</h3>
              </div>
              <button type="button" className="modal-close" onClick={cerrarRemoverAdmin} aria-label="Cerrar">x</button>
            </div>
            <p>Escribe tu contrasena para quitar el rol admin de {removerAdmin.usuario.email}.</p>
            <label>
              Contrasena actual
              <input
                required
                autoFocus
                type="password"
                value={removerAdmin.passwordActual}
                onChange={(event) => setRemoverAdmin((current) => ({ ...current, passwordActual: event.target.value }))}
              />
            </label>
            <div className="modal-actions">
              <button type="button" className="secondary modal-submit" onClick={cerrarRemoverAdmin} disabled={saving}>Cancelar</button>
              <button type="submit" className="ghost modal-submit" disabled={saving}>
                {saving ? 'Validando...' : 'Quitar admin'}
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  )
}
