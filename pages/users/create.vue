<template>
  <h1>Create User</h1>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: ['authenticated'],
  breadcrumbs: [
    {
      to: '/users',
      label: 'users.breadcrumbs.list',
    },
    {
      to: '/users/create',
      label: 'users.breadcrumbs.create',
    },
  ],
});
</script>
