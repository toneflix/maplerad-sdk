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

## virtualAccountCustomers

Use `sdk.api.virtualAccountCustomers.get(params)` to retrieve the virtual accounts created for a customer.

- Method: `get(params)`
- Endpoint: `GET /v1/customers/{customer_id}/virtual-account`
- Context: Good for customer profile views or follow-up account operations.

## dynamicAccountCollections

Use `sdk.api.dynamicAccountCollections.create(body)` to create one-time virtual accounts.

- Method: `create(body)`
- Endpoint: `POST /v1/collections/dynamic-account`
- Context: Generates a temporary account meant for a single payment transaction.

## virtualAccountRails

Use `sdk.api.virtualAccountRails.list(params)` to retrieve the supported rails for a virtual account.

- Method: `list(params)`
- Endpoint: `GET /v1/collections/virtual-account/{account_id}/rails`

## virtualAccountStatus

Use `sdk.api.virtualAccountStatus.get(params)` to check the status of a USD account request.

- Method: `get(params)`
- Endpoint: `GET /v1/collections/virtual-account/status/{reference}`

## counterparties

Use `sdk.api.counterparties` to manage virtual-account counterparties.

- `create(body)` calls `POST /v1/collections/virtual-account/counterparties`.
- `get(params)` calls `GET /v1/collections/virtual-account/counterparties/{counter_party_id}`.
- `list(params)` calls `GET /v1/collections/virtual-account/{id}/counterparties`.

Counterparties represent potential recipients tied to an account.

## momoCollections

Use `sdk.api.momoCollections.create(body)` to receive mobile money payments.

- Method: `create(body)`
- Endpoint: `POST /v1/collections/momo`
- Context: Starts a mobile money collection flow.

If the collection requires OTP, complete it with `sdk.api.verifyOtps.create(body)`.

## kycLinks and usds

These namespaces support USD account onboarding.

- `sdk.api.kycLinks.create(body)` calls `POST /v1/collections/usd/kyc_link` to request a KYC link for a USD account.
- `sdk.api.usds.create(body)` calls `POST /v1/collections/virtual-account/usd` to request a USD virtual account.

Use `kycLinks` when you need the customer to complete account onboarding and `virtualAccountStatus` to poll the resulting request status.
