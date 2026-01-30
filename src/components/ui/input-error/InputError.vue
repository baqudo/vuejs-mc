<script setup lang="ts">
defineProps<{
  errors?: string[]
}>()
</script>

<template>
  <ul class="text-sm text-left text-red-600">
    <li class="list-disc" v-for="(error) in errors" :key="error">{{ error }}</li>
  </ul>
</template>
