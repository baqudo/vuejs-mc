import { useMemoize } from '@vueuse/core'
import { projectsTableQuery, type ProjectsTableData } from '@/utils/supabaseQueries/projects'

export const useProjectsStore = defineStore('projects-store', () => {
  const cacheKey = 'projects'
  const projects = ref<ProjectsTableData | null>(null)

  const loadProjects = useMemoize(async (key: string) => await projectsTableQuery)

  const validateCache = () => {
    if (projects.value?.length) {
      projectsTableQuery.then(({ data, error }) => {
        if (JSON.stringify(projects.value) === JSON.stringify(data)) {
          return
        } else {
          loadProjects.delete(cacheKey)
          if (data && !error) projects.value = data
        }
      })
    }
  }

  const getProjects = async () => {
    const { data, error, status } = await loadProjects(cacheKey)
    if (error) {
      useErrorStore().setActiveError({ error, customCode: status })
    }
    projects.value = data || []

    validateCache()
  }

  return {
    projects,
    getProjects,
  }
})
