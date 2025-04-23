<script setup lang="ts">
definePageMeta({
  middleware: ['authenticated'],
  breadcrumbs: [
    {
      href: '/home',
      title: 'sidebar.home',
    },
  ],
});
</script>
<template>
  <h1>Home</h1>
</template>
