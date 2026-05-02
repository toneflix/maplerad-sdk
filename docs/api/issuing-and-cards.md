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

### Example

```ts
const card = await sdk.api.issuings.create({
  customer_id: 'cus_123',
  currency: 'USD',
  type: 'virtual',
  brand: 'visa',
  auto_approve: true,
  amount: 1000,
} as IssuingInput);

const cards = await sdk.api.issuings.list({
  customer_id: 'cus_123',
  status: 'active',
  page: '1',
  page_size: '25',
});

const fetchedCard = await sdk.api.issuings.get({
  id: card.id!,
});
```

## businessIssuings

Use `sdk.api.businessIssuings.create(body)` to create a business card.

- Method: `create(body)`
- Endpoint: `POST /v1/issuing/business`

### Example

```ts
const businessCard = await sdk.api.businessIssuings.create({
  name: 'Example Ops',
  currency: 'USD',
  type: 'virtual',
  brand: 'visa',
  auto_approve: true,
  amount: 2500,
});
```

## fundIssuings and withdrawIssuings

Use these namespaces to move funds into or out of a card.

- `sdk.api.fundIssuings.create(params, body)` calls `POST /v1/issuing/{id}/fund`.
- `sdk.api.withdrawIssuings.create(params, body)` calls `POST /v1/issuing/{id}/withdraw`.

Funding debits your Maplerad balance and credits the card. Withdrawal does the reverse.

### Example

```ts
await sdk.api.fundIssuings.create(
  { id: 'card_123' },
  { amount: 5000 },
);

await sdk.api.withdrawIssuings.create(
  { id: 'card_123' },
  { amount: 2000 },
);
```

## freezeIssuings, unfreezeIssuings, and terminateIssuings

Use these namespaces for lifecycle controls.

- `sdk.api.freezeIssuings.update(params)` calls `PATCH /v1/issuing/{id}/freeze`.
- `sdk.api.unfreezeIssuings.update(params)` calls `PATCH /v1/issuing/{id}/unfreeze`.
- `sdk.api.terminateIssuings.update(params)` calls `PUT /v1/issuing/{id}/terminate`.

These operations are typically used by internal controls, fraud response, or card management dashboards.

### Example

```ts
await sdk.api.freezeIssuings.update({
  id: 'card_123',
});

await sdk.api.unfreezeIssuings.update({
  id: 'card_123',
});

await sdk.api.terminateIssuings.update({
  id: 'card_123',
});
```

## issuingTransactions

Use `sdk.api.issuingTransactions.list(params, query)` to retrieve transactions made on a card.

- Method: `list(params, query)`
- Endpoint: `GET /v1/issuing/{id}/transactions`

### Example

```ts
const cardTransactions = await sdk.api.issuingTransactions.list(
  { id: 'card_123' },
  { page: '1', page_size: '25' },
);
```

## chargeIssuings

Use `sdk.api.chargeIssuings.list(query)` to retrieve a list of declined card charges.

- Method: `list(query)`
- Endpoint: `GET /v1/issuing/charges`

### Example

```ts
const declinedCharges = await sdk.api.chargeIssuings.list({
  page: 1,
  page_size: 25,
  channel: 'card',
});
```

## mockTransactionIssuings

Use `sdk.api.mockTransactionIssuings.create(params, body)` to mock a card transaction in sandbox.

- Method: `create(params, body)`
- Endpoint: `POST /v1/test/issuing/{id}/mock-transaction`
- Context: Test-only helper for issuing flows.

### Example

```ts
await sdk.api.mockTransactionIssuings.create(
  { id: 'card_123' },
  {
    amount: 1500,
    type: 'debit',
  },
);
```

## Example

```ts
const card = await sdk.api.issuings.create({
  customer_id: 'cus_123',
  currency: 'USD',
  type: 'virtual',
  auto_approve: true,
} as IssuingInput);

const history = await sdk.api.issuingTransactions.list({ id: card.id! }, {});
```

Use the lifecycle control namespaces together when you need operational safeguards around card usage.
