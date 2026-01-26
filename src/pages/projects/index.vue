<script setup lang="ts">
import { ProjectsTableQuery, type ProjectsTableData } from '@/utils/supabaseQueries/projects';
import { projectsColumns } from '@/utils/tables/projects';

usePageStore().pageData.title = 'Projects';

const projects = ref<ProjectsTableData | null>(null);

const getProjects = async () => {
  const { data, error, status } = await ProjectsTableQuery
  if (error) {
    useErrorStore().setActiveError({ error, customCode: status })
  }
  projects.value = data || []
}

await getProjects();
</script>

<template>
  <div>
    <DataTable v-if="projects" :columns="projectsColumns" :data="projects" />
    <div v-else>
      <p>Loading projects...</p>
    </div>
  </div>
</template>
