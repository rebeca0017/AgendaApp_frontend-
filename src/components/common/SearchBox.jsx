export function SearchBox({ value, onChange, placeholder }) {
  return (
    <label className="search-box">
      Buscar
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
    </label>
  )
}
