---
outline: deep
---

# Bills and Utilities

This section covers biller discovery plus purchase flows for airtime, data, cable, electricity, and utility payments.

## billers and billBillers

Use these namespaces to discover billers before you initiate a purchase.

- `sdk.api.billers.get(params)` calls `GET /v1/bills/airtime/billers/{country}` and returns available airtime billers for a country.
- `sdk.api.billBillers.get(params)` calls `GET /v1/bills/{type}/billers/{country}` and returns billers by bill type and country.

## bundleBills, addonCables, and subscriptions

Use these namespaces to inspect the products available for a biller before charging a customer.

- `sdk.api.bundleBills.get(params)` calls `GET /v1/bills/{bill_type}/bundle/{biller}`.
- `sdk.api.addonCables.get(params)` calls `GET /v1/bills/cable/addon/{biller}/{addon_id}`.
- `sdk.api.subscriptions.get(params)` calls `GET /v1/bills/cable/subscriptions/{biller_identifier}`.

These methods are useful when you are building bill-purchase forms that need live plans and bundles.

## airtimeBills

Use `sdk.api.airtimeBills` for airtime purchase and history.

- `create(body)` calls `POST /v1/bills/airtime`.
- `list()` calls `GET /v1/bills/airtime`.

## dataBills

Use `sdk.api.dataBills.create(body)` to buy data bundles.

- Method: `create(body)`
- Endpoint: `POST /v1/bills/data`

## cableBills

Use `sdk.api.cableBills.create(body)` to purchase cable TV subscriptions.

- Method: `create(body)`
- Endpoint: `POST /v1/bills/cable`

## electricityBills and resolveAccounts

These two namespaces usually work together in electricity flows.

- `sdk.api.resolveAccounts.create(body)` calls `POST /v1/bills/electricity/resolve-account` and resolves a meter account.
- `sdk.api.electricityBills.create(body)` calls `POST /v1/bills/electricity` and purchases electricity.

Resolve the account first when you need to confirm the target before charging.

## utilityBills

Use `sdk.api.utilityBills.create(body)` to pay energy or utility bills for Kenyan customers.

- Method: `create(body)`
- Endpoint: `POST /v1/bills/utility`

## Example Purchase Flow

```ts
const billers = await sdk.api.billBillers.get({
  type: 'airtime',
  country: 'NG',
});

const purchase = await sdk.api.airtimeBills.create({
  amount: 1000,
} as AirtimeInput);
```

Use the lookup namespaces first when the customer needs to choose a provider, bundle, or subscription plan.
