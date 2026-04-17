const AUTH_KEY = 'agendamiento.auth'
const PROFILE_IMAGE_PREFIX = 'agendamiento.profileImage.'

export function readAuth() {
  try {
    const stored = JSON.parse(localStorage.getItem(AUTH_KEY) ?? 'null')
    if (!stored?.token || (stored.expiracion && new Date(stored.expiracion) <= new Date())) {
      localStorage.removeItem(AUTH_KEY)
      return emptyAuth()
    }

    return stored
  } catch {
    localStorage.removeItem(AUTH_KEY)
    return emptyAuth()
  }
}

export function persistAuth(setAuth, session) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(session))
  setAuth(session)
}

export function clearAuth(setAuth) {
  localStorage.removeItem(AUTH_KEY)
  setAuth(emptyAuth())
}

function emptyAuth() {
  return { token: '', email: '', nombre: '', apellido: '', expiracion: '', imagenPerfil: '' }
}

export function readProfileImage(email) {
  return email ? localStorage.getItem(`${PROFILE_IMAGE_PREFIX}${email}`) ?? '' : ''
}

export function saveProfileImage(email, image) {
  if (!email) return
  localStorage.setItem(`${PROFILE_IMAGE_PREFIX}${email}`, image)
}

export function removeProfileImage(email) {
  if (!email) return
  localStorage.removeItem(`${PROFILE_IMAGE_PREFIX}${email}`)
}
