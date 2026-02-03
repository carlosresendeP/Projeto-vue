export type DemandStatus = 'backlog' | 'autorizacao' | 'fila' | 'em_desenvolvimento' | 'teste' | 'deploy' | 'concluido'

export type DemandPriority = 'Baixa' | 'Media' | 'Alta'

export interface Demand {
  id?: number
  data_cadastro?: string

  client_id: number
  titulo: string
  prioridade: DemandPriority
  setor: string
  responsavel: string
  quem_deve_testar: string
  descricao_detalhada: string
  anexos_midias?: string
  cobrada_do_cliente: boolean
  tempo_estimado: number
  tempo_gasto: number
  status: DemandStatus
  flag_retornou: boolean
  feedback?: string
  created_at?: string
  updated_at?: string
}
