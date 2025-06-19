<script lang="ts" setup>
import { FetchError } from 'ofetch';

definePageMeta({
  middleware: ['authenticated'],
  breadcrumbs: [
    {
      to: '/users',
      label: 'users.breadcrumbs.list',
    },
    {
      to: '',
      label: 'users.breadcrumbs.view',
      params: { id: (route) => route.params.id as string },
    },
  ],
});

const toast = useToast();

const { id } = useRoute().params;
const { data, error } = await useAsyncData('user:data', () => $fetch(`/api/users/${id}`));

watch(error, (err) => {
  if (err) {
    toast.add({
      title: 'Error Fetching User Data',
      description:
        (err.data as FetchError).message || 'An error occurred while fetching user data.',
      color: 'error',
    });
  }
});
</script>

<template>
  <div>
    <h1>User Profile: {{ data?.id }}</h1>
    <p>Name: {{ data?.name }}</p>
    <p>Email: {{ data?.jobTitle }}</p>
  </div>
</template>
