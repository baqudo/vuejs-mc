<script setup lang="ts">
import { projectsColumns } from '@/utils/tables/projects';

usePageStore().pageData.title = 'Projects';

const projectsStore = useProjectsStore();
const { projects } = storeToRefs(projectsStore);
const { getProjects } = projectsStore;

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
