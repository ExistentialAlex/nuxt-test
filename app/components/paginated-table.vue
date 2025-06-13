<script lang="ts" setup generic="T extends TableData">
import type { AsyncDataRequestStatus } from '#app';
import type { TableColumn, TableData } from '@nuxt/ui';

const pagination = defineModel<{
  pageIndex: number;
  pageSize: number;
}>('pagination', { required: true });
const limit = defineModel<number>('limit', { required: true });
const page = defineModel<number>('page', { required: true });
const sort = defineModel<ColumnSort[]>('sort', { required: false });

interface IPaginatedTableProps {
  data: T[];
  status: AsyncDataRequestStatus;
  limitItems: number[];
  totalData: number | undefined;
  columns?: TableColumn<T>[];
}
defineProps<IPaginatedTableProps>();
</script>

<template>
  <UTable
    v-model:pagination="pagination"
    v-model:sorting="sort"
    :data="data"
    :pagination-options="{
      manualPagination: true,
    }"
    class="h-96 w-full"
    sticky
    :loading="status === 'pending'"
    :columns="columns"
  />
  <div class="grid w-full grid-cols-3 gap-4">
    <USelect v-model="limit" :items="limitItems" class="w-24" />
    <UPagination v-model:page="page" :items-per-page="limit" :total="totalData" class="mx-auto" />
  </div>
</template>
