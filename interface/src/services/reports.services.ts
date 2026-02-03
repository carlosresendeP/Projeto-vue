//services/reports.services.ts
import api from './api'

const RESOURCE = '/reports'

export const getClientReport = async (
  clientId: number,
  month: string
) => {
  const { data } = await api.get(
    `${RESOURCE}/client/${clientId}`,
    {
      params: { month },
    }
  )

  return data
}
