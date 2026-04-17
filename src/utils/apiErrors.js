export function formatApiError(text, status) {
  if (status === 403) return 'No tienes permisos para realizar esta accion.'
  if (!text) return 'No se pudo completar la solicitud.'

  try {
    const data = JSON.parse(text)
    if (Array.isArray(data)) return data.map((item) => item.description ?? item.code ?? JSON.stringify(item)).join(' ')
    if (data.errors) return Object.values(data.errors).flat().join(' ')
    if (data.title) return data.title
    if (data.mensaje) return data.mensaje
    return JSON.stringify(data)
  } catch {
    return text
  }
}
