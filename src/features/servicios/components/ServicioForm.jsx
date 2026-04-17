import { FormPanel } from '../../../components/common/FormPanel'

export function ServicioForm({ editing, servicioForm, setServicioForm, submitServicio, resetServicio, saving }) {
  return (
    <FormPanel
      title={editing.servicio ? 'Editar servicio' : 'Nuevo servicio'}
      onSubmit={submitServicio}
      submitText={editing.servicio ? 'Actualizar servicio' : 'Guardar servicio'}
      onCancel={editing.servicio ? resetServicio : null}
      saving={saving}
    >
      <label className="span-2">Nombre<input required value={servicioForm.nombre} onChange={(event) => setServicioForm({ ...servicioForm, nombre: event.target.value })} /></label>
      <label>Precio<input required type="number" min="0" step="0.01" value={servicioForm.precio} onChange={(event) => setServicioForm({ ...servicioForm, precio: event.target.value })} /></label>
      <label>Duracion dias<input required type="number" min="1" value={servicioForm.duracionDias} onChange={(event) => setServicioForm({ ...servicioForm, duracionDias: event.target.value })} /></label>
      <label className="span-2">Descripcion<textarea value={servicioForm.descripcion} onChange={(event) => setServicioForm({ ...servicioForm, descripcion: event.target.value })} /></label>
    </FormPanel>
  )
}
