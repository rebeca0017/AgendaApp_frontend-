export function PaginationControls({ page, pageCount, onPageChange }) {
  if (pageCount <= 1) return null

  return (
    <div className="pagination-controls">
      <button type="button" className="secondary" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>Anterior</button>
      <span>Pagina {page} de {pageCount}</span>
      <button type="button" className="secondary" disabled={page >= pageCount} onClick={() => onPageChange(page + 1)}>Siguiente</button>
    </div>
  )
}
