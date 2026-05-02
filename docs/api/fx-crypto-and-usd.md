---
outline: deep
---

# FX, Crypto, and USD

This section covers foreign exchange, USD account onboarding, crypto deposit addresses, crypto wallets, and stablecoin withdrawals.

## quoteFxs and fxs

Use these namespaces for exchange workflows.

- `sdk.api.quoteFxs.create(body)` calls `POST /v1/fx/quote` to generate a foreign exchange quote.
- `sdk.api.fxs.create(body)` calls `POST /v1/fx` to process the actual exchange.
- `sdk.api.fxs.list()` calls `GET /v1/fx` to retrieve FX history.

Generate the quote first when your flow needs rate confirmation before execution.

### Example

```ts
const quote = await sdk.api.quoteFxs.create({
  amount: 10000,
  source_currency: 'NGN',
  target_currency: 'USD',
});

const exchange = await sdk.api.fxs.create({
  quote_reference: quote.reference!,
});

const fxHistory = await sdk.api.fxs.list();
```

## cryptos

Use `sdk.api.cryptos` to manage stablecoin deposit addresses.

- `create(body)` calls `POST /v1/crypto`.
- `get(params)` calls `GET /v1/crypto/{address_id}`.
- `update(params, body)` calls `PATCH /v1/crypto/:id`.

This namespace is useful when you need to create a unique address for a customer, inspect an existing address, or update address-related settings.

### Example

```ts
const address = await sdk.api.cryptos.create({
  customer_id: 'cus_123',
  coin: 'USDT',
  chain: 'TRON',
  offramp: true,
});

const fetchedAddress = await sdk.api.cryptos.get({
  address_id: address.id!,
});

await sdk.api.cryptos.update(
  { id: address.id! },
  { offramp: false },
);
```

## cryptoWallets

Use `sdk.api.cryptoWallets.get(params)` to retrieve the crypto wallets associated with a customer.

- Method: `get(params)`
- Endpoint: `GET /v1/crypto/wallets/{customer_id}`

### Example

```ts
const cryptoWallets = await sdk.api.cryptoWallets.get({
  customer_id: 'cus_123',
});
```

## transferCryptos

Use `sdk.api.transferCryptos.create(body)` to initiate a stablecoin withdrawal.

- Method: `create(body)`
- Endpoint: `POST /v1/crypto/transfer`

### Example

```ts
const cryptoTransfer = await sdk.api.transferCryptos.create({
  address: 'TExampleWalletAddress',
  amount: 100,
  chain: 'TRON',
  coin: 'USDT',
  reason: 'Customer withdrawal',
  reference: 'crypto_withdrawal_001',
});
```

## usds

Use `sdk.api.usds.create(body)` to request a USD virtual account for a customer.

- Method: `create(body)`
- Endpoint: `POST /v1/collections/virtual-account/usd`

This request returns a reference that can be checked later with `sdk.api.virtualAccountStatus.get(params)`.

### Example

```ts
const usdAccountRequest = await sdk.api.usds.create({
  customer_id: 'cus_123',
  meta: {
    employer_name: 'Example Inc.',
    employment_description: 'Software engineer',
    employment_status: 'employed',
    identification_number: 'A12345678',
    nationality: 'NG',
    occupation: 'Engineer',
    us_residency_status: 'non_resident',
  },
});

const usdAccountStatus = await sdk.api.virtualAccountStatus.get({
  reference: usdAccountRequest.reference!,
});
```

## kycLinks

Use `sdk.api.kycLinks.create(body)` when you need a KYC link as part of USD account onboarding.

- Method: `create(body)`
- Endpoint: `POST /v1/collections/usd/kyc_link`

### Example

```ts
const kycLink = await sdk.api.kycLinks.create({
  customer_id: 'cus_123',
  redirect_url: 'https://example.com/maplerad/kyc/complete',
});
```

## usdTransfers

Use `sdk.api.usdTransfers.create(body)` to send USD to a registered counterparty.

- Method: `create(body)`
- Endpoint: `POST /v2/transfers/usd`
- Context: Supports ACH and wire style USD payment flows.

### Example

```ts
const usdTransfer = await sdk.api.usdTransfers.create({
  amount: 2500,
  counterparty_id: 'cp_123',
  memo: 'Invoice 1024',
  payment_rail: 'ach',
  reason: 'Vendor payout',
  reference: 'usd_payout_001',
});
```
