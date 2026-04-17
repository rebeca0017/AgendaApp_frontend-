import { useContext } from 'react'
import { AgendaAppContext } from './agendaAppContext'

export function useAgendaContext() {
  const context = useContext(AgendaAppContext)

  if (!context) {
    throw new Error('useAgendaContext debe usarse dentro de AgendaAppProvider.')
  }

  return context
}
