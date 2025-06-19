import { updateUserSchema } from '~~/shared/schemas';

export default defineEventHandler(async (event) => {
  await requireUserSession(event);

  const { id } = getRouterParams(event);

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User ID is required',
    });
  }

  const { name, jobTitle } = await readValidatedBody(event, updateUserSchema.parse);

  return { id, name, jobTitle };
});
