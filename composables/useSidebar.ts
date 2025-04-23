import { RouteHrefs } from '@/types';
import { AdtIcons, FeatherIcons, type IAdtSidebarGroup } from '@sky-uk/adtech-ui-components';
import type { InjectionKey, Ref } from 'vue';
import { useI18n } from 'vue-i18n';

export const useSidebar = (sidebarModel: Ref<boolean>) => {
  const { t } = useI18n();

  const toggleSidebar = () => (sidebarModel.value = !sidebarModel.value);

  const home: IAdtSidebarGroup = {
    id: 'home',
    title: t('sidebar.home'),
    routes: [
      {
        id: 'home',
        title: t('sidebar.home'),
        href: RouteHrefs.home,
        icon: FeatherIcons.home,
      },
    ],
  };

  const dashboard: IAdtSidebarGroup = {
    id: 'dashboard',
    title: t('sidebar.dashboard'),
    routes: [
      {
        id: 'dashboard',
        title: t('sidebar.dashboard'),
        href: RouteHrefs.dashboard,
        icon: AdtIcons.dashboard,
      },
    ],
  };

  const sidebarItems = [home, dashboard];

  return { sidebarItems, toggleSidebar, sidebarModel };
};

export const useSidebarInjectionKey: InjectionKey<
  ReturnType<typeof useSidebar>
> = Symbol('useSidebar');
