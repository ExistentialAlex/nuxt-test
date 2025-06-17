import { UserSchema } from '~~/shared/schemas';

export default defineEventHandler(async (event) => {
  await requireUserSession(event);

  const { page, limit, search, sort } = getQuery(event);

  const users: UserSchema[] = [
    {
      id: 1,
      name: 'Alex Ashwood',
      jobTitle: 'Developer',
    },
  ];

  for (let i = 0; i < 50; i++) {
    users.push({ id: i + 2, name: `User ${i + 1}`, jobTitle: 'Developer' });
  }

  return paginate(users, Number(page), limit ? Number(limit) : undefined);
});
