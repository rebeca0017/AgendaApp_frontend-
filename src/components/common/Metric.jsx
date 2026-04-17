export function Metric({ label, value, icon, variant = '' }) {
  return (
    <article className={`metric ${variant}`}>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      {icon && <img className="metric-icon" src={icon} alt="" aria-hidden="true" />}
    </article>
  )
}
