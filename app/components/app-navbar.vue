<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui';

export interface IAppNavbarProps {
  sidebar: boolean;
  breadcrumbs?: IAppBreadcrumb[];
}

export interface IAppNavbarEmits {
  'update:sidebar': [open: boolean];
}

const route = useRoute();
const props = defineProps<IAppNavbarProps>();
const emit = defineEmits<IAppNavbarEmits>();

const { t } = useI18n();
const { clear: clearSession } = useUserSession();

const logout = async () => {
  await clearSession();
  await navigateTo('/login');
};

const colorModeTabs = [
  {
    value: 'auto',
    label: t('navbar.colorMode.system'),
    icon: 'i-fe-desktop',
  },
  {
    value: 'light',
    label: t('navbar.colorMode.light'),
    icon: 'i-fe-sunny-o',
  },
  {
    value: 'dark',
    label: t('navbar.colorMode.dark'),
    icon: 'i-fe-moon',
  },
];

const processedBreadcrumbs = computed<BreadcrumbItem[]>(() => {
  if (!props.breadcrumbs?.length) {
    return [];
  }

  return props.breadcrumbs.map((bc) => {
    if (bc.params) {
      const params = Object.fromEntries(Object.entries(bc.params).map(([k, v]) => [k, v(route)]));
      return { ...bc, label: t(bc.label, params) };
    }

    return { ...bc, label: t(bc.label) };
  });
});

const sidebarValue = computed({
  get: () => props.sidebar,
  set: (v) => emit('update:sidebar', v),
});
</script>
<template>
  <nav
    id="topnav"
    class="sticky top-0 z-10 flex w-full items-center border-b border-neutral-200 p-4 dark:border-neutral-700"
  >
    <UButton
      variant="ghost"
      color="neutral"
      class="mr-2"
      data-testid="topnav-sidebar-toggle"
      @click="sidebarValue = !sidebarValue"
    >
      <UIcon
        name="i-fe-arrow-left"
        class="transition-transform duration-500"
        :class="[{ 'rotate-180': !sidebarValue }]"
      />
    </UButton>
    <UBreadcrumb v-if="!!processedBreadcrumbs.length" :items="processedBreadcrumbs" />
    <UPopover class="ml-auto">
      <UTooltip text="Settings">
        <UButton color="neutral" variant="ghost">
          <UIcon name="i-fe-gear" />
        </UButton>
      </UTooltip>
      <template #content>
        <div class="p-4">
          <p class="mb-2 text-xs">
            {{ t('navbar.colorMode.title') }}
          </p>
          <UTabs v-model="$colorMode.preference" :items="colorModeTabs" :content="false" />
        </div>
      </template>
    </UPopover>
    <UTooltip text="Sign Out">
      <UButton class="ml-2" color="neutral" variant="ghost" @click="logout">
        <UIcon name="i-fe-logout" />
      </UButton>
    </UTooltip>
  </nav>
</template>
<style lang="scss"></style>
