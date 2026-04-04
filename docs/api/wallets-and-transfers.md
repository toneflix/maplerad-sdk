---
outline: deep
---

# Wallets and Transfers

This section covers business wallet inspection, transaction history, institutions, account resolution, and transfer flows.

## wallets

Use `sdk.api.wallets.list()` to retrieve your business wallets.

- Method: `list()`
- Endpoint: `GET /v1/wallets`
- Context: Returns details about your business account wallets.

## historyWallets

Use `sdk.api.historyWallets` when you need wallet transaction history.

- `list(query)` calls `GET /v1/wallets/history`.
- `get(params, query)` calls `GET /v1/wallets/{currency_code}/history`.

These methods are useful for reconciliation, reporting, and currency-specific transaction views.

## transactions

Use `sdk.api.transactions` for general transaction history.

- `list()` calls `GET /v1/transactions`.
- `get(params)` calls `GET /v1/transactions/{id}`.

This namespace is the broad transaction history surface, while `historyWallets` is wallet-specific.

## transfers

Use `sdk.api.transfers` for local African payment flows.

### Methods

- `create(body)` sends a transfer with `POST /v1/transfers`.
- `get(params)` verifies a transfer by ID or reference with `GET /v1/transfers/{transfer_id}`.

### Example

```ts
const transfer = await sdk.api.transfers.create({
  amount: 5000,
} as TransferCreateInput);

const verified = await sdk.api.transfers.get({
  transfer_id: transfer.id!,
});
```

The transfer endpoint is intended for bank transfer, mobile money transfer, and Mapplerad Pay flows funded from your balance.

## usdTransfers

Use `sdk.api.usdTransfers.create(body)` for USD payments.

- Method: `create(body)`
- Endpoint: `POST /v2/transfers/usd`
- Context: Sends USD to a registered counterparty over ACH or wire rails.

## institutions

Use `sdk.api.institutions.list(query)` to list institutions by country and rail type.

- Method: `list(query)`
- Endpoint: `GET /v1/institutions`
- Context: Helps you discover supported institutions before account resolution or payout setup.

## fetchInstitutions

Use `sdk.api.fetchInstitutions.create(body)` to fetch additional details from a routing number.

- Method: `create(body)`
- Endpoint: `POST /v1/institutions/fetch`

## resolveInstitutions

Use `sdk.api.resolveInstitutions.create(body)` to resolve and confirm an institution account.

- Method: `create(body)`
- Endpoint: `POST /v1/institutions/resolve`
- Context: Useful before initiating transfers. Sandbox returns a dummy response, while live returns actual values.

## countries and currencies

These namespaces expose supported countries and currencies.

- `sdk.api.countries.list()` calls `GET /v1/countries`.
- `sdk.api.currencies.list()` calls `GET /v1/currencies`.

They are useful for building country pickers, routing filters, and configuration UIs.

## credits

Use `sdk.api.credits.create(body)` in sandbox when you need to credit a test wallet.

- Method: `create(body)`
- Endpoint: `POST /v1/test/wallet/credit`
- Context: Test-only helper for sandbox funding.

## mockTransactions

Use `sdk.api.mockTransactions.create(body)` to mock collection transactions in test environments.

- Method: `create(body)`
- Endpoint: `POST /v1/test/collection/mock-transaction`

## Related Product Areas

- Move to [Virtual Accounts and Collections](/api/virtual-accounts-and-collections) for inbound collection flows.
- Move to [FX, Crypto, and USD](/api/fx-crypto-and-usd) for exchange and crypto-specific money movement.
