export default defineEventHandler(async (event) => {
  await requireUserSession(event);

  const { id } = getRouterParams(event);

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User ID is required',
    });
  }

  return {
    id,
    name: 'Alex Ashwood',
    jobTitle: 'Developer',
  };
});
