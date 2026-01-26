<script setup lang="ts">
defineProps<{
  message: string
  customCode: number
  code?: string
  statusCode?: number
  hint?: string | null
  details?: string
}>()
</script>

<template>
  <div>
    <iconify-icon icon="lucide:triangle-alert" class="error__icon" />
    <h1 class="error__code">{{ customCode || statusCode }}</h1>
    <p class="error__msg">{{ message }}</p>
    <div>
      <p v-if="code"><strong>Code:</strong> {{ code }}</p>
      <p v-if="details"><strong>Details:</strong> {{ details }}</p>
      <p v-if="hint"><strong>Hint:</strong> {{ hint }}</p>
    </div>
    <div class="error-footer">
      <p class="error-footer__text">You'll find lots to explore on the home page.</p>
      <RouterLink to="/">
        <Button class="max-w-36"> Back to homepage </Button>
      </RouterLink>
    </div>
  </div>
</template>
