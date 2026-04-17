import { useCallback, useEffect, useMemo, useState } from 'react'
import { API_URL, emptyCredenciales, emptyRecuperarPassword } from '../constants/appConstants'
import { clearAuth, persistAuth, readAuth, readProfileImage } from '../services/authStorage'
import { formatApiError } from '../utils/apiErrors'

const emptyEditing = { cliente: null, servicio: null, cita: null, ingreso: null, gasto: null }
const emptyResumenIngresos = { total: 0, cantidad: 0, porMetodo: [] }
const emptyResumenGastos = { total: 0, cantidad: 0, porCategoria: [] }

export function useAgendaApp() {
  const [auth, setAuth] = useState(readAuth)
  const [authMode, setAuthMode] = useState('login')
  const [credenciales, setCredenciales] = useState(emptyCredenciales)
  const [recuperarPassword, setRecuperarPassword] = useState(emptyRecuperarPassword)
  const [clientes, setClientes] = useState([])
  const [servicios, setServicios] = useState([])
  const [citas, setCitas] = useState([])
  const [ingresos, setIngresos] = useState([])
  const [gastos, setGastos] = useState([])
  const [resumen, setResumen] = useState(emptyResumenIngresos)
  const [resumenGastos, setResumenGastos] = useState(emptyResumenGastos)
  const [editing, setEditing] = useState(emptyEditing)
  const [search, setSearch] = useState({ clientes: '', citas: '' })
  const [activeTab, setActiveTab] = useState('agenda')
  const [loading, setLoading] = useState(Boolean(auth.token))
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const email = params.get('email')
    const token = params.get('token')

    if (email && token) {
      setRecuperarPassword({ email, token, passwordNueva: '' })
      setAuthMode('restablecer')
    }
  }, [])

  const request = useCallback(async (path, options = {}) => {
    const headers = { 'Content-Type': 'application/json', ...options.headers }

    if (auth.token) {
      headers.Authorization = `Bearer ${auth.token}`
    }

    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
    })

    if (response.status === 401) {
      clearAuth(setAuth)
      throw new Error('Tu sesion expiro. Inicia sesion nuevamente.')
    }

    if (!response.ok) {
      const text = await response.text()
      throw new Error(formatApiError(text, response.status))
    }

    return response.status === 204 ? null : response.json()
  }, [auth.token])

  const loadData = useCallback(async () => {
    if (!auth.token) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError('')

    try {
      const [clientesData, serviciosData, citasData, ingresosData, resumenData, gastosData, resumenGastosData] = await Promise.all([
        request('/api/clientes'),
        request('/api/servicios'),
        request('/api/citas'),
        request('/api/ingresos'),
        request('/api/ingresos/resumen'),
        request('/api/gastos'),
        request('/api/gastos/resumen'),
      ])

      setClientes(clientesData)
      setServicios(serviciosData)
      setCitas(citasData)
      setIngresos(ingresosData)
      setResumen(resumenData)
      setGastos(gastosData)
      setResumenGastos(resumenGastosData)
    } catch (err) {
      setError(`No se pudo conectar con la API en ${API_URL}. ${err.message}`)
    } finally {
      setLoading(false)
    }
  }, [auth.token, request])

  useEffect(() => {
    loadData()
  }, [loadData])

  async function saveAction(action) {
    setSaving(true)
    setError('')
    setMessage('')

    try {
      await action()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function submitAuth(event) {
    event.preventDefault()
    await saveAction(async () => {
      if (authMode === 'recuperar') {
        await request('/api/usuarios/solicitarrecuperacionpassword', {
          method: 'POST',
          body: JSON.stringify({
            email: recuperarPassword.email.trim(),
          }),
        })

        setRecuperarPassword(emptyRecuperarPassword)
        setAuthMode('login')
        setMessage('Si el correo esta registrado, recibiras un enlace para restablecer tu clave.')
        return
      }

      if (authMode === 'restablecer') {
        await request('/api/usuarios/recuperarpassword', {
          method: 'POST',
          body: JSON.stringify({
            email: recuperarPassword.email.trim(),
            token: recuperarPassword.token,
            passwordNueva: recuperarPassword.passwordNueva.trim(),
          }),
        })

        setRecuperarPassword(emptyRecuperarPassword)
        setAuthMode('login')
        window.history.replaceState({}, document.title, window.location.pathname)
        setMessage('Clave actualizada. Inicia sesion con tu nueva clave.')
        return
      }

      const response = await request(authMode === 'login' ? '/api/usuarios/login' : '/api/usuarios/registrar', {
        method: 'POST',
        body: JSON.stringify({
          nombre: credenciales.nombre.trim(),
          apellido: credenciales.apellido.trim(),
          user: credenciales.user.trim(),
          pass: credenciales.pass.trim(),
        }),
      })

      persistAuth(setAuth, {
        token: response.token,
        expiracion: response.expiracion,
        email: response.email ?? credenciales.user.trim(),
        nombre: response.nombre ?? credenciales.nombre.trim(),
        apellido: response.apellido ?? credenciales.apellido.trim(),
        esAdmin: Boolean(response.esAdmin),
        debeCambiarPassword: Boolean(response.debeCambiarPassword),
        imagenPerfil: readProfileImage(credenciales.user.trim()),
      })
      setCredenciales(emptyCredenciales)
      if (response.debeCambiarPassword) {
        setActiveTab('configuracion')
        setMessage('Usa una clave nueva antes de continuar.')
        return
      }

      setMessage(authMode === 'login' ? 'Sesion iniciada.' : 'Usuario creado y sesion iniciada.')
    })
  }

  function clearData() {
    setClientes([])
    setServicios([])
    setCitas([])
    setIngresos([])
    setGastos([])
    setResumen(emptyResumenIngresos)
    setResumenGastos(emptyResumenGastos)
    setEditing(emptyEditing)
    setSearch({ clientes: '', citas: '' })
  }

  function logout() {
    clearAuth(setAuth)
    clearData()
    setActiveTab('agenda')
    setMessage('Sesion cerrada.')
  }

  async function deleteEntity(path, successMessage) {
    if (!window.confirm('Confirma la accion seleccionada.')) return
    await saveAction(async () => {
      await request(path, { method: 'DELETE' })
      setMessage(successMessage)
      await loadData()
    })
  }

  const metrics = useMemo(() => ({
    clientesActivos: clientes.filter((cliente) => cliente.activo).length,
    serviciosActivos: servicios.filter((servicio) => servicio.activo).length,
    citasCompletadas: citas.filter((cita) => cita.estado === 'Completada').length,
  }), [citas, clientes, servicios])

  const contextValue = {
    actions: {
      deleteEntity,
      loadData,
      request,
      saveAction,
      setError,
      setMessage,
    },
    auth,
    data: {
      citas,
      clientes,
      gastos,
      ingresos,
      resumen,
      resumenGastos,
      servicios,
    },
    editing,
    navigation: {
      setActiveTab,
    },
    search,
    setAuth,
    setEditing,
    setSearch,
    ui: {
      saving,
    },
  }

  return {
    activeTab,
    auth,
    authMode,
    contextValue,
    credenciales,
    editing,
    error,
    loading,
    logout,
    message,
    metrics,
    recuperarPassword,
    resumen,
    resumenGastos,
    saving,
    setActiveTab,
    setAuthMode,
    setCredenciales,
    setRecuperarPassword,
    submitAuth,
  }
}
