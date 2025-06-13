<script setup lang="ts">
import z from 'zod';
import doublet from 'doublet';
import { FetchError } from 'ofetch';
import { loginSchema, type LoginSchema } from '../schemas';

const route = useRoute();
const { fetch: refreshSession, openInPopup, loggedIn } = useUserSession();
const { add } = useToast();

const credentials = reactive<Partial<LoginSchema>>({
  email: '',
  password: '',
});
const login = async () => {
  const [err] = await doublet($fetch, '/api/login', {
    method: 'POST',
    body: credentials,
  });

  if (err) {
    // Raise toast with error.
    add({
      title: 'Login failed',
      description: (err as FetchError).data.message || 'An error occurred while logging in.',
      color: 'error',
    });
    return;
  }

  await refreshSession();
  await navigateTo(route.meta.redirectPath as string);
};

watch(
  loggedIn,
  async (loggedIn) => {
    if (loggedIn) {
      await refreshSession();
      await navigateTo(route.meta.redirectPath as string);
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="grid h-screen w-screen place-items-center">
    <UCard class="w-1/2" data-testid="login-form">
      <UForm
        :state="credentials"
        :schema="loginSchema"
        class="flex flex-col gap-2"
        data-testid="login-form"
        @submit="login"
      >
        <h2 class="text-center">Login</h2>
        <UFormField label="Email" name="email">
          <UInput
            v-model="credentials.email"
            type="email"
            class="w-full"
            data-testid="login-form:email"
          />
        </UFormField>
        <UFormField label="Password" name="password">
          <UInput
            v-model="credentials.password"
            type="password"
            class="w-full"
            data-testid="login-form:password"
          />
        </UFormField>
        <UButton class="mt-4 justify-center" type="submit" data-testid="login-form:submit">
          Login
        </UButton>
        <hr class="my-3" />
        <button
          class="flex items-center justify-center rounded-sm bg-neutral-700 px-3 py-2 text-neutral-100 transition-colors hover:bg-neutral-800"
          type="button"
          data-testid="login-form:github"
          @click="openInPopup('/auth/github')"
        >
          <UIcon name="i-fe-github" class="mr-3" />
          Login with Github
        </button>
      </UForm>
    </UCard>
  </div>
</template>
