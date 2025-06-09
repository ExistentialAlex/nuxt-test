<script setup lang="ts">
import doublet from 'doublet';

const route = useRoute();
const { fetch: refreshSession, openInPopup, loggedIn } = useUserSession();
const credentials = reactive({
  email: '',
  password: '',
});
const login = async () => {
  const [err] = await doublet($fetch, '/api/login', {
    method: 'POST',
    body: credentials,
  });

  if (err) {
    return alert('Bad credentials');
  }

  await refreshSession();
  await navigateTo(route.meta.redirectPath as string);
};

watch(
  loggedIn,
  async () => {
    if (loggedIn.value) {
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
      <UForm :state="credentials" class="flex flex-col gap-2" @submit="login">
        <h2 class="text-center">Login</h2>
        <UFormField label="Email">
          <UInput
            v-model="credentials.email"
            type="email"
            class="w-full"
            data-testid="login-form:email"
          />
        </UFormField>
        <UFormField label="Password">
          <UInput
            v-model="credentials.password"
            type="password"
            class="w-full"
            data-testid="login-form:password"
          />
        </UFormField>
        <UButton class="mt-4 text-center" type="submit" data-testid="login-form:submit"
          >Login</UButton
        >
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
