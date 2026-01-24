<script setup lang="ts">
</script>

<template>
  <AuthLayout>
    <RouterView v-slot="{ Component, route }">
      <Suspense v-if="Component">
        <!-- main content -->
        <component :is="Component" :key="route.name"></component>

        <!-- loading state -->
        <template #fallback>
          Loading...
        </template>
      </Suspense>
    </RouterView>
  </AuthLayout>
</template>
