<script setup lang="ts">
import type { IAppBreadcrumb } from '~/types';
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

const mode = useColorMode();
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
    class="sticky top-0 z-10 flex w-full items-center border-b border-neutral-800 p-4"
  >
    <UButton
      variant="ghost"
      color="neutral"
      class="mr-2"
      data-testid="topnav-sidebar-toggle"
      @click="sidebarValue = !sidebarValue"
    >
      <UIcon :name="!sidebarValue ? 'i-fe-arrow-left' : 'i-fe-arrow-right'" />
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
          <UTabs v-model="mode.value" :items="colorModeTabs" :content="false" />
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
