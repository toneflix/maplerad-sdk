---
outline: deep
---

# Types and Utilities

## Generated Schema Types

The package re-exports the generated schema module, which includes request payloads, query types, params, response models, and supporting schema types.

```ts
import type {
  Customer,
  CustomerInput,
  CustomerQuery,
  Transfer,
  TransferCreateInput,
  WalletList,
} from 'mapplerad-sdk'
```

Use these exported types whenever you build payloads or persist API responses in your own code.

## Configuration Types

The SDK re-exports core setup types from `@oapiex/sdk-kit`:

- `InitOptions`
- `AuthConfig`
- `UnifiedResponse`
- `XGenericObject`

## HTTP and Error Utilities

The package also re-exports utilities and exception classes from the SDK kit:

- `Http`
- `Builder`
- `createSdk`
- `WebhookValidator`
- `HttpException`
- `BadRequestException`
- `UnauthorizedRequestException`
- `ForbiddenRequestException`

## Security Metadata

Two generated exports expose the security metadata derived from the source API description:

- `securitySchemes`
- `security`

These are useful when you want to inspect the generated API definition or build thin wrappers around the SDK.

## Example

```ts
import {
  createClient,
  type CustomerInput,
  type InitOptions,
  UnauthorizedRequestException,
} from 'mapplerad-sdk'

const options: InitOptions = {
  environment: 'sandbox',
  auth: {
    type: 'bearer',
    token: process.env.CLIENT_SECRET!,
  },
}

const sdk = createClient(options)

const customer: CustomerInput = {
  first_name: 'Ada',
  last_name: 'Lovelace',
  email: 'ada@example.com',
  country: 'NG',
}

try {
  await sdk.api.customers.create(customer)
} catch (error) {
  if (error instanceof UnauthorizedRequestException) {
    console.error('Authentication failed')
  }
}
```