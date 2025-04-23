<script setup lang="ts">
import type { IAppBreadcrumb } from '~/types';
import {
  AdtBgColors,
  AdtBorderColors,
  AdtBreadcrumb,
  AdtButton,
  AdtCard,
  AdtIcon,
  AdtIcons,
  AdtPopover,
  AdtTabs,
  AdtTextColors,
  FeatherIcons,
  useTailwind,
  type IAdtRoute,
} from '@sky-uk/adtech-ui-components';
import { useColorMode } from '@vueuse/core';
import { computed } from 'vue';

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
const { backgroundColorClass, borderColorClass, textColorClass } =
  useTailwind();

const mode = useColorMode({
  emitAuto: true,
  modes: {
    dark: 'dark',
    light: '',
  },
});
const colorModeTabs = [
  {
    key: 'auto',
    title: t('navbar.colorMode.auto'),
    icon: FeatherIcons.play,
  },
  {
    key: 'light',
    title: t('navbar.colorMode.light'),
    icon: FeatherIcons.sun,
  },
  {
    key: 'dark',
    title: t('navbar.colorMode.dark'),
    icon: FeatherIcons.moon,
  },
];

const processedBreadcrumbs = computed<IAdtRoute[]>(() => {
  if (!props.breadcrumbs?.length) {
    return [];
  }

  return props.breadcrumbs.map((bc) => {
    if (bc.params) {
      const params = Object.fromEntries(
        Object.entries(bc.params).map(([k, v]) => [k, v(route)])
      );
      return { ...bc, title: t(bc.title, params) };
    }

    return { ...bc, title: t(bc.title) };
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
    class="sticky top-0 z-10 flex w-full items-center border-b p-2"
    :class="[
      backgroundColorClass(AdtBgColors[50]),
      borderColorClass(AdtBorderColors[50]),
    ]"
  >
    <AdtButton
      class="mr-2"
      appearance="icon"
      data-testid="topnav-sidebar-toggle"
      @click="sidebarValue = !sidebarValue"
    >
      <AdtIcon :model-value="AdtIcons.sidebar" />
    </AdtButton>
    <AdtBreadcrumb
      v-if="!!processedBreadcrumbs.length"
      :routes="processedBreadcrumbs"
    />
    <AdtPopover class="ml-auto" :offset="16">
      <template #trigger="{ toggleOpen }">
        <AdtButton appearance="icon" border-radius="full" @click="toggleOpen">
          <AdtIcon :model-value="AdtIcons.gear" />
        </AdtButton>
      </template>
      <AdtCard>
        <h4 :class="[textColorClass(AdtTextColors[600])]">
          {{ t('navbar.quickSettings') }}
        </h4>
        <hr class="my-4" />
        <p class="mb-2 text-xs" :class="[textColorClass(AdtTextColors[600])]">
          {{ t('navbar.colorMode.title') }}
        </p>
        <AdtTabs v-model="mode" :tabs="colorModeTabs" pills>
          <template
            v-for="tab in colorModeTabs"
            :key="tab.key"
            #[`tab-title-${tab.key}`]
          >
            <div class="flex items-center">
              <AdtIcon :model-value="tab.icon" class="mr-2" />
              <p>{{ tab.title }}</p>
            </div>
          </template>
        </AdtTabs>
      </AdtCard>
    </AdtPopover>
  </nav>
</template>
<style lang="scss"></style>
