export interface Client {
    id: number;
    nome: string;
    email: string;
    avisar_por_email: boolean
    whatsapp: string
    avisar_por_whatsapp: boolean
    observacao?: string
    created_at?: string
    updated_at?: string
}