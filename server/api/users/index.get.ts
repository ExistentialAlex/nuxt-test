import type { User } from '#auth-utils';

export default defineEventHandler(async (event) => {
  const { page, limit, search, sort } = getQuery(event);

  const users: User[] = [
    {
      name: 'Alex Ashwood',
      jobTitle: 'Developer',
    },
  ];

  for (let i = 0; i < 50; i++) {
    users.push({ name: `User ${i + 1}`, jobTitle: 'Developer' });
  }

  return paginate(users, Number(page), limit ? Number(limit) : undefined);
});
