---
outline: deep
---

# Getting Started

## Installation

::: code-group

```bash [pnpm]
pnpm add mapplerad-sdk
```

```bash [npm]
npm install mapplerad-sdk
```

```bash [yarn]
yarn add mapplerad-sdk
```

:::

## Entry Points

The package exposes two main ways to construct the SDK:

- `createClient(options)` for concise runtime-first setup.
- `new Core(options)` if you prefer an explicit class instance.

Both approaches expose the same grouped API namespaces under `client.api`.

## Minimal Setup

```ts
import { createClient } from 'mapplerad-sdk';

export const sdk = createClient({
  environment: 'sandbox',
  clientSecret: process.env.MAPLERAD_CLIENT_SECRET!,
});
```

## Core Class Setup

```ts
import { Core } from 'mapplerad-sdk';

const sdk = new Core({
  environment: 'sandbox',
  clientSecret: process.env.MAPLERAD_CLIENT_SECRET!,
});
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

For a fuller breakdown of how these values map to a real project setup, see [Configuration](/guide/configuration).

## Authentication

The generated local configuration uses bearer authentication. A practical default looks like this:

```ts
const sdk = createClient({
  environment: 'sandbox',
  clientSecret: process.env.MAPLERAD_CLIENT_SECRET!,
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

Keep secrets on the server side. If you use this SDK inside an app with a browser runtime, route calls through your backend instead of exposing credentials to end users.
