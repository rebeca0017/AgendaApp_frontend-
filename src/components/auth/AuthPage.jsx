import logoImg from '../../assets/hero.png'

export function AuthPage({
  appName = 'Mi Agenda',
  logo = '',
  authMode,
  setAuthMode,
  credenciales,
  setCredenciales,
  recuperarPassword,
  setRecuperarPassword,
  submitAuth,
  saving,
  message,
  error,
}) {
  const isPasswordRecovery = authMode === 'recuperar'
  const isPasswordReset = authMode === 'restablecer'
  const subtitle = isPasswordRecovery
    ? 'Recupera tu acceso'
    : isPasswordReset
      ? 'Crea una nueva clave'
      : 'Inicia sesion'

  return (
    <main className="auth-shell">
      <section className="auth-panel">
        <div>
          <span className="eyebrow">Acceso privado</span>
          <div className="auth-logo-slot"><img src={logo || logoImg} alt={appName} /></div>

          <h1>{appName}</h1>
          <p>{subtitle}</p>
        </div>

        <form onSubmit={submitAuth} className="auth-form">
          {isPasswordRecovery ? (
            <>
              <label>Email<input required type="email" value={recuperarPassword.email} onChange={(event) => setRecuperarPassword({ ...recuperarPassword, email: event.target.value })} /></label>
              <p className="auth-help">Te enviaremos un enlace al correo registrado.</p>
            </>
          ) : isPasswordReset ? (
            <>
              <label>Email<input required type="email" value={recuperarPassword.email} onChange={(event) => setRecuperarPassword({ ...recuperarPassword, email: event.target.value })} /></label>
              {!recuperarPassword.token && <label>Codigo de recuperacion<input required value={recuperarPassword.token} onChange={(event) => setRecuperarPassword({ ...recuperarPassword, token: event.target.value })} /></label>}
              <label>Nueva contraseña<input required type="password" value={recuperarPassword.passwordNueva} onChange={(event) => setRecuperarPassword({ ...recuperarPassword, passwordNueva: event.target.value })} /></label>
            </>
          ) : (
            <>
              {authMode === 'registro' && (
                <>
                  <label>Nombre<input required value={credenciales.nombre} onChange={(event) => setCredenciales({ ...credenciales, nombre: event.target.value })} /></label>
                  <label>Apellido<input required value={credenciales.apellido} onChange={(event) => setCredenciales({ ...credenciales, apellido: event.target.value })} /></label>
                </>
              )}
              <label>Email<input required type="email" value={credenciales.user} onChange={(event) => setCredenciales({ ...credenciales, user: event.target.value })} /></label>
              <label>Contraseña<input required type="password" value={credenciales.pass} onChange={(event) => setCredenciales({ ...credenciales, pass: event.target.value })} /></label>
            </>
          )}
          <button className="primary" disabled={saving}>{saving ? 'Procesando...' : authMode === 'login' ? 'Ingresar' : authMode === 'registro' ? 'Crear usuario' : isPasswordRecovery ? 'Enviar correo' : 'Actualizar clave'}</button>
          {authMode === 'login' && <button type="button" className="link-button" onClick={() => setAuthMode('registro')}>Crear usuario</button>}
          {authMode === 'registro' && <button type="button" className="link-button" onClick={() => setAuthMode('login')}>Ya tengo usuario</button>}
          {authMode === 'login' && <button type="button" className="link-button" onClick={() => setAuthMode('recuperar')}>Olvidaste la contraseña? Recuperar</button>}
          {(isPasswordRecovery || isPasswordReset) && <button type="button" className="link-button" onClick={() => setAuthMode('login')}>Volver al login</button>}
        </form>

        {message && <p className="notice success">{message}</p>}
        {error && <p className="notice error">{error}</p>}
      </section>
    </main>
  )
}
