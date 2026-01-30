import type { LoginForm, RegisterForm } from '@/types/authForm'
import type { AuthError, PostgrestError } from '@supabase/supabase-js'

type FormErrors<Type> = {
  [Key in keyof Type]: string[]
}

export const useFormErrors = () => {
  const serverError = ref('')
  // Use the superset of register fields so templates can safely access username/confirmPassword, etc.
  const realtimeErrors = ref<Partial<FormErrors<RegisterForm>>>()

  const handleServerError = (error: AuthError | PostgrestError | null) => {
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

  const handleRegisterForm = async (formData: RegisterForm) => {
    realtimeErrors.value = {
      email: [],
      password: [],
      username: [],
      firstName: [],
      lastName: [],
      confirmPassword: [],
    }

    const {
      validateEmail,
      validatePassword,
      validateUsername,
      validateName,
      validateConfirmPassword,
    } = await import('@/utils/formValidations')

    const emailErrors = validateEmail(formData.email)
    if (emailErrors.length) realtimeErrors.value.email = emailErrors

    const passwordErrors = validatePassword(formData.password)
    if (passwordErrors.length) realtimeErrors.value.password = passwordErrors

    const usernameErrors = validateUsername(formData.username)
    if (usernameErrors.length) realtimeErrors.value.username = usernameErrors

    const firstNameErrors = validateName(formData.firstName, 'First name')
    if (firstNameErrors.length) realtimeErrors.value.firstName = firstNameErrors

    const lastNameErrors = validateName(formData.lastName, 'Last name')
    if (lastNameErrors.length) realtimeErrors.value.lastName = lastNameErrors

    const confirmPasswordErrors = validateConfirmPassword(
      formData.password,
      formData.confirmPassword,
    )
    if (confirmPasswordErrors.length) realtimeErrors.value.confirmPassword = confirmPasswordErrors
  }

  return {
    serverError,
    handleServerError,
    realtimeErrors,
    handleLoginForm,
    handleRegisterForm,
  }
}
