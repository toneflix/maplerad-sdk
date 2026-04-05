---
outline: deep
---

# Getting Started

This guide will help you install and start using the Maplerad SDK in a Node.js or TypeScript project.

## Installation

::: code-group

```bash [pnpm]
pnpm add maplerad-sdk
```

```bash [npm]
npm install maplerad-sdk
```

```bash [yarn]
yarn add maplerad-sdk
```

:::

## Quick Start

### 1. Get Your Credentials

At minimum, a simple SDK setup can use `MAPLERAD_CLIENT_SECRET` with the sandbox environment. Depending on your integration, you can also supply `clientId`, `encryptionKey`, custom `auth`, and URL overrides.

::: warning
Never expose your Maplerad secret or any encryption key in client-side code or public repositories.
:::

### 2. Choose an Initialization Style

The package exposes two main ways to construct the SDK:

- `createClient(options)` for concise runtime-first setup.
- `new Core(options)` if you prefer an explicit class instance.

Both approaches expose the same grouped API namespaces under `client.api`.

### 3. Initialize the SDK

This is the smallest explicit setup for a direct sandbox integration:

```ts
import { createClient } from 'maplerad-sdk';

export const sdk = createClient({
  environment: 'sandbox',
  clientSecret: process.env.MAPLERAD_CLIENT_SECRET!,
});
```

If you keep your defaults in `oapiex.config.js`, you can also initialize with an empty options object:

```ts
import { createClient } from 'maplerad-sdk';

const sdk = createClient({});
```

### 4. Make Your First API Call

A simple first flow is to create a customer, list customers, and fetch one by ID:

```ts
const customer = await sdk.api.customers.create({
  first_name: 'Ada',
  last_name: 'Lovelace',
  email: 'ada@example.com',
  country: 'NG',
});

const customers = await sdk.api.customers.list({});
const fetched = await sdk.api.customers.get({ id: customer.id! });
```

## Core Class Setup

If you prefer a class instance, this pattern works the same way:

```ts
import { Core } from 'maplerad-sdk';

const sdk = new Core({
  environment: 'sandbox',
  clientSecret: process.env.MAPLERAD_CLIENT_SECRET!,
});

const customer = await sdk.api.customers.get({ id: 'cus_123' });
```

## Supported Initialization Options

The SDK re-exports `InitOptions` from `@oapiex/sdk-kit`. The main options are:

- `clientId`: your API public key.
- `clientSecret`: your API secret key.
- `encryptionKey`: your API encryption key.
- `environment`: target environment such as `sandbox` or `live`.
- `urls`: override base URLs if you need custom routing.
- `headers`: default headers applied to every request.
- `timeout`: request timeout in milliseconds.
- `auth`: one or more auth strategies.
- `debugLevel`: HTTP debug verbosity.

For a fuller breakdown of how these values map to a real project setup, including `defineConfig`, see [Configuration](/guide/configuration).

## Authentication

If you only pass `clientSecret`, this minimal configuration works well for sandbox usage:

```ts
const sdk = createClient({
  environment: 'sandbox',
  clientSecret: process.env.MAPLERAD_CLIENT_SECRET!,
});
```

If you need more control, you can pass an explicit auth strategy:

```ts
const sdk = createClient({
  environment: 'sandbox',
  clientSecret: process.env.MAPLERAD_CLIENT_SECRET!,
  auth: {
    type: 'bearer',
    token: process.env.MAPLERAD_CLIENT_SECRET!,
  },
});
```

## First Request

```ts
const wallets = await sdk.api.wallets.list();

console.log(wallets);
```

## Environment Variables

```bash
MAPLERAD_CLIENT_SECRET=your_secret_key
```

You can also provide additional variables when your integration needs them:

```bash
MAPLERAD_CLIENT_ID=your_client_id
MAPLERAD_ENCRYPTION_KEY=your_encryption_key
```

Keep secrets on the server side. If you use this SDK inside an app with a browser runtime, route calls through your backend instead of exposing credentials to end users.

## Next Steps

- Review [Configuration](/guide/configuration) for `defineConfig` and advanced options.
- Explore [Usage Patterns](/guide/usage-patterns) for runtime and class-based client styles.
- Read [API Overview](/api/overview) for the grouped API surface.
