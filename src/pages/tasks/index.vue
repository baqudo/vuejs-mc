<script setup lang="ts">
import { tasksColumns } from '@/utils/tables/tasks';
import { tasksWithProjectsQuery, type TasksWithProjects } from '@/utils/supabaseQueries/tasks';

usePageStore().pageData.title = 'My Tasks';

const tasks = ref<TasksWithProjects | null>(null)
const getTasks = async () => {
  const { data, error } = await tasksWithProjectsQuery

  if (error) console.log(error)

  tasks.value = data
}
await getTasks()


</script>

<template>
  <DataTable v-if="tasks" :columns="tasksColumns" :data="tasks" />
</template>
