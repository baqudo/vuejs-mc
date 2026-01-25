import { supabase } from '@/lib/supabaseClient'
import type { QueryData } from '@supabase/supabase-js'

export const ProjectsTableQuery = supabase.from('projects').select()

export type ProjectsTableData = QueryData<typeof ProjectsTableQuery>
export type Project = ProjectsTableData[0]
