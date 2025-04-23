<script setup lang="ts">
import AppNavbar from '~/components/app-navbar.vue';
import {
  AdtSidebar,
  AdtSidebarItem,
  AdtIcons,
  AdtTooltip,
  useTailwind,
} from '@sky-uk/adtech-ui-components';
import { injectStrict } from '@sky-uk/adtech-vue-utils';
import type { IAppBreadcrumb } from '~/types';

const { loggedIn, clear: clearSession } = useUserSession();
const { borderColorClass } = useTailwind();
const { sidebarModel, sidebarItems } = injectStrict(useSidebarInjectionKey);
const { t } = useI18n();
const route = useRoute();

const logout = async () => {
  await clearSession();
  await navigateTo('/login');
};
</script>
<template>
  <div class="[ app ] flex min-h-screen">
    <AdtSidebar
      v-if="loggedIn"
      v-model="sidebarModel"
      :items="sidebarItems"
      class="sticky top-0 z-20 flex h-screen flex-col"
    >
      <!-- <template #top="{ open }">
        <div class="flex items-center gap-3 px-4 pt-4 pb-2">
          <AdtAvatar :model-value="user" />

          <div
            v-if="open"
            class="flex min-h-10 min-w-12 flex-col whitespace-nowrap"
          >
            <h5
              id="user-name"
              data-testid="user-name"
              :class="textColorClass(AdtTextColors[600])"
            >
              {{ getOAuthUser?.displayName }}
            </h5>
            <span
              id="user-role"
              data-testid="user-role"
              class="text-start text-[12px]"
              :class="textColorClass(AdtTextColors[600])"
            >
              Developer
            </span>
          </div>
        </div>
      </template> -->
      <template #bottom="{ open }">
        <div
          class="relative mt-auto border-t px-4 py-3"
          :class="[borderColorClass('50')]"
        >
          <AdtTooltip
            placement="right-center"
            data-testid="sidebar__sign-out-tooltip"
            :disable-hover="open"
          >
            {{ t('sidebar.signOut') }}
            <template #activator>
              <AdtSidebarItem
                :model-value="{
                  icon: AdtIcons.signOut,
                  href: '',
                  id: 'sign-out',
                  title: t('sidebar.signOut'),
                }"
                no-link
                data-testid="sidebar__sign-out"
                :sidebar-open="open"
                @click="logout"
              />
            </template>
          </AdtTooltip>
        </div>
      </template>
    </AdtSidebar>
    <main id="app-main" class="grid flex-1">
      <AppNavbar
        v-model:sidebar="sidebarModel"
        :breadcrumbs="route.meta.breadcrumbs as IAppBreadcrumb[]"
      />
      <slot></slot>
    </main>
  </div>
</template>
<style>
#app-main {
  grid-template-rows: auto 1fr;
}
</style>
