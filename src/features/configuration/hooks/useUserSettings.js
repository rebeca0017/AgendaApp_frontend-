import { useMemo, useState } from 'react'
import { useAgendaContext } from '../../../context/useAgendaContext'
import { emptyCambioPassword, emptyModificarUsuario } from '../../../constants/appConstants'
import { persistAuth, removeProfileImage, saveProfileImage } from '../../../services/authStorage'
import { cambiarPassword, modificarUsuario as modificarUsuarioApi } from '../services/userSettingsApi'

export function useUserSettings() {
  const {
    actions: { request, saveAction, setError, setMessage },
    auth,
    setAuth,
    ui: { saving },
  } = useAgendaContext()
  const [cambioPassword, setCambioPassword] = useState(emptyCambioPassword)
  const [modificarUsuarioDraft, setModificarUsuario] = useState(emptyModificarUsuario)

  const modificarUsuario = useMemo(() => ({
    nombre: modificarUsuarioDraft.nombre || auth.nombre || '',
    apellido: modificarUsuarioDraft.apellido || auth.apellido || '',
    emailActual: modificarUsuarioDraft.emailActual || auth.email,
    nuevoEmail: modificarUsuarioDraft.nuevoEmail || auth.email,
  }), [auth.apellido, auth.email, auth.nombre, modificarUsuarioDraft])

  async function submitCambiarPassword(event) {
    event.preventDefault()
    await saveAction(async () => {
      await cambiarPassword(request, cambioPassword)
      setCambioPassword(emptyCambioPassword)
      setMessage('Contrasena actualizada.')
    })
  }

  async function submitModificarUsuario(event) {
    event.preventDefault()
    await saveAction(async () => {
      const response = await modificarUsuarioApi(request, modificarUsuario)
      persistAuth(setAuth, {
        token: response.token,
        expiracion: response.expiracion,
        email: response.email ?? modificarUsuario.nuevoEmail.trim(),
        nombre: response.nombre ?? modificarUsuario.nombre.trim(),
        apellido: response.apellido ?? modificarUsuario.apellido.trim(),
        imagenPerfil: auth.imagenPerfil,
      })
      if (auth.imagenPerfil) {
        saveProfileImage(modificarUsuario.nuevoEmail.trim(), auth.imagenPerfil)
      }
      setModificarUsuario(emptyModificarUsuario)
      setMessage('Usuario modificado.')
    })
  }

  function actualizarImagenPerfil(event) {
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Selecciona un archivo de imagen valido.')
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      setError('La imagen debe pesar menos de 2 MB.')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const imagenPerfil = String(reader.result ?? '')
      saveProfileImage(auth.email, imagenPerfil)
      persistAuth(setAuth, { ...auth, imagenPerfil })
      setError('')
      setMessage('Imagen de perfil actualizada.')
    }
    reader.onerror = () => setError('No se pudo cargar la imagen.')
    reader.readAsDataURL(file)
  }

  function eliminarImagenPerfil() {
    removeProfileImage(auth.email)
    persistAuth(setAuth, { ...auth, imagenPerfil: '' })
    setMessage('Imagen de perfil eliminada.')
  }

  return {
    actualizarImagenPerfil,
    authEmail: auth.email,
    cambioPassword,
    eliminarImagenPerfil,
    imagenPerfil: auth.imagenPerfil,
    modificarUsuario,
    saving,
    setCambioPassword,
    setModificarUsuario,
    submitCambiarPassword,
    submitModificarUsuario,
  }
}
