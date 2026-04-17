export function FormPanel({ title, children, onSubmit, submitText, saving, onCancel }) {
  return (
    <form className="panel" onSubmit={onSubmit}>
      <h2>{title}</h2>
      <div className="form-grid">{children}</div>
      <div className="form-actions">
        <button className="primary" disabled={saving}>{saving ? 'Guardando...' : submitText}</button>
        {onCancel && <button type="button" className="secondary" onClick={onCancel} disabled={saving}>Cancelar edicion</button>}
      </div>
    </form>
  )
}
