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
  <h1 data-testid="dashboard">Dashboard</h1>
</template>
