import { DataPanel } from '../../../components/common/DataPanel'

export function ProfileImagePanel({ authEmail, imagenPerfil, actualizarImagenPerfil, eliminarImagenPerfil, saving }) {
  return (
    <DataPanel title="Imagen de perfil">
      <div className="profile-image-panel">
        <div className="profile-image-preview">
          {imagenPerfil ? <img src={imagenPerfil} alt="Imagen de perfil" /> : <span>{authEmail.slice(0, 1).toUpperCase()}</span>}
        </div>
        <div>
          <p>Usa una imagen del dispositivo para el menu lateral.</p>
          <label className="file-upload">
            Cargar imagen
            <input type="file" accept="image/*" onChange={actualizarImagenPerfil} />
          </label>
          {imagenPerfil && (
            <button type="button" className="ghost" onClick={eliminarImagenPerfil} disabled={saving}>
              Quitar imagen
            </button>
          )}
        </div>
      </div>
    </DataPanel>
  )
}
