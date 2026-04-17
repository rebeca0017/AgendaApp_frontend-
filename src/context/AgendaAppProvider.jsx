import { AgendaAppContext } from './agendaAppContext'

export function AgendaAppProvider({ children, value }) {
  return (
    <AgendaAppContext.Provider value={value}>
      {children}
    </AgendaAppContext.Provider>
  )
}
