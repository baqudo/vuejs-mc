import { useMemoize } from '@vueuse/core'
import { tasksWithProjectsQuery, type TasksWithProjects } from '@/utils/supabaseQueries/tasks'

export const useTasksStore = defineStore('tasks-store', () => {
  const tasks = ref<TasksWithProjects | null>(null)
  const loadTasks = useMemoize(async (key: string) => await tasksWithProjectsQuery)

  const getTasks = async () => {
    const { data, error, status } = await loadTasks('tasks-with-projects')

    if (error) useErrorStore().setActiveError({ error, customCode: status })

    tasks.value = data
  }

  return {
    tasks,
    getTasks,
  }
})
