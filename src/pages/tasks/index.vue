<script setup lang="ts">
import { tasksColumns } from '@/utils/tables/tasks';

usePageStore().pageData.title = 'My Tasks';

const tasksStore = useTasksStore();
const { tasks } = storeToRefs(tasksStore);

await tasksStore.getTasks()

</script>

<template>
  <DataTable v-if="tasks" :columns="tasksColumns" :data="tasks" />
</template>
