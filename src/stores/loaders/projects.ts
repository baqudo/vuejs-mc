import { useMemoize } from '@vueuse/core'
import { ProjectsTableQuery, type ProjectsTableData } from '@/utils/supabaseQueries/projects'

export const useProjectsStore = defineStore('projects-store', () => {
  const projects = ref<ProjectsTableData | null>(null)

  const loadProjects = useMemoize(async (key: string) => await ProjectsTableQuery)

  const getProjects = async () => {
    const { data, error, status } = await loadProjects('projects')
    if (error) {
      useErrorStore().setActiveError({ error, customCode: status })
    }
    projects.value = data || []
  }

  return {
    projects,
    getProjects,
  }
})
