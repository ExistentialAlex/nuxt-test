<script lang="ts" setup>
definePageMeta({
  middleware: ['authenticated'],
  breadcrumbs: [
    {
      to: '/users',
      label: 'users.breadcrumbs.list',
    },
  ],
});

const { id } = useRoute().params;

const { data } = await useAsyncData('user:data', () => $fetch(`/api/users/${id}`));
</script>

<template>
  <div>
    <h1>User Profile: {{ data?.id }}</h1>
    <p>Name: {{ data?.name }}</p>
    <p>Email: {{ data?.jobTitle }}</p>
  </div>
</template>
