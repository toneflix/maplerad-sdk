---
outline: deep
---

# Examples

These examples use the same initialization and customer flow patterns described throughout this guide, then branch into other common namespaces.

## Create and Fetch a Customer

```ts
import { createClient, type CustomerInput } from 'mapplerad-sdk';

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

## List Business Wallets

```ts
import { createClient } from 'mapplerad-sdk';

const sdk = createClient({
  environment: 'sandbox',
  clientSecret: process.env.MAPLERAD_CLIENT_SECRET!,
});

const wallets = await sdk.api.wallets.list();
```

## Create a Local Transfer

```ts
import { createClient, type TransferCreateInput } from 'mapplerad-sdk';

const sdk = createClient({
  environment: 'sandbox',
  clientSecret: process.env.MAPLERAD_CLIENT_SECRET!,
});

const payload: TransferCreateInput = {
  amount: 5000,
} as TransferCreateInput;

const transfer = await sdk.api.transfers.create(payload);
const verifiedTransfer = await sdk.api.transfers.get({
  transfer_id: transfer.id!,
});
```

## Override Base URLs

```ts
import { createClient } from 'mapplerad-sdk';

const sdk = createClient({
  environment: 'sandbox',
  clientSecret: process.env.MAPLERAD_CLIENT_SECRET!,
});
```

## Reuse a Shared SDK Instance

```ts
import { createClient } from 'mapplerad-sdk';

export const mapplerad = createClient({
  clientSecret: process.env.MAPLERAD_CLIENT_SECRET!,
  environment: process.env.NODE_ENV === 'production' ? 'live' : 'sandbox',
  timeout: 20_000,
});

export async function fetchWallets() {
  return mapplerad.api.wallets.list();
}
```

## Initialize With Core

```ts
import { Core } from 'mapplerad-sdk';

const sdk = new Core({
  clientSecret: process.env.MAPLERAD_CLIENT_SECRET!,
  environment: 'sandbox',
});

const customer = await sdk.api.customers.get({
  id: 'cus_123',
});
```
