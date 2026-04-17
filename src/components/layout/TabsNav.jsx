import agendaIcon from '../../assets/sidebar/agenda.png'
import clientesIcon from '../../assets/sidebar/clientes.png'
import gastosIcon from '../../assets/sidebar/gastos.png'
import ingresosIcon from '../../assets/sidebar/ingresos.png'
import serviciosIcon from '../../assets/sidebar/servicios.png'
import reportesIcon from '../../assets/metrics/ingresos.png'

const tabs = [
  { id: 'agenda', label: 'Agenda', icon: agendaIcon },
  { id: 'clientes', label: 'Clientes', icon: clientesIcon },
  { id: 'servicios', label: 'Servicios', icon: serviciosIcon },
  { id: 'ingresos', label: 'Ingresos', icon: ingresosIcon },
  { id: 'gastos', label: 'Gastos', icon: gastosIcon },
  { id: 'reportes', label: 'Reportes', icon: reportesIcon },
]

export function TabsNav({ activeTab, onChange }) {
  return (
    <nav className="tabs" aria-label="Secciones">
      {tabs.map((tab) => (
        <button key={tab.id} className={activeTab === tab.id ? 'active' : ''} onClick={() => onChange(tab.id)}>
          <span className="nav-marker" aria-hidden="true">
            <img src={tab.icon} alt="" />
          </span>
          {tab.label}
        </button>
      ))}
    </nav>
  )
}
