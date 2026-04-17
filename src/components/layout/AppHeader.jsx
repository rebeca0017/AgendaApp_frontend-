import heroImg from '../../assets/hero.png'

export function AppHeader({ authEmail }) {
  return (
    <section className="topbar">
      <div>
        <span className="eyebrow">Agenda y caja</span>
        <h1>Agendamiento de citas</h1>
        <p>Gestiona clientes, servicios, horarios e ingresos desde un solo panel.</p>
        <p className="session-line">Sesion: {authEmail}</p>
      </div>
      <div className="topbar-side">
        <img src={heroImg} alt="Calendario de trabajo" className="topbar-image" />
      </div>
    </section>
  )
}
