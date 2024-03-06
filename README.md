# Vercel Times

The Vercel Times is a newsletter template that shows how to do paywalled content in Next.js with Middleware and the App Router. You can read more in the blog post for [The Vercel Times](https://vercel.com/).

## How to Use

You can choose from one of the following two methods to use this repository:

### One-Click Deploy

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=vercel-examples):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fvercel-times&project-name=the-vercel-times&repository-name=the-vercel-times)

### Clone and Deploy

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [pnpm](https://pnpm.io/installation) to bootstrap the example:

```bash
pnpm create next-app --example https://github.com/vercel/vercel-times
```

Next, run Next.js in development mode:

```bash
pnpm dev
```

The app should be up and running at http://localhost:3000.

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=edge-middleware-eap) ([Documentation](https://nextjs.org/docs/app/building-your-application/deploying#managed-nextjs-with-vercel)).

### (Optional) Set up The New York Times API

The example uses a local copy of the data from The New York Times API. To use their API instead follow the instructions in [The New York Times API documentation](https://developer.nytimes.com/get-started).

Then, rename [`.env.example`](.env.example) to `.env.local`:

```bash
cp .env.example .env.local
```

And update `NYTIMES_API_KEY` with your secret key.

> Note: The New York Times API can get you rate limited quickly in localhost. If you hit this limit, comment your API key in `.env.local` to use the local copy of the data instead.
>
> This does not affect the production build because the amount of times the API is called in production is much lower.
