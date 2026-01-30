import { supabase } from '@/lib/supabaseClient'
import type { QueryData } from '@supabase/supabase-js'

export const projectsTableQuery = supabase.from('projects').select()
export type ProjectsTableData = QueryData<typeof projectsTableQuery>

export const ProjectQuery = (slug: string) => {
  return supabase
    .from('projects')
    .select(
      `
    *,
    tasks (
      id,
      name,
      status,
      due_date
    )
    `,
    )
    .eq('slug', slug)
    .single()
}

export type ProjectData = QueryData<ReturnType<typeof ProjectQuery>>
