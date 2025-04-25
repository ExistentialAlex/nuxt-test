<script setup lang="ts">
import {
  AdtButton,
  AdtCard,
  AdtIcon,
  AdtTextField,
} from '@sky-uk/adtech-ui-components';
import doublet from 'doublet';

definePageMeta({
  layout: 'none',
});

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
  await navigateTo({ name: 'home' });
};

watch(
  loggedIn,
  async () => {
    if (loggedIn.value) {
      await refreshSession();
      await navigateTo({ name: 'home' });
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="grid place-items-center h-screen w-screen">
    <AdtCard class="w-1/2">
      <form class="flex flex-col gap-2" @submit.prevent="login">
        <h2 class="text-center">Login</h2>
        <AdtTextField v-model="credentials.email" type="email" label="Email" />
        <AdtTextField
          v-model="credentials.password"
          type="password"
          label="Password"
        />
        <AdtButton class="mt-4" type="submit">Login</AdtButton>
        <hr class="my-3" />
        <button
          class="bg-neutral-800 hover:bg-neutral-900 transition-colors text-neutral-100 rounded-sm flex items-center justify-center px-3 py-2"
          type="button"
          @click="openInPopup('/auth/github')"
        >
          <AdtIcon model-value="f-github" class="mr-3" icon-color="50" />
          Login with Github
        </button>
      </form>
    </AdtCard>
  </div>
</template>
