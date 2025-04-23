import { Routes } from './routes.enum';

export const RouteHrefs = {
  [Routes.login]: '/login',
  [Routes.dashboard]: '/dashboard',
  [Routes.home]: '/home',
} as const;

export type RouteHrefs = (typeof RouteHrefs)[keyof typeof RouteHrefs];
