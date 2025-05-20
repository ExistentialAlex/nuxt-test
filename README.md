# Nuxt Test

This is a PoC for using Nuxt for the development of the AdFinity product suite.

It explores adding some basic pages and endpoints plus user authentication.

---

For more info on Nuxt, look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Running Locally

To try this out locally, follow the steps below:

### Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

### Add Environment Variables

As this app uses Github OAuth for authentication, there's some additional config needed to get it to work.

1. In the root of your local project, create a `.env` file if needed.
2. Add the following content to it:

    ```txt
    NUXT_OAUTH_GITHUB_CLIENT_ID=<your client ID>
    NUXT_OAUTH_GITHUB_CLIENT_SECRET=<your client secret>
    ```

3. Follow these instructions to [Create a Github OAuth App](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app) and put the client ID and secret in the `.env` file.

You're now ready to run Nuxt locally using OAuth.

---

To login with username and password, use the following credentials:

- email: `admin@admin.com`
- password: `iamtheadmin`

### Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

### Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
