<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import type { Tables } from '@/types/database'
import type { ColumnDef } from '@tanstack/vue-table';
import DataTable from '@/components/ui/data-table/DataTable.vue'
import { RouterLink } from 'vue-router';

const projects = ref<Tables<'projects'>[] | null>(null);

; (async () => {
  const { data, error } = await supabase.from('projects').select()
  if (error) {
    console.error('Error fetching projects:', error)
  }
  projects.value = data || []
  console.log('Projects data:', data)
})()

const columns: ColumnDef<Tables<'projects'>>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => {
      return h(RouterLink, { class: 'text-left font-medium hover:underline', to: `/projects/${row.original.slug}` }, row.getValue('name'))
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
    <h1 class="mb-4">Welcome to the Projects View!</h1>

    <DataTable v-if="projects" :columns="columns" :data="projects" />
    <div v-else>
      <p>Loading projects...</p>
    </div>
  </div>
</template>
