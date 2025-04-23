<script setup lang="ts">
definePageMeta({
  middleware: ['authenticated'],
  breadcrumbs: [
    {
      href: '/dashboard',
      title: 'sidebar.dashboard',
    },
  ],
});
</script>
<template>
  <h1>Dashboard</h1>
</template>
