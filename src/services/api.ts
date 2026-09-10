import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { MedicamentoPrecioApi } from '@/types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
        'Faltan variables de entorno de Supabase. Verifica que VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY estén definidas.'
    )
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)

export async function testConnectionSupabase(): Promise<boolean> {
    try {
        const { data } = await supabase.from('precios_farmacia').select('*').limit(1)
        if (!data || (Array.isArray(data) && data.length === 0)) {
            console.error('Error de conexión con Supabase: respuesta vacía')
            return false
        }
        return true
    } catch (e) {
        console.error('Error de conexión con Supabase:', e)
        return false
    }
}

export async function getMedicamentosSupabase(query?: string): Promise<MedicamentoPrecioApi[]> {
    let q = supabase.from('precios_farmacia').select('*')
    if (query && query.trim()) {
        q = q.ilike('nombre_producto_farmacia', `%${query}%`)
    }
    const { data, error } = await q.order('precio_bs', { ascending: true })
    if (error) throw error
    return (data || []) as MedicamentoPrecioApi[]
}
