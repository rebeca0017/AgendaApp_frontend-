import { useMemo, useState } from 'react'
import { CITAS_POR_PAGINA } from '../utils/appointmentHelpers'
import { AppointmentItem } from './AppointmentItem'

export function AppointmentSection({
  title,
  items,
  emptyText,
  cambiarEstadoCita,
  openDetails,
  saving,
  readOnly = false,
}) {
  const [page, setPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(items.length / CITAS_POR_PAGINA))
  const currentPage = Math.min(page, totalPages)
  const start = (currentPage - 1) * CITAS_POR_PAGINA
  const pagedItems = useMemo(() => items.slice(start, start + CITAS_POR_PAGINA), [items, start])

  return (
    <section className="appointment-section">
      <div className="appointment-section-header">
        <h3>{title}</h3>
        <span>{items.length} cita{items.length === 1 ? '' : 's'}</span>
      </div>
      {items.length === 0 ? (
        <p className="empty">{emptyText}</p>
      ) : (
        <>
          {pagedItems.map((cita) => (
            <AppointmentItem
              key={cita.id}
              cita={cita}
              readOnly={readOnly}
              cambiarEstadoCita={cambiarEstadoCita}
              openDetails={openDetails}
              saving={saving}
            />
          ))}
          {totalPages > 1 && (
            <div className="appointment-pagination">
              <button type="button" className="secondary" onClick={() => setPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
                Anterior
              </button>
              <span>Pagina {currentPage} de {totalPages}</span>
              <button type="button" className="secondary" onClick={() => setPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
    </section>
  )
}
