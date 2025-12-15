<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { useToast } from '~/components/ui/Toast/useToast';
import { LoginSchema } from '../schemas/login.schema';
const { add, update } = useToast()
const { handleSubmit, errors, defineField } = useForm({
  validationSchema: toTypedSchema(LoginSchema),
});

const [email, emailProps] = defineField('email');
const [password, passwordProps] = defineField('password');

const onSubmit = handleSubmit((values) => {
  console.log('Login:', values);
  const toastId = add({
    title: 'Processing Request...',
    description: 'Mohon tunggu sebentar, sedang memverifikasi akun.',
    variant: 'default',
    duration: 99999
  })
  setTimeout(() => {

    update(toastId, {
      title: 'Login Berhasil!',
      description: 'Selamat datang kembali di dashboard.',
      variant: 'success',
      duration: 3000
    })



  }, 2000)

});
</script>

<template>
  <form @submit="onSubmit" class="space-y-4">
    <div class="flex flex-col gap-4">
      <UiInput placeholder="Email" leading-icon="solar:shield-user-broken" v-model="email" v-bind="emailProps" />
      <UiInput placeholder="Password" leading-icon="solar:lock-broken" type="password" autocomplete="current-password"
        v-model="password" v-bind="passwordProps">
        <template #suffix>
          <Icon name="solar:eye-closed-bold-duotone" size="22" class="cursor-pointer hover:bg-primary-400" />
        </template>
      </UiInput>
      <UiButton type="submit" icon="solar:login-3-bold" icon-pos="right" class="text-primary-100">Sign In</UiButton>
    </div>
  </form>
  <div
    :class="['flex flex-col gap-2 px-3 justify-center mt-4 min-h-[55px]', Object.keys(errors).length ? 'border-l-4 border-red-400  bg-gray-100 rounded' : '']">
    <span v-if="errors.email" class="text-xs text-red-500">{{ errors.email }}</span>
    <span v-if="errors.password" class="text-xs text-red-500">{{ errors.password }}</span>
  </div>
</template>