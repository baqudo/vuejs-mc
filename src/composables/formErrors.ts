import type { LoginForm } from '@/types/authForm'
import type { AuthError } from '@supabase/supabase-js'

type FormErrors<Type> = {
  [Key in keyof Type]: string[]
}

export const useFormErrors = () => {
  const serverError = ref('')
  const realtimeErrors = ref<FormErrors<LoginForm>>()

  const handleServerError = (error: AuthError | null) => {
    if (!error) {
      serverError.value = ''
      return
    }
    serverError.value = error?.message || 'An unexpected error occurred. Please try again later.'
  }

  const handleLoginForm = async (formData: LoginForm) => {
    realtimeErrors.value = {
      email: [],
      password: [],
    }

    const { validateEmail, validatePassword } = await import('@/utils/formValidations')

    const emailErrors = validateEmail(formData.email)
    if (emailErrors.length) realtimeErrors.value.email = emailErrors

    const passwordErrors = validatePassword(formData.password)
    if (passwordErrors.length) realtimeErrors.value.password = passwordErrors
  }

  return {
    serverError,
    handleServerError,
    realtimeErrors,
    handleLoginForm,
  }
}
