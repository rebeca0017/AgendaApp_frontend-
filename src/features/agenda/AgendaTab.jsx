import { DataPanel } from '../../components/common/DataPanel'
import { FormPanel } from '../../components/common/FormPanel'
import { SearchBox } from '../../components/common/SearchBox'
import { estadosCita } from '../../constants/appConstants'
import { labelEstado, money } from '../../utils/formatters'
import { AppointmentSection } from './components/AppointmentSection'
import { ChangeStatusModal } from './components/ChangeStatusModal'
import { CitaDetailModal } from './components/CitaDetailModal'
import { ReminderPanel } from './components/ReminderPanel'
import { useAgendaState } from './hooks/useAgendaState'
import { useAppointments } from './hooks/useAppointments'
import { useCitas } from './hooks/useCitas'

export function AgendaTab() {
  const agenda = useCitas()
  const { cambiarEstadoCita, citaForm, editCita, editing, fechaMinimaCita, proximasCitas, recordatoriosCitas, resetCita, saving, search, setCitaForm, setSearch, submitCita } = agenda
  const { clientesActivos, serviciosActivos } = agenda
  const { citasProgramadas, citasConfirmadas, citasInformativas } = useAppointments(proximasCitas)
  const agendaState = useAgendaState({ cambiarEstadoCita, editCita })

  return (
    <>
      <div className="agenda-layout">
        <FormPanel
          title={editing.cita ? 'Editar cita' : 'Nueva cita'}
          onSubmit={submitCita}
          submitText={editing.cita ? 'Actualizar cita' : 'Agendar cita'}
          onCancel={editing.cita ? resetCita : null}
          saving={saving}
        >
          <label>
            Cliente
            <select required value={citaForm.clienteId} onChange={(event) => setCitaForm({ ...citaForm, clienteId: event.target.value })}>
              <option value="">Seleccionar cliente</option>
              {clientesActivos.map((cliente) => <option value={cliente.id} key={cliente.id}>{cliente.nombres} {cliente.apellidos}</option>)}
            </select>
          </label>
          <label>
            Servicio
            <select required value={citaForm.servicioId} onChange={(event) => setCitaForm({ ...citaForm, servicioId: event.target.value })}>
              <option value="">Seleccionar servicio</option>
              {serviciosActivos.map((servicio) => <option value={servicio.id} key={servicio.id}>{servicio.nombre} - {money(servicio.precio)}</option>)}
            </select>
          </label>
          <label>
            Fecha de visita
            <input required type="datetime-local" min={fechaMinimaCita} value={citaForm.fechaInicio} onChange={(event) => setCitaForm({ ...citaForm, fechaInicio: event.target.value })} />
          </label>
          <label>
            Fecha de entrega
            <input readOnly type="datetime-local" value={citaForm.fechaFin} />
          </label>
          <label>
            Estado
            <select value={citaForm.estado} onChange={(event) => setCitaForm({ ...citaForm, estado: event.target.value })}>
              {estadosCita.map((estado) => <option value={estado} key={estado}>{labelEstado(estado)}</option>)}
            </select>
          </label>
          <label className="span-2">
            Motivo
            <input value={citaForm.motivo} onChange={(event) => setCitaForm({ ...citaForm, motivo: event.target.value })} />
          </label>
          <label className="span-2">
            Observaciones
            <textarea value={citaForm.observaciones} onChange={(event) => setCitaForm({ ...citaForm, observaciones: event.target.value })} />
          </label>
        </FormPanel>

        <DataPanel title="Citas">
          <SearchBox value={search.citas} onChange={(value) => setSearch({ ...search, citas: value })} placeholder="Buscar por cliente, servicio, estado o fecha" />
          <div className="appointment-list">
            <AppointmentSection
              title="Programadas"
              items={citasProgramadas}
              emptyText="Sin citas programadas."
              cambiarEstadoCita={agendaState.solicitarCambioEstado}
              openDetails={agendaState.abrirDetalleCita}
              saving={saving}
            />
            <AppointmentSection
              title="Confirmadas"
              items={citasConfirmadas}
              emptyText="Sin citas confirmadas."
              cambiarEstadoCita={agendaState.solicitarCambioEstado}
              openDetails={agendaState.abrirDetalleCita}
              saving={saving}
            />
            <AppointmentSection
              title="Historial"
              items={citasInformativas}
              emptyText="Sin citas completadas o canceladas."
              openDetails={agendaState.abrirDetalleCita}
              readOnly
            />
            {proximasCitas.length === 0 && <p className="empty">Sin citas registradas.</p>}
          </div>
        </DataPanel>

        <ReminderPanel
          recordatorios={recordatoriosCitas}
          cambiarEstadoCita={cambiarEstadoCita}
          openDetails={agendaState.abrirDetalleCita}
          saving={saving}
        />
      </div>

      {agendaState.citaDetalle && (
        <CitaDetailModal
          cita={agendaState.citaDetalle}
          onClose={agendaState.cerrarDetalleCita}
          onEdit={agendaState.editarDesdeDetalle}
          saving={saving}
        />
      )}
      <ChangeStatusModal
        estadoPendiente={agendaState.estadoPendiente}
        observacionEstado={agendaState.observacionEstado}
        setObservacionEstado={agendaState.setObservacionEstado}
        confirmarCambioEstado={agendaState.confirmarCambioEstado}
        cerrarModalEstado={agendaState.cerrarModalEstado}
        saving={saving}
      />
    </>
  )
}
