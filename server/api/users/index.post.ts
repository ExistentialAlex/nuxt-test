import { userSchema } from '~~/shared/schemas';

export default defineEventHandler(async (event) => {
  await requireUserSession(event);

  const { name, jobTitle } = await readValidatedBody(event, userSchema.parse);

  return {
    id: 1,
    name,
    jobTitle,
  };
});
