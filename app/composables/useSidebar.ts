import { useI18n } from 'vue-i18n';

export const useSidebar = () => {
  const { t } = useI18n();

  const sidebarModel = useState('sidebar-model', () => true);

  const toggleSidebar = () => (sidebarModel.value = !sidebarModel.value);

  const sidebarItems = useState('sidebar-items', () => [
    [
      {
        value: 'home',
        label: t('sidebar.home'),
        to: RouteHrefs.home,
        icon: 'i-fe-home',
      },
      {
        value: 'dashboard',
        label: t('sidebar.dashboard'),
        to: RouteHrefs.dashboard,
        icon: 'i-fe-browser',
      },
    ],
    [
      {
        value: 'users-list',
        label: 'Users',
        to: '/users',
        icon: 'i-fe-user',
      },
    ],
  ]);

  return { sidebarItems, toggleSidebar, sidebarModel };
};

export const useSidebarInjectionKey: InjectionKey<ReturnType<typeof useSidebar>> = Symbol(
  'useSidebar'
) as InjectionKey<ReturnType<typeof useSidebar>>;
