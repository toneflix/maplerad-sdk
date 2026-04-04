# MappleradSdk

Generated TypeScript SDK emitted by oapiex with both class-based and runtime-first entrypoints.

## Install

```bash
pnpm add MappleradSdk
```

## Quick Start

```ts
import {
  Core,
  createClient,
  type ActiveInput,
  type ActiveParams,
} from 'MappleradSdk';

const sdk = new Core({
  clientId: process.env.MAPLERAD_CLIENT_ID!,
  clientSecret: process.env.MAPLERAD_CLIENT_SECRET!,
  environment: 'sandbox',
});

await sdk.api.activeCustomers.create({} as ActiveParams, {} as ActiveInput);

// --- OR ---

const runtimeSdk = createClient({
  clientId: process.env.MAPLERAD_CLIENT_ID!,
  clientSecret: process.env.MAPLERAD_CLIENT_SECRET!,
  environment: 'sandbox',
});

await runtimeSdk.api.activeCustomers.create(
  {} as ActiveParams,
  {} as ActiveInput,
);
```

## Main Exports

- `Core` for class-based usage
- `createClient()` for runtime-first usage
- `Schema` exports for generated request, response, params, query, and header types

## Commands

```bash
pnpm test
pnpm build
```
