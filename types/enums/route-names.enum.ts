import { Routes } from './routes.enum';

export const RouteNames = {
  [Routes.login]: 'login',
  [Routes.dashboard]: 'dashboard',
  [Routes.home]: 'home',
} as const;

export type RouteNames = (typeof RouteNames)[keyof typeof RouteNames];
