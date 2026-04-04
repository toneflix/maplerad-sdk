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

## cryptos

Use `sdk.api.cryptos` to manage stablecoin deposit addresses.

- `create(body)` calls `POST /v1/crypto`.
- `get(params)` calls `GET /v1/crypto/{address_id}`.
- `update(params, body)` calls `PATCH /v1/crypto/:id`.

This namespace is useful when you need to create a unique address for a customer, inspect an existing address, or update address-related settings.

## cryptoWallets

Use `sdk.api.cryptoWallets.get(params)` to retrieve the crypto wallets associated with a customer.

- Method: `get(params)`
- Endpoint: `GET /v1/crypto/wallets/{customer_id}`

## transferCryptos

Use `sdk.api.transferCryptos.create(body)` to initiate a stablecoin withdrawal.

- Method: `create(body)`
- Endpoint: `POST /v1/crypto/transfer`

## usds

Use `sdk.api.usds.create(body)` to request a USD virtual account for a customer.

- Method: `create(body)`
- Endpoint: `POST /v1/collections/virtual-account/usd`

This request returns a reference that can be checked later with `sdk.api.virtualAccountStatus.get(params)`.

## kycLinks

Use `sdk.api.kycLinks.create(body)` when you need a KYC link as part of USD account onboarding.

- Method: `create(body)`
- Endpoint: `POST /v1/collections/usd/kyc_link`

## usdTransfers

Use `sdk.api.usdTransfers.create(body)` to send USD to a registered counterparty.

- Method: `create(body)`
- Endpoint: `POST /v2/transfers/usd`
- Context: Supports ACH and wire style USD payment flows.