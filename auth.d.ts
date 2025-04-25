// auth.d.ts
declare module '#auth-utils' {
  interface User {
    githubId?: number;
    name: string;
  }
}

export {};
