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
