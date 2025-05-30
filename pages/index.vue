<script setup lang="ts">
definePageMeta({
  name: 'home',
  middleware: ['authenticated'],
  breadcrumbs: [
    {
      to: '/',
      label: 'sidebar.home',
    },
  ],
});
</script>
<template>
  <h1>Home</h1>
</template>
