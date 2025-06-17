import { z } from 'zod';
import { userSchema, UserSchema } from '~~/shared/schemas';

export default defineEventHandler(async (event) => {
  await requireUserSession(event);

  const { id } = getRouterParams(event);

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User ID is required',
    });
  }

  const partialUserSchema = userSchema.partial();

  const { name, jobTitle } = await readValidatedBody(event, partialUserSchema.parse);

  return { id, name, jobTitle };
});
