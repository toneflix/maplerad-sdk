---
outline: deep
---

# API Overview

The Mapplerad SDK groups endpoints under `sdk.api.*` namespaces. Each namespace maps to a generated API class and exposes the methods that are actually available for that resource, such as `create`, `list`, `get`, or `update`.

## Client Shape

```ts
const sdk = createClient({
  clientSecret: process.env.MAPLERAD_CLIENT_SECRET!,
  environment: 'sandbox',
});

sdk.api.customers;
sdk.api.wallets;
sdk.api.transfers;
sdk.api.issuings;
```

## How the API Section Is Organized

- [Customers and Identity](/api/customers-and-identity) covers onboarding, upgrades, verification, and customer-level records.
- [Wallets and Transfers](/api/wallets-and-transfers) covers balances, transaction history, institutions, and payout flows.
- [Virtual Accounts and Collections](/api/virtual-accounts-and-collections) covers account creation, collection rails, counterparties, and mobile money collection.
- [Bills and Utilities](/api/bills-and-utilities) covers airtime, data, cable, utility, and electricity workflows.
- [FX, Crypto, and USD](/api/fx-crypto-and-usd) covers quotes, exchange, crypto addresses, crypto withdrawals, and USD account flows.
- [Issuing and Cards](/api/issuing-and-cards) covers card creation, lifecycle actions, balance movement, and issuing transactions.

## Common Method Shapes

Generated resources generally follow these patterns:

- `create(body)` for `POST` operations.
- `list(query?)` for collection `GET` operations.
- `get(params)` for path-based `GET` operations.
- `update(params, body)` or `update(body)` for `PATCH` and `PUT` operations.

## Core Exports

The package exports the runtime helpers and API binder used throughout these pages:

- `createClient`
- `Core`
- `ApiBinder`
- `BaseApi`
- `securitySchemes`
- `security`

## Choosing a Starting Point

If you are verifying a new setup, start with a simple customer flow:

```ts
const client = createClient({});

const created = await client.api.customers.create({
  first_name: 'Ada',
  last_name: 'Lovelace',
  email: 'ada@example.com',
  country: 'NG',
});

const customer = await client.api.customers.get({ id: created.id! });
```

After that, move into the product area that matches your integration.
