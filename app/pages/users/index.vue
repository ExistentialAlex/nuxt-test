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
        v-model:sort="sort"
        :data="data?.results || []"
        :limit-items="limitItems"
        :status="status"
        :total-data="data?.count"
        :columns="columns"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { User } from '#auth-utils';
import { UButton } from '#components';
import type { TableColumn } from '@nuxt/ui';

definePageMeta({
  middleware: ['authenticated'],
  breadcrumbs: [
    {
      to: '/users',
      label: 'users.breadcrumbs.list',
    },
  ],
});

const columns: TableColumn<User>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: 'Name',
        icon: isSorted
          ? isSorted === 'asc'
            ? 'i-lucide-arrow-up-narrow-wide'
            : 'i-lucide-arrow-down-wide-narrow'
          : 'i-lucide-arrow-up-down',
        class: '-mx-2.5',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      });
    },
  },
  {
    accessorKey: 'jobTitle',
    header: 'Job Title',
  },
];

const { limit, page, limitItems, pagination, data, status, search, sort } = await useApiPagination(
  'users-list',
  '/api/users'
);
</script>
