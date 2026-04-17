import { AuthPage } from './components/auth/AuthPage'
import { AdminDashboard } from './components/admin/AdminDashboard'
import { AppHeader } from './components/layout/AppHeader'
import { MetricsBar } from './components/layout/MetricsBar'
import { TabsNav } from './components/layout/TabsNav'
import { AgendaAppProvider } from './context/AgendaAppProvider'
import { AgendaTab } from './features/agenda/AgendaTab'
import { ClientesTab } from './features/clientes/ClientesTab'
import { ConfigurationTab } from './features/configuration/ConfigurationTab'
import { GastosTab } from './features/gastos/GastosTab'
import { IngresosTab } from './features/ingresos/IngresosTab'
import { ReportesTab } from './features/reportes/ReportesTab'
import { ServiciosTab } from './features/servicios/ServiciosTab'
import { useAgendaApp } from './hooks/useAgendaApp'
import { useEffect, useState } from 'react'
import { apiRequest } from './services/apiClient'
import { readAppBrand } from './services/appBrandStorage'
import cerrarSesionIcon from './assets/sidebar/cerrar-sesion.png'
import configuracionIcon from './assets/sidebar/configuracion.png'
import './App.css'

function App() {
  const app = useAgendaApp()
  const [brand, setBrand] = useState(readAppBrand)
  const nombreSesion = `${app.auth.nombre ?? ''} ${app.auth.apellido ?? ''}`.trim() || app.auth.email

  useEffect(() => {
    apiRequest('/api/configuracion-app')
      .then((config) => setBrand({ appName: config.nombreApp, logo: config.logo || '' }))
      .catch(() => {})
  }, [])

  if (!app.auth.token) {
    return (
      <AuthPage
        appName={brand.appName}
        logo={brand.logo}
        authMode={app.authMode}
        setAuthMode={app.setAuthMode}
        credenciales={app.credenciales}
        setCredenciales={app.setCredenciales}
        recuperarPassword={app.recuperarPassword}
        setRecuperarPassword={app.setRecuperarPassword}
        submitAuth={app.submitAuth}
        saving={app.saving}
        message={app.message}
        error={app.error}
      />
    )
  }

  if (app.auth.esAdmin) {
    return (
      <AdminDashboard
        auth={app.auth}
        appName={brand.appName}
        logo={brand.logo}
        setBrand={setBrand}
        logout={app.logout}
      />
    )
  }

  return (
    <main className="app-layout">
      <aside className="sidebar" aria-label="Menu principal">
        <div className="sidebar-profile">
          <div className="sidebar-avatar" aria-hidden="true">
            {app.auth.imagenPerfil ? (
              <img src={app.auth.imagenPerfil} alt="" />
            ) : (
              app.auth.email.slice(0, 1).toUpperCase()
            )}
          </div>
          <strong>{brand.appName}</strong>
          <span>{nombreSesion}</span>
        </div>

        <TabsNav activeTab={app.activeTab} onChange={app.setActiveTab} />

        <div className="sidebar-actions">
          <button
            type="button"
            className={`sidebar-action ${app.activeTab === 'configuracion' ? 'active' : ''}`}
            onClick={() => app.setActiveTab('configuracion')}
          >
            <span className="nav-marker" aria-hidden="true">
              <img src={configuracionIcon} alt="" />
            </span>
            Configuracion
          </button>
          <button type="button" className="sidebar-action" onClick={app.logout}>
            <span className="nav-marker" aria-hidden="true">
              <img src={cerrarSesionIcon} alt="" />
            </span>
            Cerrar sesion
          </button>
        </div>
      </aside>

      <section className="app-shell">
        <AppHeader authEmail={nombreSesion} appName={brand.appName} logo={brand.logo} />

        {app.activeTab !== 'reportes' && (
          <MetricsBar
            clientesActivos={app.metrics.clientesActivos}
            serviciosActivos={app.metrics.serviciosActivos}
            citasCompletadas={app.metrics.citasCompletadas}
            totalIngresos={app.resumen.total}
            totalGastos={app.resumenGastos.total}
          />
        )}

        <AgendaAppProvider value={app.contextValue}>
        <section className="workspace">
          {app.message && <p className="notice success">{app.message}</p>}
          {app.error && <p className="notice error">{app.error}</p>}
          {app.loading && <p className="notice">Cargando datos...</p>}

        {app.activeTab === 'configuracion' && <ConfigurationTab />}

        {app.activeTab === 'agenda' && <AgendaTab />}

        {app.activeTab === 'clientes' && <ClientesTab />}

        {app.activeTab === 'servicios' && <ServiciosTab />}

        {app.activeTab === 'ingresos' && <IngresosTab />}

        {app.activeTab === 'gastos' && <GastosTab />}

        {app.activeTab === 'reportes' && <ReportesTab />}
      </section>
      </AgendaAppProvider>
      </section>
    </main>
  )
}

export default App
