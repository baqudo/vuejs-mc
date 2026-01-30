import { useMemoize } from '@vueuse/core'
import { tasksWithProjectsQuery, type TasksWithProjects } from '@/utils/supabaseQueries/tasks'

export const useTasksStore = defineStore('tasks-store', () => {
  const cacheKey = 'tasks-with-projects'
  const tasks = ref<TasksWithProjects | null>(null)
  const loadTasks = useMemoize(async (key: string) => await tasksWithProjectsQuery)

  const validateCache = () => {
    if (tasks.value?.length) {
      tasksWithProjectsQuery.then(({ data, error }) => {
        if (JSON.stringify(tasks.value) === JSON.stringify(data)) {
          return
        } else {
          loadTasks.delete(cacheKey)
          if (data && !error) tasks.value = data
        }
      })
    }
  }

  const getTasks = async () => {
    const { data, error, status } = await loadTasks(cacheKey)

    if (error) useErrorStore().setActiveError({ error, customCode: status })

    tasks.value = data

    validateCache()
  }

  return {
    tasks,
    getTasks,
  }
})
