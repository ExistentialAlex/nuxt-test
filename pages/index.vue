<script setup lang="ts">
definePageMeta({
  name: 'home',
  middleware: ['authenticated'],
  breadcrumbs: [
    {
      href: '/',
      title: 'sidebar.home',
    },
  ],
});
</script>
<template>
  <h1>Home</h1>
</template>
