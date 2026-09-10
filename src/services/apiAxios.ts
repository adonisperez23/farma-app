import axios from 'axios'
import type { MedicamentoPrecioApi } from '@/types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
        'Faltan variables de entorno de Supabase. Verifica que VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY estén definidas.'
    )
}

const apiAxios = axios.create({
    baseURL: `${supabaseUrl}/rest/v1`,
    headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
    },
})

function buildSearchParams(params: Record<string, string>): URLSearchParams {
    const sp = new URLSearchParams()
    for (const [key, value] of Object.entries(params)) {
        sp.set(key, value)
    }
    return sp
}

function logAxiosError(e: unknown): void {
    if (axios.isAxiosError(e)) {
        const status = e.response?.status
        const data = e.response?.data
        console.error(`Error HTTP ${status}:`, data)
    } else {
        console.error('Error inesperado:', e)
    }
}

export async function testConnectionAxios(): Promise<boolean> {
    try {
        const sp = buildSearchParams({ select: '*', limit: '1' })
        const { data } = await apiAxios.get('/precios_farmacia', { params: sp })
        if (!data || (Array.isArray(data) && data.length === 0)) {
            console.error('Error de conexión con Supabase: respuesta vacía')
            return false
        }
        return true
    } catch (e) {
        logAxiosError(e)
        return false
    }
}

export interface ParsedSearchQuery {
    nombre: string
    dosis: string | null
}

export function parseSearchQuery(query: string): ParsedSearchQuery {
    const trimmed = query.trim()
    if (!trimmed) return { nombre: '', dosis: null }

    const dosePatterns = [
        /\d+(?:\.\d+)?\s*UI\s*(?:\/|x)?\s*(?:ml)?$/i,
        /\d+(?:\.\d+)?\s*mg\/ml$/i,
        /\d+(?:\.\d+)?\s*mg\d*$/i,
        /\d+(?:\.\d+)?\s*mcg$/i,
        /\d+(?:\.\d+)?\s*g$/i,
    ]

    let doseMatch: RegExpMatchArray | null = null
    let doseText = ''

    for (const pattern of dosePatterns) {
        doseMatch = trimmed.match(pattern)
        if (doseMatch) {
            doseText = doseMatch[0].trim()
            break
        }
    }

    if (doseMatch) {
        const nombre = trimmed.slice(0, doseMatch.index).trim()
        return { nombre: nombre || trimmed, dosis: doseText }
    }

    return { nombre: trimmed, dosis: null }
}

export async function getMedicamentosAxios(query?: string | ParsedSearchQuery): Promise<MedicamentoPrecioApi[]> {
    const params: Record<string, string> = { select: '*', order: 'precio_bs.asc' }

    let nombreQuery = ''
    let dosisQuery = ''

    if (query) {
        if (typeof query === 'string') {
            const parsed = parseSearchQuery(query)
            nombreQuery = parsed.nombre
            dosisQuery = parsed.dosis || ''
        } else {
            nombreQuery = query.nombre
            dosisQuery = query.dosis || ''
        }
    }

    if (nombreQuery && nombreQuery.trim()) {
        params['nombre_producto_farmacia'] = `ilike.*${nombreQuery.trim()}*`
    }
    if (dosisQuery && dosisQuery.trim()) {
        params['dosis'] = `ilike.*${dosisQuery.trim()}*`
    }

    const sp = buildSearchParams(params)
    const { data } = await apiAxios.get('/precios_farmacia', { params: sp })
    return (data || []) as MedicamentoPrecioApi[]
}
