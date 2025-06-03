// auth.d.ts
declare module '#auth-utils' {
  interface User {
    githubId?: number;
    name: string;
    jobTitle: string;
  }
}

export {};
