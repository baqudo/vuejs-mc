import { supabase } from '@/lib/supabaseClient'
import type { LoginForm, RegisterForm } from '@/types/authForm'

const authStore = useAuthStore()

export const authLogin = async (formData: LoginForm) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  })

  if (error) return console.error('Error logging in:', error.message)

  if (data.session) {
    await authStore.setAuth(data.session)
  }

  return true
}

export const authRegister = async (formData: RegisterForm) => {
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  })

  if (error) {
    return console.error('Error signing up:', error.message)
  }

  if (data.user) {
    const { error } = await supabase.from('profiles').insert({
      id: data.user?.id,
      username: formData.username,
      full_name: formData.firstName + ' ' + formData.lastName,
    })

    if (error) {
      return console.error('Error creating profile:', error.message)
    }
  }

  if (data.session) {
    await authStore.setAuth(data.session)
  }

  return true
}

export const authLogout = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    return console.error('Error signing out:', error.message)
  }

  await authStore.setAuth(null)

  return true
}
