import { supabase } from '@/lib/supabaseClient'
import type { QueryData } from '@supabase/supabase-js'

export const profileQuery = (id: string) => supabase.from('profiles').select().eq('id', id).single()
export type ProfileData = QueryData<ReturnType<typeof profileQuery>>
