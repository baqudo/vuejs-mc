<script setup lang="ts">
import { authLogin } from '@/utils/supabaseAuth';
import { watchDebounced } from '@vueuse/core';
const router = useRouter();
const { serverError, handleServerError, handleLoginForm, realtimeErrors } = useFormErrors();

const formData = ref({
  email: '',
  password: ''
})

watchDebounced(formData, () => {
  handleLoginForm(formData.value);
}, { debounce: 500, deep: true });

const onLogin = async () => {
  const { error } = await authLogin(formData.value);
  if (!error) router.push('/');

  handleServerError(error);
}
</script>

<template>
  <div class="mx-auto flex w-full justify-center items-center p-10 text-center -mt-20 min-h-[90vh]">
    <Card class="max-w-sm w-full mx-auto">
      <CardHeader>
        <CardTitle class="text-2xl"> Login </CardTitle>
        <CardDescription> Login to your account </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col gap-4 mb-4 justify-center items-center">
          <Button variant="outline" class="w-full"> Register with Google </Button>
          <Separator label="Or" />
        </div>

        <form class="grid gap-4" @submit.prevent="onLogin">
          <div class="grid gap-2">
            <Label id="email" class="text-left">Email</Label>
            <Input v-model="formData.email" type="email" placeholder="johndoe19@example.com" required
              :class="{ 'border-red-500': serverError }" />
            <InputError v-if="realtimeErrors?.email?.length" :errors="realtimeErrors.email" />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label id="password">Password</Label>
              <a href="#" class="inline-block ml-auto text-xs underline"> Forgot your password? </a>
            </div>
            <Input v-model="formData.password" id="password" type="password" autocomplete required
              :class="{ 'border-red-500': serverError }" />
            <InputError v-if="realtimeErrors?.password?.length" :errors="realtimeErrors.password" />
          </div>
          <div v-if="serverError" class="text-sm text-red-600"> {{ serverError }} </div>

          <Button type="submit" class="w-full"> Login </Button>
        </form>
        <div class="mt-4 text-sm text-center">
          Don't have an account?
          <RouterLink to="/register" class="underline"> Register </RouterLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
