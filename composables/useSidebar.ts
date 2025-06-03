import { RouteHrefs } from '~/types';
import type { InjectionKey, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { NavigationMenuItem } from '@nuxt/ui';

export const useSidebar = (sidebarModel: Ref<boolean>) => {
  const { t } = useI18n();

  const toggleSidebar = () => (sidebarModel.value = !sidebarModel.value);

  const home: NavigationMenuItem = {
    value: 'home',
    label: t('sidebar.home'),
    to: RouteHrefs.home,
    icon: 'i-fe-home',
  };

  const dashboard: NavigationMenuItem = {
    value: 'dashboard',
    label: t('sidebar.dashboard'),
    to: RouteHrefs.dashboard,
    icon: 'i-fe-browser',
  };

  const users: NavigationMenuItem[] = [
    {
      value: 'users-list',
      label: 'Users',
      to: '/users',
      icon: 'i-fe-user',
    },
  ];

  const sidebarItems = ref([[home, dashboard], users]);

  return { sidebarItems, toggleSidebar, sidebarModel };
};

export const useSidebarInjectionKey: InjectionKey<ReturnType<typeof useSidebar>> = Symbol(
  'useSidebar'
) as InjectionKey<ReturnType<typeof useSidebar>>;
