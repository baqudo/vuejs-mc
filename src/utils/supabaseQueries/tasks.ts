import { supabase } from '@/lib/supabaseClient'
import type { QueryData } from '@supabase/supabase-js'

export const tasksWithProjectsQuery = supabase.from('tasks').select(`*, projects(name, id, slug)`)
export type TasksWithProjects = QueryData<typeof tasksWithProjectsQuery>

export const taskWithProjectQuery = (id: string) =>
  supabase.from('tasks').select(`*, projects(name, id, slug)`).eq('id', id).single()
export type TaskWithProject = QueryData<ReturnType<typeof taskWithProjectQuery>>
