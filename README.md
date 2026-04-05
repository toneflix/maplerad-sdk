# Maplerad SDK

[![NPM Downloads](https://img.shields.io/npm/dt/maplerad-sdk.svg)](https://www.npmjs.com/package/maplerad-sdk)
[![npm version](https://img.shields.io/npm/v/maplerad-sdk.svg?label=version)](https://www.npmjs.com/package/maplerad-sdk)
[![License](https://img.shields.io/npm/l/maplerad-sdk.svg)](https://github.com/toneflix/maplerad-sdk/blob/main/LICENSE)
[![codecov](https://codecov.io/gh/toneflix/maplerad-sdk/graph/badge.svg)](https://codecov.io/gh/toneflix/maplerad-sdk)
[![CI](https://github.com/toneflix/maplerad-sdk/actions/workflows/CI.yml/badge.svg)](https://github.com/toneflix/maplerad-sdk/actions/workflows/CI.yml)
[![Deploy Docs](https://github.com/toneflix/maplerad-sdk/actions/workflows/deploy-docs.yml/badge.svg)](https://github.com/toneflix/maplerad-sdk/actions/workflows/deploy-docs.yml)

Type-safe Node.js SDK for the maplerad API.

This package provides both a class-based client and a runtime-first client for working with maplerad customers, wallets, transfers, virtual accounts, bills, FX, crypto, issuing, and supporting lookup endpoints.

## Documentation

- Docs site: https://toneflix.github.io/maplerad-sdk/
- API overview: https://toneflix.github.io/maplerad-sdk/api/overview
- Configuration guide: https://toneflix.github.io/maplerad-sdk/guide/configuration

## Installation

The package is published as `maplerad-sdk`.

```bash
pnpm add maplerad-sdk
```

## Quick Start

### Runtime-First Client

```ts
import { createClient } from 'maplerad-sdk';

const sdk = createClient({
  environment: 'sandbox',
  clientSecret: process.env.MAPLERAD_CLIENT_SECRET!,
});

const wallets = await sdk.api.wallets.list();
```

### Class-Based Client

```ts
import { Core } from 'maplerad-sdk';

const sdk = new Core({
  environment: 'sandbox',
  clientSecret: process.env.MAPLERAD_CLIENT_SECRET!,
});

const customer = await sdk.api.customers.get({ id: 'cus_123' });
```

## Minimal Configuration

You can keep SDK defaults in `oapiex.config.js` using `defineConfig` from `@oapiex/sdk-kit`:

```js
import { defineConfig } from '@oapiex/sdk-kit';

export default defineConfig({
  clientSecret: process.env.MAPLERAD_CLIENT_SECRET,
  environment: 'sandbox',
  debugLevel: 3,
});
```

With defaults in place, this works too:

```ts
import { createClient } from 'maplerad-sdk';

const sdk = createClient({});
```

## Example Customer Flow

```ts
import { createClient, type CustomerInput } from 'maplerad-sdk';

const sdk = createClient({
  environment: 'sandbox',
  clientSecret: process.env.MAPLERAD_CLIENT_SECRET!,
});

const payload: CustomerInput = {
  first_name: 'Ada',
  last_name: 'Lovelace',
  email: 'ada@example.com',
  country: 'NG',
};

const createdCustomer = await sdk.api.customers.create(payload);
const customers = await sdk.api.customers.list({});
const customer = await sdk.api.customers.get({ id: createdCustomer.id! });
```

## Main Exports

- `createClient()` for runtime-first usage
- `Core` for class-based usage
- `ApiBinder` and `BaseApi` for SDK extension points
- Generated schema types exported from `Schema`
- `defineConfig`, `createSdk`, `Http`, `Builder`, and related runtime helpers re-exported from `@oapiex/sdk-kit`

## Built On

This SDK is built on top of `@oapiex/sdk-kit`, which provides the shared runtime primitives behind configuration, auth handling, transport, and manifest binding.

- SDK Kit reference: https://toneflix.github.io/oapiex/reference/sdk-kit

## Available API Groups

- Customers and identity
- Wallets and transfers
- Virtual accounts and collections
- Bills and utilities
- FX, crypto, and USD
- Issuing and cards

See the full grouped reference in the docs site:

- https://toneflix.github.io/maplerad-sdk/api/overview

## Development

```bash
pnpm install
pnpm lint
pnpm test
pnpm coverage
pnpm build
pnpm docs:dev
pnpm docs:build
```

## Environment Variables

```bash
MAPLERAD_CLIENT_SECRET=your_client_secret_key
MAPLERAD_CLIENT_ID=your_client_id
MAPLERAD_ENCRYPTION_KEY=your_encryption_key
```

Keep secrets on the server side. Do not expose Maplerad credentials in client-side applications.
