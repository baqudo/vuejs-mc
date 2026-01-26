<script setup lang="ts">
const router = useRouter()
const errorStore = useErrorStore()

const errorModel = computed(() => {
  const err = errorStore.activeError
  if (!err) return { message: 'Page not found', customCode: 404 }
  if ('code' in err) {
    return {
      message: err.message,
      code: err.code ?? '',
      statusCode: err.statusCode ?? 0,
      hint: err.hint ?? '',
      details: err.details ?? '',
      customCode: 0,
    }
  }
  return {
    message: err.message,
    customCode: err.customCode ?? 0,
  }
})

const ErrorTemplate = import.meta.env.DEV
  ? defineAsyncComponent(() => import('./AppErrorDev.vue'))
  : defineAsyncComponent(() => import('./AppErrorProd.vue'))

router.afterEach(() => {
  errorStore.clearError()
})
</script>

<template>
  <section class="error">
    <ErrorTemplate v-bind="errorModel" :isCustomError="errorStore.isCustomError" />
  </section>
</template>

<style scoped>
@reference '@/style.css';

.error {
  @apply mx-auto flex justify-center items-center flex-1 p-10 text-center -mt-20 min-h-[90vh];
}

:deep(.error__icon) {
  @apply text-7xl text-destructive;
}

:deep(.error__code) {
  @apply font-extrabold text-7xl text-secondary;
}

:deep(.error__msg) {
  @apply text-3xl font-extrabold text-primary;
}

:deep(.error-footer) {
  @apply flex flex-col items-center justify-center gap-5 mt-6 font-light;
}

:deep(.error-footer__text) {
  @apply text-lg text-muted-foreground;
}

:deep(p) {
  @apply my-2;
}
</style>
