export default {
  navbar: {
    quickSettings: 'Quick Settings',
    colorMode: {
      title: 'Colour Mode',
      system: 'System',
      light: 'Light',
      dark: 'Dark',
    },
  },
  sidebar: {
    home: 'Home',
    dashboard: 'Dashboard',
    attributes: 'Attributes',
    createAttribute: 'Create Attribute',
    segments: 'Segments',
    createSegment: 'Create Segment',
    system: 'System',
    users: 'Users',
    signOut: 'Sign Out',
  },
  dashboard: {
    breadcrumbs: {
      base: 'Dashboard',
    },
  },
  users: {
    breadcrumbs: {
      base: 'Users',
      list: 'List',
      create: 'Create',
      edit: ({ named }: II18nFunctions) => `Edit: ${named('id')}`,
      view: ({ named }: II18nFunctions) => `${named('id')}`,
    },
    views: {
      list: {
        title: 'Users',
        addUserButton: 'Add User',
      },
    },
  },
};
