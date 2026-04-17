import { ReminderGroup } from './ReminderGroup'

export function ReminderPanel({ recordatorios, cambiarEstadoCita, openDetails, saving }) {
  const totalAlertas = recordatorios.hoy.length + recordatorios.confirmadas.length + recordatorios.pendientesConfirmar.length

  return (
    <section className="reminder-panel" aria-label="Recordatorios de citas">
      <div className="reminder-header">
        <div className="reminder-mascot" aria-hidden="true">!</div>
        <div>
          <h3>Recordatorios</h3>
          <p>{totalAlertas ? 'Hay citas que necesitan atencion.' : 'Sin recordatorios pendientes.'}</p>
        </div>
      </div>

      <ReminderGroup title="Citas de hoy" items={recordatorios.hoy} emptyText="No hay citas activas para hoy." openDetails={openDetails} saving={saving} todayOnly />
      <ReminderGroup
        title="Confirmadas por entregar"
        items={recordatorios.confirmadas}
        emptyText="No hay citas confirmadas pendientes."
        openDetails={openDetails}
        saving={saving}
        action={(cita) => (
          <button className="secondary reminder-action action-complete" onClick={() => cambiarEstadoCita(cita.id, 'Completada')} disabled={saving}>
            Completar
          </button>
        )}
      />
      <ReminderGroup
        title="Programadas por confirmar"
        items={recordatorios.pendientesConfirmar}
        emptyText="No hay citas programadas pendientes de confirmar."
        openDetails={openDetails}
        saving={saving}
        action={(cita) => (
          <button className="secondary reminder-action action-confirm" onClick={() => cambiarEstadoCita(cita.id, 'Confirmada')} disabled={saving}>
            Confirmar
          </button>
        )}
      />
    </section>
  )
}
