export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5026'
export const AUTH_KEY = 'agendamiento.auth'

export const estadosCita = ['Programada', 'Confirmada', 'Completada', 'Cancelada', 'NoAsistio']
export const metodosPago = ['Efectivo', 'Tarjeta', 'Transferencia', 'Otro']

export const emptyCliente = { nombres: '', apellidos: '', identificacion: '', telefono: '', email: '' }
export const emptyServicio = { nombre: '', descripcion: '', precio: '', duracionDias: 1 }
export const emptyCita = { clienteId: '', servicioId: '', fechaInicio: '', fechaFin: '', estado: 'Programada', motivo: '', observaciones: '' }
export const emptyIngreso = {
  citaId: '',
  clienteId: '',
  concepto: '',
  monto: '',
  metodoPago: 'Efectivo',
  fechaPago: new Date().toISOString().slice(0, 16),
  referencia: '',
  notas: '',
}
export const emptyGasto = {
  concepto: '',
  categoria: '',
  monto: '',
  metodoPago: 'Efectivo',
  fechaGasto: new Date().toISOString().slice(0, 16),
  referencia: '',
  notas: '',
}
export const emptyCredenciales = { nombre: '', apellido: '', user: '', pass: '' }
export const emptyRecuperarPassword = { email: '', token: '', passwordNueva: '' }
export const emptyCambioPassword = { passwordActual: '', passwordNueva: '' }
export const emptyModificarUsuario = { nombre: '', apellido: '', emailActual: '', nuevoEmail: '' }
