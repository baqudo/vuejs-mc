import type { CustomError } from '@/types/error'

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<CustomError | null>(null)

  const setActiveError = ({ error, customCode }: { error: string; customCode: number }) => {
    activeError.value = Error(error)
    activeError.value.customCode = customCode
  }

  return {
    activeError,
    setActiveError,
  }
})
