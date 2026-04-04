---
outline: deep
---

# Issuing and Cards

This section covers card creation, listing, retrieval, funding, withdrawal, freeze and unfreeze actions, termination, decline charge history, and issuing-specific test helpers.

## issuings

Use `sdk.api.issuings` for the main card lifecycle.

- `create(body)` calls `POST /v1/issuing` to create a card.
- `list(query)` calls `GET /v1/issuing` to list cards.
- `get(params)` calls `GET /v1/issuing/{id}` to fetch one card.

Card creation is asynchronous according to the generated JSDoc, so your integration should expect a follow-up status signal, usually through webhooks or later polling.

## businessIssuings

Use `sdk.api.businessIssuings.create(body)` to create a business card.

- Method: `create(body)`
- Endpoint: `POST /v1/issuing/business`

## fundIssuings and withdrawIssuings

Use these namespaces to move funds into or out of a card.

- `sdk.api.fundIssuings.create(params, body)` calls `POST /v1/issuing/{id}/fund`.
- `sdk.api.withdrawIssuings.create(params, body)` calls `POST /v1/issuing/{id}/withdraw`.

Funding debits your Mapplerad balance and credits the card. Withdrawal does the reverse.

## freezeIssuings, unfreezeIssuings, and terminateIssuings

Use these namespaces for lifecycle controls.

- `sdk.api.freezeIssuings.update(params)` calls `PATCH /v1/issuing/{id}/freeze`.
- `sdk.api.unfreezeIssuings.update(params)` calls `PATCH /v1/issuing/{id}/unfreeze`.
- `sdk.api.terminateIssuings.update(params)` calls `PUT /v1/issuing/{id}/terminate`.

These operations are typically used by internal controls, fraud response, or card management dashboards.

## issuingTransactions

Use `sdk.api.issuingTransactions.list(params, query)` to retrieve transactions made on a card.

- Method: `list(params, query)`
- Endpoint: `GET /v1/issuing/{id}/transactions`

## chargeIssuings

Use `sdk.api.chargeIssuings.list(query)` to retrieve a list of declined card charges.

- Method: `list(query)`
- Endpoint: `GET /v1/issuing/charges`

## mockTransactionIssuings

Use `sdk.api.mockTransactionIssuings.create(params, body)` to mock a card transaction in sandbox.

- Method: `create(params, body)`
- Endpoint: `POST /v1/test/issuing/{id}/mock-transaction`
- Context: Test-only helper for issuing flows.

## Example

```ts
const card = await sdk.api.issuings.create({
  customer_id: 'cus_123',
} as IssuingInput);

const history = await sdk.api.issuingTransactions.list(
  { id: card.id! },
  {},
);
```

Use the lifecycle control namespaces together when you need operational safeguards around card usage.