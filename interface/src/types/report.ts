import type { Client } from './client'
import type { Demand } from './demand'

export interface ClientReportResponse {
  client: Client
  month: string
  total_demands: number
  demands: Demand[]
  tempo_total_estimado: number
  tempo_total_gasto: number
}