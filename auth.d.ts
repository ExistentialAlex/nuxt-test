import type { UserSchema } from './shared/schemas';

// auth.d.ts
declare module '#auth-utils' {
  interface User extends UserSchema {}
}

export {};
