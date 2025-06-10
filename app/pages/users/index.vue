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
      <PaginatedTable
        v-model:pagination="pagination"
        v-model:limit="limit"
        v-model:page="page"
        :data="data?.results || []"
        :limit-items="limitItems"
        :status="status"
        :total-data="data?.count"
      />
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
