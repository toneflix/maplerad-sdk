---
outline: deep
---

# Bills and Utilities

This section covers biller discovery plus purchase flows for airtime, data, cable, electricity, and utility payments.

## billers and billBillers

Use these namespaces to discover billers before you initiate a purchase.

- `sdk.api.billers.get(params)` calls `GET /v1/bills/airtime/billers/{country}` and returns available airtime billers for a country.
- `sdk.api.billBillers.get(params)` calls `GET /v1/bills/{type}/billers/{country}` and returns billers by bill type and country.

### Example

```ts
const airtimeBillers = await sdk.api.billers.get({
  country: 'NG',
});

const dataBillers = await sdk.api.billBillers.get({
  type: 'data',
  country: 'NG',
});
```

## bundleBills, addonCables, and subscriptions

Use these namespaces to inspect the products available for a biller before charging a customer.

- `sdk.api.bundleBills.get(params)` calls `GET /v1/bills/{bill_type}/bundle/{biller}`.
- `sdk.api.addonCables.get(params)` calls `GET /v1/bills/cable/addon/{biller}/{addon_id}`.
- `sdk.api.subscriptions.get(params)` calls `GET /v1/bills/cable/subscriptions/{biller_identifier}`.

These methods are useful when you are building bill-purchase forms that need live plans and bundles.

### Example

```ts
const bundles = await sdk.api.bundleBills.get({
  bill_type: 'data',
  biller: 'mtn',
});

const addons = await sdk.api.addonCables.get({
  biller: 'dstv',
  addon_id: 'addon_123',
});

const subscriptions = await sdk.api.subscriptions.get({
  biller_identifier: 'dstv',
});
```

## airtimeBills

Use `sdk.api.airtimeBills` for airtime purchase and history.

- `create(body)` calls `POST /v1/bills/airtime`.
- `list()` calls `GET /v1/bills/airtime`.

### Example

```ts
const airtime = await sdk.api.airtimeBills.create({
  amount: 1000,
  identifier: 'mtn',
  phone_number: '08012345678',
});

const airtimeHistory = await sdk.api.airtimeBills.list();
```

## dataBills

Use `sdk.api.dataBills.create(body)` to buy data bundles.

- Method: `create(body)`
- Endpoint: `POST /v1/bills/data`

### Example

```ts
const dataBundle = await sdk.api.dataBills.create({
  amount: 1500,
  bundle_identifier: 'bundle_123',
  identifier: 'mtn',
  phone_number: '08012345678',
});
```

## cableBills

Use `sdk.api.cableBills.create(body)` to purchase cable TV subscriptions.

- Method: `create(body)`
- Endpoint: `POST /v1/bills/cable`

### Example

```ts
const cable = await sdk.api.cableBills.create({
  amount: 6000,
  identifier: 'dstv',
  serial_number: '1234567890',
  subscription_id: 'compact',
});
```

## electricityBills and resolveAccounts

These two namespaces usually work together in electricity flows.

- `sdk.api.resolveAccounts.create(body)` calls `POST /v1/bills/electricity/resolve-account` and resolves a meter account.
- `sdk.api.electricityBills.create(body)` calls `POST /v1/bills/electricity` and purchases electricity.

Resolve the account first when you need to confirm the target before charging.

### Example

```ts
const meter = await sdk.api.resolveAccounts.create({
  identifier: 'ikeja-electric',
  meter_number: '12345678901',
});

const electricity = await sdk.api.electricityBills.create({
  amount: 5000,
  identifier: 'ikeja-electric',
  meter_number: '12345678901',
  phone_number: '08012345678',
});
```

## utilityBills

Use `sdk.api.utilityBills.create(body)` to pay energy or utility bills for Kenyan customers.

- Method: `create(body)`
- Endpoint: `POST /v1/bills/utility`

### Example

```ts
const utility = await sdk.api.utilityBills.create({
  account_number: '1234567890',
  amount: 2500,
  identifier: 'kplc',
});
```

## Example Purchase Flow

```ts
const billers = await sdk.api.billBillers.get({
  type: 'airtime',
  country: 'NG',
});

const purchase = await sdk.api.airtimeBills.create({
  amount: 1000,
  identifier: 'mtn',
  phone_number: '08012345678',
} as AirtimeInput);
```

Use the lookup namespaces first when the customer needs to choose a provider, bundle, or subscription plan.
