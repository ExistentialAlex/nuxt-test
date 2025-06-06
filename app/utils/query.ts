import type { RouteLocationNormalizedGeneric } from 'vue-router';

export const getQueryParamValue = <T>(
  route: RouteLocationNormalizedGeneric,
  key: string,
  converter: (v: string) => T,
  defaultValue: T
): T => {
  const v = route.query[key];
  return v && !Array.isArray(v) ? converter(v) : defaultValue;
};
