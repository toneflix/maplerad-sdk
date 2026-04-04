---
outline: deep
---

# API Reference

## Client Shape

Both `createClient()` and `new Core()` return a client with this high-level shape:

```ts
{
  api: {
    customers: ...,
    wallets: ...,
    transfers: ...,
    // more generated namespaces
  }
}
```

Each namespace maps to a generated API class in `src/Apis` and exposes methods for the operations available on that resource.

## Core Exports

- `createClient`
- `Core`
- `ApiBinder`
- `BaseApi`
- `securitySchemes`
- `security`

## Customers and Identity

- `activeCustomers`
- `customers`
- `updateCustomers`
- `enrollCustomers`
- `customerAccounts`
- `customerTransactions`
- `bvnIdentities`
- `kycLinks`
- `tier1s`
- `tier2s`
- `verifies`
- `verifyOtps`

## Wallets, Accounts, and Transfers

- `wallets`
- `historyWallets`
- `transfers`
- `usdTransfers`
- `transferCryptos`
- `transactions`
- `resolveAccounts`
- `resolveInstitutions`
- `counterparties`
- `institutions`
- `fetchInstitutions`
- `currencies`
- `countries`

## Virtual Accounts and Collections

- `virtualAccountCustomers`
- `virtualAccountCollections`
- `virtualAccountRails`
- `virtualAccountStatus`
- `dynamicAccountCollections`
- `momoCollections`

## Bills and Utilities

- `billers`
- `billBillers`
- `utilityBills`
- `airtimeBills`
- `dataBills`
- `cableBills`
- `electricityBills`
- `bundleBills`
- `addonCables`

## FX, USD, and Crypto

- `fxs`
- `quoteFxs`
- `usds`
- `cryptos`
- `cryptoWallets`

## Issuing and Card Operations

- `issuings`
- `businessIssuings`
- `chargeIssuings`
- `fundIssuings`
- `withdrawIssuings`
- `freezeIssuings`
- `unfreezeIssuings`
- `terminateIssuings`
- `issuingTransactions`
- `mockTransactionIssuings`

## Other Namespaces

- `credits`
- `mockTransactions`
- `subscriptions`

## Example Method Shapes

Generated resources typically expose method names such as:

- `create(body)` for `POST` operations.
- `list(query)` for collection `GET` operations.
- `get(params)` for path-based `GET` operations.

Examples from the current SDK surface:

```ts
await sdk.api.customers.create(body);
await sdk.api.customers.list(query);
await sdk.api.customers.get({ id });

await sdk.api.wallets.list();

await sdk.api.transfers.create(body);
await sdk.api.transfers.get({ transfer_id });
```

When you need exact payload and response types for a namespace, import the generated schema type directly from the package.
