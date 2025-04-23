<script setup lang="ts">
import doublet from 'doublet';

definePageMeta({
  layout: 'none',
})

const { fetch: refreshSession } = useUserSession();
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
</script>

<template>
  <form @submit.prevent="login">
    <input v-model="credentials.email" type="email" placeholder="Email" />
    <input
      v-model="credentials.password"
      type="password"
      placeholder="Password"
    />
    <button type="submit">Login</button>
  </form>
</template>
