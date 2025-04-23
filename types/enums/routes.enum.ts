export const Routes = {
  login: 'login',
  dashboard: 'dashboard',
  home: 'home',
} as const;

export type Routes = (typeof Routes)[keyof typeof Routes];
