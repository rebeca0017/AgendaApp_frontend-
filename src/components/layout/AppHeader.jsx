import heroImg from '../../assets/hero.png'

export function AppHeader({ authEmail, appName = 'Mi Agenda', logo = '' }) {
  return (
    <section className="topbar">
      <div>
        <span className="eyebrow">Agenda y caja</span>
        <h1>{appName}</h1>
        <p>Gestiona clientes, servicios, horarios e ingresos desde un solo panel.</p>
        <p className="session-line">Sesion: {authEmail}</p>
      </div>
      <div className="topbar-side">
        <img src={logo || heroImg} alt={appName} className="topbar-image" />
      </div>
    </section>
  )
}
