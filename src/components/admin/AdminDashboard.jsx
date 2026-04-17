import { useEffect, useMemo, useState } from 'react'
import heroImg from '../../assets/hero.png'
import { API_URL } from '../../constants/appConstants'
import { saveAppBrand } from '../../services/appBrandStorage'

export function AdminDashboard({ auth, appName, logo, setBrand, logout }) {
  const [usuarios, setUsuarios] = useState([])
  const [adminEmail, setAdminEmail] = useState('')
  const [brandDraft, setBrandDraft] = useState({ appName, logo })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const usuariosNormalizados = useMemo(() => usuarios.map((usuario) => ({
    ...usuario,
    esAdmin: Boolean(usuario.esAdmin) || usuario.email?.toLowerCase() === auth.email?.toLowerCase(),
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
        const response = await fetch(`${API_URL}/api/usuarios/admin/usuarios`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`,
          },
        })

        if (!response.ok) {
          const text = await response.text()
          throw new Error(text || 'No se pudo cargar los usuarios.')
        }

        const data = await response.json()
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
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
        ...options.headers,
      },
    })

    if (!response.ok) {
      const text = await response.text()
      throw new Error(text || 'No se pudo completar la accion.')
    }

    return response.status === 204 ? null : response.json()
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

    saveAppBrand(nextBrand)
    setBrand(nextBrand)
    setMessage('Informacion general actualizada.')
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
                <button type="button" key={usuario.id} className="admin-user-row" onClick={() => setAdminEmail(usuario.email)}>
                  <span>{usuario.email}</span>
                  <small>{usuario.esAdmin ? 'Admin' : 'Usuario'}</small>
                </button>
              ))
            )}
          </div>
        </section>
      </section>

      {message && <p className="notice success">{message}</p>}
      {error && <p className="notice error">{error}</p>}
    </main>
  )
}
