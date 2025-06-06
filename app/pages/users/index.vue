<template>
  <div class="">
    <div class="flex flex-col gap-8 p-8">
      <h1 class="text-2xl">Users</h1>
      <span class="flex gap-4">
        <UInput v-model="search" class="w-full" icon="i-fe-search" size="lg" />
        <ULink to="/users/create" class="whitespace-nowrap">
          <UButton size="lg" icon="i-fe-plus">Create User </UButton>
        </ULink>
      </span>
    </div>
    <hr class="my-4 border-neutral-200 dark:border-neutral-700" />
    <div class="flex flex-col items-center gap-4 p-8">
      <UTable
        v-model:pagination="pagination"
        :data="data?.results || []"
        :pagination-options="{
          manualPagination: true,
        }"
        class="h-96 w-full"
        sticky
        :loading="status === 'pending'"
      />
      <div class="grid w-full grid-cols-3 gap-4">
        <USelect v-model="limit" :items="limitItems" class="w-24" />
        <UPagination
          v-model:page="page"
          :items-per-page="limit"
          :total="data?.count"
          class="mx-auto"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: ['authenticated'],
  breadcrumbs: [
    {
      to: '/users',
      label: 'users.breadcrumbs.list',
    },
  ],
});

const { limit, page, limitItems, pagination, data, status, search } = await useApiPagination(
  'users-list',
  '/api/users'
);
</script>
