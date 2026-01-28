import { supabase } from '@/lib/supabaseClient'
import type { LoginForm, RegisterForm } from '@/types/authForm'

export const authLogin = async (formData: LoginForm) => {
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  })

  return { error }
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

  return true
}

export const authLogout = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    return console.error('Error signing out:', error.message)
  }

  return true
}
