---
outline: deep
---

# Usage Patterns

These patterns reflect common ways to use the SDK in a real integration service.

## Runtime-First Client

Use `createClient` when you want the smallest amount of setup code.

```ts
import { createClient } from 'maplerad-sdk';

const sdk = createClient({
  environment: 'sandbox',
  clientSecret: process.env.MAPLERAD_CLIENT_SECRET!,
});

const customer = await sdk.api.customers.create({
  first_name: 'Ada',
  last_name: 'Lovelace',
  email: 'ada@example.com',
  country: 'NG',
});
```

If you have already defined defaults in `oapiex.config.js`, this also works:

```ts
const sdk = createClient({});
```

## Class-Based Client

Use `Core` if you want a named SDK instance that can be passed around explicitly.

```ts
import { Core } from 'maplerad-sdk';

const sdk = new Core({
  environment: 'sandbox',
  clientSecret: process.env.MAPLERAD_CLIENT_SECRET!,
});

const customer = await sdk.api.customers.get({ id: 'cus_123' });
```

This style is useful when you want to pass a concrete SDK instance through service constructors or shared modules.

## Namespaced APIs

The generated binder groups endpoints under `sdk.api`. A few common namespaces are:

- `sdk.api.customers`
- `sdk.api.customerAccounts`
- `sdk.api.wallets`
- `sdk.api.transfers`
- `sdk.api.virtualAccountCustomers`
- `sdk.api.utilityBills`
- `sdk.api.issuings`
- `sdk.api.subscriptions`

Each namespace exposes only the methods generated for that resource, such as `create`, `list`, or `get`.

For detailed descriptions of each namespace, move to the [API section](/api/overview).

## Working With Types

The package exports schema types directly, so you can type request payloads and responses without maintaining your own copies.

```ts
import {
  createClient,
  type CustomerInput,
  type TransferCreateInput,
} from 'maplerad-sdk';

const sdk = createClient({});

const customerPayload: CustomerInput = {
  first_name: 'Ada',
  last_name: 'Lovelace',
  email: 'ada@example.com',
  country: 'NG',
};

const transferPayload: TransferCreateInput = {
  amount: 5000,
} as TransferCreateInput;

await sdk.api.customers.create(customerPayload);
await sdk.api.transfers.create(transferPayload);
```

## Default Headers and Timeouts

```ts
const sdk = createClient({
  timeout: 15_000,
  headers: {
    'x-request-id': crypto.randomUUID(),
  },
  clientSecret: process.env.MAPLERAD_CLIENT_SECRET!,
});
```

Use per-request idempotency or tracing headers in your integration layer when you are calling payment or transfer-like endpoints.

## Error Handling

The package re-exports HTTP exception classes from `@oapiex/sdk-kit`.

```ts
import { HttpException, UnauthorizedRequestException } from 'maplerad-sdk';

try {
  await sdk.api.wallets.list();
} catch (error) {
  if (error instanceof UnauthorizedRequestException) {
    // refresh or rotate credentials
  }

  if (error instanceof HttpException) {
    console.error(error.message);
  }

  throw error;
}
```

## Customer Flow

This simple create, list, and fetch flow is useful when you want to verify your credentials and environment:

```ts
const client = createClient({});

const created = await client.api.customers.create({
  first_name: 'Ada',
  last_name: 'Lovelace',
  email: 'ada@example.com',
  country: 'NG',
});

const list = await client.api.customers.list({});
const customer = await client.api.customers.get({ id: created.id! });
```
