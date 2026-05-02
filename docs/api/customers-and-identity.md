---
outline: deep
---

# Customers and Identity

This section covers customer creation, onboarding, upgrades, identity verification, and customer-level records such as accounts and transactions.

## customers

Use `sdk.api.customers` for the standard customer lifecycle.

### Methods

- `create(body)` creates a Tier 0 customer with `POST /v1/customers`.
- `list(query)` retrieves customers with optional filters using `GET /v1/customers`.
- `get(params)` fetches one customer by ID with `GET /v1/customers/{id}`.

### Example

```ts
const customer = await sdk.api.customers.create({
  first_name: 'Ada',
  last_name: 'Lovelace',
  email: 'ada@example.com',
  country: 'NG',
});

const customers = await sdk.api.customers.list({});
const fetched = await sdk.api.customers.get({ id: customer.id! });
```

## enrollCustomers

Use `sdk.api.enrollCustomers.create(body)` when you want the full customer enrollment flow instead of the lighter Tier 0 customer creation route.

- Method: `create(body)`
- Endpoint: `POST /v1/customers/enroll`
- Context: Creates a customer with access to broader Maplerad resources, including issuing.

### Example

```ts
const enrolledCustomer = await sdk.api.enrollCustomers.create({
  first_name: 'Ada',
  last_name: 'Lovelace',
  email: 'ada@example.com',
  country: 'NG',
  dob: '1990-01-01',
  identification_number: '12345678901',
});
```

## updateCustomers

Use `sdk.api.updateCustomers.update(body)` to update customer information.

- Method: `update(body)`
- Endpoint: `PATCH /v1/customers/update`
- Context: Updates an existing customer record.

### Example

```ts
await sdk.api.updateCustomers.update({
  customer_id: 'cus_123',
  first_name: 'Ada',
  last_name: 'Byron',
});
```

## activeCustomers

Use `sdk.api.activeCustomers.create(params, body)` to whitelist or blacklist a customer.

- Method: `create(params, body)`
- Endpoint: `POST /v1/customers/{customer_id}/active`
- Context: Changes whether a customer is active for allowed downstream actions.

### Example

```ts
await sdk.api.activeCustomers.create(
  { customer_id: 'cus_123' },
  { blacklist: false },
);
```

## tier1s and tier2s

Use these namespaces when a customer needs to be upgraded for more capabilities.

- `sdk.api.tier1s.update(body)` calls `PATCH /v1/customers/upgrade/tier1`.
- `sdk.api.tier2s.update(body)` calls `PATCH /v1/customers/upgrade/tier2`.

Tier upgrades are typically relevant before enabling collections, issuing, or higher-limit product flows.

### Example

```ts
await sdk.api.tier1s.update({
  customer_id: 'cus_123',
  dob: '1990-01-01',
  identification_number: '12345678901',
  phone: {
    phone_country_code: '+234',
    phone_number: '8012345678',
  },
});

await sdk.api.tier2s.update({
  customer_id: 'cus_123',
  identity: {
    country: 'NG',
    type: 'NIN',
    number: '12345678901',
  },
});
```

## bvnIdentities

Use `sdk.api.bvnIdentities.create(body)` to verify a BVN.

- Method: `create(body)`
- Endpoint: `POST /v1/identity/bvn`
- Context: Validates a BVN and returns its details.

### Example

```ts
const bvn = await sdk.api.bvnIdentities.create({
  bvn: '22222222222',
});
```

## customerAccounts

Use `sdk.api.customerAccounts.list(params)` to retrieve accounts created by a customer.

- Method: `list(params)`
- Endpoint: `GET /v1/customers/{id}/accounts`
- Context: Useful when you need the funding or account records associated with a customer profile.

### Example

```ts
const accounts = await sdk.api.customerAccounts.list({
  id: 'cus_123',
});
```

## customerTransactions

Use `sdk.api.customerTransactions.list(params)` to retrieve the transactions made by a customer.

- Method: `list(params)`
- Endpoint: `GET /v1/customers/{id}/transactions`
- Context: Good for customer activity views and reconciliation screens.

### Example

```ts
const transactions = await sdk.api.customerTransactions.list({
  id: 'cus_123',
});
```

## verifies

Use `sdk.api.verifies.get(params)` to verify a collection transaction by transaction ID.

- Method: `get(params)`
- Endpoint: `GET /v1/transactions/verify/{id}`
- Context: Confirms the status of a collection transaction.

### Example

```ts
const collection = await sdk.api.verifies.get({
  id: 'txn_123',
});
```

## verifyOtps

Use `sdk.api.verifyOtps.create(body)` when a mobile money collection requires OTP verification.

- Method: `create(body)`
- Endpoint: `POST /v1/collections/momo/verify-otp`
- Context: Completes an OTP-gated collection flow.

### Example

```ts
const verifiedOtp = await sdk.api.verifyOtps.create({
  transaction_id: 'txn_123',
  otp: '123456',
});
```

## Related Product Areas

- Move to [Virtual Accounts and Collections](/api/virtual-accounts-and-collections) for collection accounts and mobile money.
- Move to [Issuing and Cards](/api/issuing-and-cards) for card issuance after customer onboarding.
