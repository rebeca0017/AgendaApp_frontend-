import { ServicioForm } from './components/ServicioForm'
import { ServiciosTable } from './components/ServiciosTable'
import { useServicios } from './hooks/useServicios'

export function ServiciosTab() {
  const servicios = useServicios()

  return (
    <div className="grid two-columns servicios-tab">
      <ServicioForm
        editing={servicios.editing}
        servicioForm={servicios.servicioForm}
        setServicioForm={servicios.setServicioForm}
        submitServicio={servicios.submitServicio}
        resetServicio={servicios.resetServicio}
        saving={servicios.saving}
      />
      <ServiciosTable
        servicios={servicios.servicios}
        editServicio={servicios.editServicio}
        deleteServicio={servicios.deleteServicio}
        saving={servicios.saving}
      />
    </div>
  )
}
