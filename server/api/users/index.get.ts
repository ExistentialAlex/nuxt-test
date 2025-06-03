import type { User } from '#auth-utils';
import { usePagination } from '~/server/utils/pagination';

export default defineEventHandler(async (event) => {
  const { page, limit } = getQuery(event);

  const users: User[] = [
    {
      name: 'Alex Ashwood',
      jobTitle: 'Developer',
    },
  ];

  for (let i = 0; i < 50; i++) {
    users.push({ name: `User ${i + 1}`, jobTitle: 'Developer' });
  }

  return usePagination(users, Number(page), limit ? Number(limit) : undefined);
});
