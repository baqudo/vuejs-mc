import { supabase } from '@/lib/supabaseClient'
import type { Tables } from '@/types/database'
import { profileQuery } from '@/utils/supabaseQueries/profiles'
import type { Session, User } from '@supabase/supabase-js'

export const useAuthStore = defineStore('auth-store', () => {
  const user = ref<null | User>(null)
  const profile = ref<null | Tables<'profiles'>>(null)

  const setProfile = async () => {
    if (!user.value) {
      profile.value = null
      return
    }

    if (!profile.value || profile.value.id !== user.value.id) {
      const { data } = await profileQuery(user.value.id)
      profile.value = data || null
    }
  }

  const setAuth = async (userSession: null | Session) => {
    if (!userSession) {
      user.value = null
      profile.value = null
      return
    }

    user.value = userSession.user
    await setProfile()
  }

  const getSession = async () => {
    const { data } = await supabase.auth.getSession()
    if (data.session?.user) await setAuth(data.session)
  }

  return {
    user,
    profile,
    setAuth,
    getSession,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
