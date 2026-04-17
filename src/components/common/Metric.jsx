export function Metric({ label, value, variant = '' }) {
  return (
    <article className={`metric ${variant}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  )
}
