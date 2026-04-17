import { useMemo } from 'react'
import { groupAppointments } from '../utils/appointmentHelpers'

export function useAppointments(citas) {
  return useMemo(() => groupAppointments(citas), [citas])
}
