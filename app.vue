<script setup lang="ts">
import {
  AdtSnackbarManager,
  AdtNotificationManager,
  useTailwind,
} from '@sky-uk/adtech-ui-components';
import {
  useNotificationStore,
  useSnackbarStore,
} from '@sky-uk/adtech-ui-components-stores';

const snackbarStore = useSnackbarStore();
const notificationStore = useNotificationStore();
const { backgroundColorClass } = useTailwind();

const sidebarModel = ref(true);
const sidebar = useSidebar(sidebarModel);

provide(useSidebarInjectionKey, sidebar);
</script>
<template>
  <div :class="[backgroundColorClass('50')]">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <AdtSnackbarManager
      :model-value="snackbarStore.getSnackbars"
      bottom
      disappearing
      @update:model-value="snackbarStore.setSnackbars"
    />
    <AdtNotificationManager
      :model-value="notificationStore.getNotifications"
      bottom
      right
      disappearing
    />
  </div>
</template>
