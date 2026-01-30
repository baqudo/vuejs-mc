import { useMemoize } from '@vueuse/core'
import { projectsTableQuery, type ProjectsTableData } from '@/utils/supabaseQueries/projects'

export const useProjectsStore = defineStore('projects-store', () => {
  const cacheKey = 'projects'
  const projects = ref<ProjectsTableData | null>(null)

  const loadProjects = useMemoize(async (key: string) => await projectsTableQuery)

  const validateCache = () => {
    // clear cache if data has updates
    if (projects.value?.length) {
      projectsTableQuery.then(({ data }) => {
        if (JSON.stringify(projects.value) === JSON.stringify(data)) {
          console.log('Projects: cached and fresh data matched')
        } else {
          console.log('Projects: data has some changes')
          loadProjects.delete(cacheKey)
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
