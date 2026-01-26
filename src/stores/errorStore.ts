import type { CustomError, CustomPostgrestError } from '@/types/error'
import type { PostgrestError } from '@supabase/supabase-js'

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<CustomError | CustomPostgrestError | null>(null)

  const setActiveError = ({
    error,
    customCode,
  }: {
    error: string | PostgrestError
    customCode: number
  }) => {
    if (typeof error === 'string') {
      activeError.value = Error(error)
      activeError.value.customCode = customCode
      return
    }

    activeError.value = error
    activeError.value.statusCode = customCode
  }

  return {
    activeError,
    setActiveError,
  }
})
