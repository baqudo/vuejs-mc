<script setup lang="ts">
import type { Tables } from '@/types/database';
import { profileQuery } from '@/utils/supabaseQueries/profiles';
import { useRoute } from 'vue-router'
const route = useRoute('/users/[username]')

const username = route.params.username as string
const profile = ref<Tables<'profiles'> | null>(null)
const userAbbr = computed(() => profile.value?.full_name.split(' ').map(n => n[0]).join('').toUpperCase() || '')

const getProfile = async () => {
  const { data, error, status } = await profileQuery({ column: 'username', value: username })
  if (error) useErrorStore().setActiveError({ error, customCode: status })
  profile.value = data
  console.log(profile)
}
getProfile()
</script>

<template>
  <div class="mx-auto mb-10 flex w-full flex-col items-center justify-center py-10 text-center">
    <div class="flex flex-col items-center justify-center pb-4">
      <Avatar size="lg">
        <AvatarImage :src="profile?.avatar_url || ''" alt="@radix-vue" />
        <AvatarFallback>{{ userAbbr }}</AvatarFallback>
      </Avatar>

      <p class="mt-2 text-gray-500">@{{ profile?.username }}</p>
      <h1 class="mt-5 text-4xl font-bold">{{ profile?.full_name }}</h1>
      <p class="mt-2 text-sm">{{ profile?.bio }}</p>
    </div>
    <Button>Edit profile</Button>
  </div>
</template>
