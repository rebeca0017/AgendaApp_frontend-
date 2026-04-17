import { API_URL } from '../constants/appConstants'
import { formatApiError } from '../utils/apiErrors'

export async function apiRequest(path, { token = '', onUnauthorized, ...options } = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  })

  if (response.status === 401) {
    onUnauthorized?.()
    throw new Error('Tu sesion expiro. Inicia sesion nuevamente.')
  }

  if (!response.ok) {
    const text = await response.text()
    throw new Error(formatApiError(text, response.status))
  }

  return response.status === 204 ? null : response.json()
}
