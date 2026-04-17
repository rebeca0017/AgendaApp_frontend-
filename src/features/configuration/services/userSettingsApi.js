export function cambiarPassword(request, cambioPassword) {
  return request('/api/usuarios/cambiarpassword', {
    method: 'POST',
    body: JSON.stringify({
      passwordActual: cambioPassword.passwordActual.trim(),
      passwordNueva: cambioPassword.passwordNueva.trim(),
    }),
  })
}

export function modificarUsuario(request, usuario) {
  return request('/api/usuarios/modificar', {
    method: 'PUT',
    body: JSON.stringify({
      emailActual: usuario.emailActual.trim(),
      nuevoEmail: usuario.nuevoEmail.trim(),
      nombre: usuario.nombre.trim(),
      apellido: usuario.apellido.trim(),
    }),
  })
}

export function listarUsuariosAdmin(request) {
  return request('/api/usuarios/admin/usuarios')
}

export function enviarRecuperacionPasswordAdmin(request, email) {
  return request('/api/usuarios/admin/enviarrecuperacionpassword', {
    method: 'POST',
    body: JSON.stringify({ email: email.trim() }),
  })
}

export function generarPasswordTemporalAdmin(request, email) {
  return request('/api/usuarios/admin/generarpasswordtemporal', {
    method: 'POST',
    body: JSON.stringify({ email: email.trim() }),
  })
}
