<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import type { Tables } from '@/types/database'
import type { ColumnDef } from '@tanstack/vue-table';
import DataTable from '@/components/ui/data-table/DataTable.vue'
import { RouterLink } from 'vue-router';

const tasks = ref<Tables<'tasks'>[] | null>(null)
  ; (async () => {
    const { data, error } = await supabase.from('tasks').select()

    if (error) console.log(error)

    tasks.value = data
  })()

const columns: ColumnDef<Tables<'tasks'>>[] = [
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
    accessorKey: 'project_id',
    header: () => h('div', { class: 'text-left' }, 'Project'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('project_id'))
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
  <div>
    <div class="flex mb-4 items-center justify-between">

      <h1>Tasks Page</h1>
      <RouterLink to="/">Go to home</RouterLink>
    </div>

    <DataTable v-if="tasks" :columns="columns" :data="tasks" />
  </div>
</template>
