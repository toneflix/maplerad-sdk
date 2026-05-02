---
outline: deep
---

# Virtual Accounts and Collections

This section covers static and dynamic virtual accounts, customer-linked collection accounts, mobile money collection, rails, counterparties, and USD collection status flows.

## virtualAccountCollections

Use `sdk.api.virtualAccountCollections` to create and inspect static virtual accounts.

- `create(body)` calls `POST /v1/collections/virtual-account`.
- `get(params)` calls `GET /v1/collections/virtual-account/{id}`.

Static accounts are useful when you want an account that can keep receiving funds and deposit them into the business wallet.

### Example

```ts
const virtualAccount = await sdk.api.virtualAccountCollections.create({
  customer_id: 'cus_123',
  currency: 'NGN',
  preferred_bank: 'wema',
});

const fetchedAccount = await sdk.api.virtualAccountCollections.get({
  id: virtualAccount.id!,
});
```

## virtualAccountCustomers

Use `sdk.api.virtualAccountCustomers.get(params)` to retrieve the virtual accounts created for a customer.

- Method: `get(params)`
- Endpoint: `GET /v1/customers/{customer_id}/virtual-account`
- Context: Good for customer profile views or follow-up account operations.

### Example

```ts
const customerAccounts = await sdk.api.virtualAccountCustomers.get({
  customer_id: 'cus_123',
});
```

## dynamicAccountCollections

Use `sdk.api.dynamicAccountCollections.create(body)` to create one-time virtual accounts.

- Method: `create(body)`
- Endpoint: `POST /v1/collections/dynamic-account`
- Context: Generates a temporary account meant for a single payment transaction.

### Example

```ts
const dynamicAccount = await sdk.api.dynamicAccountCollections.create({
  account_name: 'Ada Lovelace',
  amount: '5000',
  preferred_bank: 'wema',
});
```

## virtualAccountRails

Use `sdk.api.virtualAccountRails.list(params)` to retrieve the supported rails for a virtual account.

- Method: `list(params)`
- Endpoint: `GET /v1/collections/virtual-account/{account_id}/rails`

### Example

```ts
const rails = await sdk.api.virtualAccountRails.list({
  account_id: 'acc_123',
});
```

## virtualAccountStatus

Use `sdk.api.virtualAccountStatus.get(params)` to check the status of a USD account request.

- Method: `get(params)`
- Endpoint: `GET /v1/collections/virtual-account/status/{reference}`

### Example

```ts
const status = await sdk.api.virtualAccountStatus.get({
  reference: 'usd_account_ref_123',
});
```

## counterparties

Use `sdk.api.counterparties` to manage virtual-account counterparties.

- `create(body)` calls `POST /v1/collections/virtual-account/counterparties`.
- `get(params)` calls `GET /v1/collections/virtual-account/counterparties/{counter_party_id}`.
- `list(params)` calls `GET /v1/collections/virtual-account/{id}/counterparties`.

Counterparties represent potential recipients tied to an account.

### Example

```ts
const counterparty = await sdk.api.counterparties.create({
  account_id: 'acc_123',
  is_corporate: false,
  first_name: 'Ada',
  last_name: 'Lovelace',
  email: 'ada@example.com',
  phone_number: '+2348012345678',
  beneficiary_address: {
    street: '1 Example Street',
    city: 'Lagos',
    state: 'Lagos',
    postal_code: '100001',
    country: 'NG',
  },
  account_information: {
    account_name: 'Ada Lovelace',
    account_number: '0123456789',
    institution_name: 'Example Bank',
    payment_rails: ['ach'],
    routing_number: '021000021',
    type: 'checking',
  },
});

const counterparties = await sdk.api.counterparties.list({
  id: 'acc_123',
});

const fetchedCounterparty = await sdk.api.counterparties.get({
  counter_party_id: counterparty.id!,
});
```

## momoCollections

Use `sdk.api.momoCollections.create(body)` to receive mobile money payments.

- Method: `create(body)`
- Endpoint: `POST /v1/collections/momo`
- Context: Starts a mobile money collection flow.

If the collection requires OTP, complete it with `sdk.api.verifyOtps.create(body)`.

### Example

```ts
const momoCollection = await sdk.api.momoCollections.create({
  account_number: '0244123456',
  amount: 5000,
  bank_code: 'MTN',
  currency: 'GHS',
  description: 'Wallet top-up',
  reference: 'momo_001',
});

if (momoCollection.requires_otp) {
  await sdk.api.verifyOtps.create({
    transaction_id: momoCollection.id!,
    otp: '123456',
  });
}
```

## kycLinks and usds

These namespaces support USD account onboarding.

- `sdk.api.kycLinks.create(body)` calls `POST /v1/collections/usd/kyc_link` to request a KYC link for a USD account.
- `sdk.api.usds.create(body)` calls `POST /v1/collections/virtual-account/usd` to request a USD virtual account.

Use `kycLinks` when you need the customer to complete account onboarding and `virtualAccountStatus` to poll the resulting request status.

### Example

```ts
const kycLink = await sdk.api.kycLinks.create({
  customer_id: 'cus_123',
  redirect_url: 'https://example.com/maplerad/kyc/complete',
});

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
```
