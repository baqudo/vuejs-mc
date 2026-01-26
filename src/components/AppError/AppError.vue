<script setup lang="ts">
const router = useRouter()
const errorStore = useErrorStore()

const error = ref(errorStore.activeError)
const message = ref('')
const customCode = ref(0)
const details = ref('')
const hint = ref('')
const code = ref('')
const statusCode = ref(0)



if (error.value && !('code' in error.value)) {
  message.value = error.value.message
  customCode.value = error.value.customCode ?? 0
} else if (error.value && 'code' in error.value) {
  message.value = error.value.message
  details.value = error.value.details || ''
  hint.value = error.value.hint || ''
  code.value = error.value.code || ''
  statusCode.value = error.value.statusCode ?? 0
} else {
  message.value = 'Page not found'
  customCode.value = 404
}

router.afterEach(() => {
  errorStore.activeError = null
})
</script>

<template>
  <section class="error">
    <div>
      <iconify-icon icon="lucide:triangle-alert" class="error__icon" />
      <h1 class="error__code">{{ customCode || statusCode }}</h1>
      <p class="error__msg">{{ message }}</p>
      <div class="error__msg">
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
  </section>
</template>

<style scoped>
@reference '@/style.css';

.error {
  @apply mx-auto flex justify-center items-center flex-1 p-10 text-center -mt-20 min-h-[90vh];
}

.error__icon {
  @apply text-7xl text-destructive;
}

.error__code {
  @apply font-extrabold text-7xl text-secondary;
}

.error__msg {
  @apply text-3xl font-extrabold text-primary;
}

.error-footer {
  @apply flex flex-col items-center justify-center gap-5 mt-6 font-light;
}

.error-footer__text {
  @apply text-lg text-muted-foreground;
}

p {
  @apply my-2;
}
</style>
