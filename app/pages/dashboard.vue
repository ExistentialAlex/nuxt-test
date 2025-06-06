<script setup lang="ts">
definePageMeta({
  middleware: ['authenticated'],
  breadcrumbs: [
    {
      to: '/dashboard',
      label: 'sidebar.dashboard',
    },
  ],
});
</script>
<template>
  <h1>Dashboard</h1>
</template>
