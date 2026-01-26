<script setup lang="ts">
const errorStore = useErrorStore()

onErrorCaptured((error) => {
  errorStore.setActiveError({ error })
})
</script>

<template>
  <AuthLayout>
    <AppError v-if="errorStore.activeError" />
    <RouterView v-else v-slot="{ Component, route }">
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
