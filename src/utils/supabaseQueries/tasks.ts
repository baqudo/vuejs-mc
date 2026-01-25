import { supabase } from '@/lib/supabaseClient'
import type { QueryData } from '@supabase/supabase-js'

export const tasksWithProjectsQuery = supabase.from('tasks').select(`*, projects(name, id, slug)`)
export type TasksWithProjects = QueryData<typeof tasksWithProjectsQuery>
export type TaskWithProject = TasksWithProjects[0]
