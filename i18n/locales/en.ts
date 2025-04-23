import type { II18nFunctions } from '~/types';

export const en = {
  navbar: {
    quickSettings: 'Quick Settings',
    colorMode: {
      title: 'Colour Mode',
      auto: 'Auto',
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
  attributes: {
    rules: {
      name: {
        required: 'Attribute name is required.',
      },
      displayName: {
        required: 'Display name is required.',
      },
      description: {
        required: 'Attribute description is required.',
      },
      status: {
        required: 'Attribute status is required.',
      },
      type: {
        required: 'Attribute type is required.',
      },
    },
    breadcrumbs: {
      base: 'Attributes',
      list: 'List',
      create: 'Create',
      update: 'Update',
      attributeId: ({ named }: II18nFunctions) => `${named('attributeId')}`,
    },
    views: {
      list: {
        title: 'Attributes',
        addAttributeButton: 'Add Attribute',
      },
      builder: {
        name: 'Attribute Name',
        displayName: 'Display Name',
        description: 'Attribute Description',
        status: 'Attribute Status',
        type: 'Attribute Type',
        platforms: 'Platforms',
        operations: 'Operations',
        organisations: 'Organisations',
        isEnabled: 'Enabled',
        save: 'Save',
        snackbars: {
          validate: {
            title: 'Validation Error',
            message: 'Please check the form and try and again.',
          },
        },
      },
    },
    stores: {
      attributeBuilder: {
        snackbars: {
          loadAttribute: {
            error: {
              title: 'Error Loading Attribute',
              message: 'An error occurred loading the requested attribute. Please try again later.',
            },
          },
          saveAttribute: {
            success: {
              title: 'Save Successful',
              message: 'Attribute saved successfully.',
            },
            error: {
              title: 'Save Error',
              message:
                'An error occurred when saving the attribute, please check the attribute details and try again.',
            },
          },
          loadSupportingData: {
            error: {
              title: 'Error Loading Supporting Data',
              message: 'An error occured loading the supporting data. Please try again later.',
            },
          },
        },
      },
    },
  },
  segments: {
    breadcrumbs: {
      base: 'Segments',
      list: 'List',
      create: 'Create',
    },
    views: {
      list: {
        title: 'Segments',
        addSegmentButton: 'Add Segment',
      },
    },
  },
  users: {
    breadcrumbs: {
      base: 'Users',
      list: 'List',
      create: 'Create',
    },
    views: {
      list: {
        title: 'Users',
        addUserButton: 'Add User',
      },
    },
  },
};

export type MessageSchema = typeof en;
