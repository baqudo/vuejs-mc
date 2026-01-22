<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import type { Tables } from '@/types/database'

const projects = ref<Tables<'projects'>[] | null>(null);

; (async () => {
  const { data, error } = await supabase.from('projects').select()
  if (error) {
    console.error('Error fetching projects:', error)
  }
  projects.value = data || []
  console.log('Projects data:', data)
})()
</script>

<template>
  <div>
    <h1>Welcome to the Projects View!</h1>

    <div v-if="projects">
      <h2>Projects List:</h2>
      <ul>
        <li v-for="project in projects" :key="project.id">
          <router-link :to="{ name: '/projects/[id]', params: { id: project.id } }">{{ project.name }}</router-link>
          <p>Status: {{ project.status }}</p>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Loading projects...</p>
    </div>
  </div>
</template>
