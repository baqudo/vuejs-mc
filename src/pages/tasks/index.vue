<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import type { Tables } from '@/types/database'
import type { QueryData } from '@supabase/supabase-js';
import type { ColumnDef } from '@tanstack/vue-table';
import { RouterLink } from 'vue-router';

usePageStore().pageData.title = 'My Tasks';

const tasksWithProjectsQuery = supabase.from('tasks').select(`*, projects(name, id, slug)`);
type TasksWithProjects = QueryData<typeof tasksWithProjectsQuery>;
type TaskWithProject = TasksWithProjects[0];

const tasks = ref<TasksWithProjects | null>(null)
const getTasks = async () => {
  const { data, error } = await tasksWithProjectsQuery

  if (error) console.log(error)

  tasks.value = data
}
await getTasks()

const columns: ColumnDef<TaskWithProject>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => {
      return h(RouterLink, { class: 'text-left font-medium hover:underline', to: `/tasks/${row.original.id}` }, row.getValue('name'))
    }
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Status'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('status'))
    }
  },
  {
    accessorKey: 'due_date',
    header: () => h('div', { class: 'text-left' }, 'Due Date'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('due_date'))
    }
  },
  {
    accessorKey: 'projects',
    header: () => h('div', { class: 'text-left' }, 'Project'),
    cell: ({ row }) => {
      return row.original.projects
        ? h(
          RouterLink,
          {
            class: 'text-left font-medium hover:underline',
            to: `/projects/${row.original.projects.slug}`
          },
          row.original.projects.name
        )
        : null
    }
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left font-medium' },
        JSON.stringify(row.getValue('collaborators'))
      )
    }
  }
]

</script>

<template>
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>
