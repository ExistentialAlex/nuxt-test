import { loginSchema } from '../../schemas';

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, loginSchema.parse);

  if (email === 'admin@admin.com' && password === 'iamtheadmin') {
    // set the user session in the cookie
    // this server util is auto-imported by the auth-utils module
    await setUserSession(event, {
      user: {
        name: 'John Doe',
      },
    });
    return {};
  }
  throw createError({
    statusCode: 401,
    message: 'Bad credentials',
  });
});
