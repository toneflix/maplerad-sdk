---
outline: deep
---

# Configuration

Learn how to configure the Maplerad SDK for local development, sandbox testing, and production usage.

## Overview

The SDK accepts configuration through the `InitOptions` object used by `createClient()` and `new Core()`. A common setup uses bearer authentication and the Maplerad base URL for both sandbox and live environments.

## Configuration File

You can create an `oapiex.config.js` file at the root of your project to centralize SDK configuration. The file should use `defineConfig` from `@oapiex/sdk-kit` and can be as minimal or as explicit as you need.

If you want the full list of runtime configuration behaviors, auth strategies, access validation patterns, or SDK kit exports that power this SDK, see the [`@oapiex/sdk-kit` reference](https://toneflix.github.io/oapiex/reference/sdk-kit).

### Minimal Configuration

```js
import { defineConfig } from '@oapiex/sdk-kit';

export default defineConfig({
  clientSecret: process.env.MAPLERAD_CLIENT_SECRET,
  environment: 'sandbox',
  debugLevel: 0,
});
```

### Expanded Configuration

```js
import { defineConfig } from '@oapiex/sdk-kit';

export default defineConfig({
  clientId: process.env.MAPLERAD_CLIENT_ID,
  clientSecret: process.env.MAPLERAD_CLIENT_SECRET,
  encryptionKey: process.env.MAPLERAD_ENCRYPTION_KEY,
  environment: process.env.NODE_ENV === 'production' ? 'live' : 'sandbox',
  urls: {
    sandbox: 'https://api.maplerad.com',
    live: 'https://api.maplerad.com',
  },
  headers: {
    'x-sdk-name': 'maplerad-sdk',
  },
  auth: {
    type: 'bearer',
    token: process.env.MAPLERAD_CLIENT_SECRET,
  },
  timeout: 15_000,
  debugLevel: 0,
});
```

This expanded example uses the same `defineConfig` entrypoint but shows more of the options exposed by `@oapiex/sdk-kit`.

## Configuration Fields

### `clientId`

- Type: `string`
- Required: No
- Description: Your API public key when your integration needs explicit client identification.

Your API public key. Provide this when the upstream service expects client identification in addition to the auth strategy.

### `clientSecret`

- Type: `string`
- Required: Usually yes for real integrations
- Environment variable: `MAPLERAD_CLIENT_SECRET`
- Description: Your API secret key.

Your API secret key. In many integrations, this is also used as the bearer token.

### `encryptionKey`

- Type: `string`
- Required: Optional
- Description: Your API encryption key for integrations that require it.

Your API encryption key. Keep this on the server side only.

### `environment`

- Type: `'sandbox' | 'live'`
- Default: Depends on your config
- Description: Chooses the target environment.

Selects the active environment. Common values are `sandbox` and `live`.

```ts
const environment = process.env.NODE_ENV === 'production' ? 'live' : 'sandbox';
```

### `urls`

- Type: `{ sandbox?: string; live?: string }`
- Required: No
- Description: Override base URLs used by the SDK.

Overrides the base URL used for each environment.

```ts
urls: {
  sandbox: 'https://api.maplerad.com',
  live: 'https://api.maplerad.com',
}
```

This is useful if you need to point the SDK at a gateway, proxy, mock server, or future environment-specific endpoint.

### `auth`

- Type: `AuthConfig | AuthConfig[]`
- Required: No when your defaults are already wired elsewhere, but recommended for explicitness
- Description: Request authentication strategy.

Controls how requests are authenticated. A common configuration uses bearer auth:

```ts
auth: {
  type: 'bearer',
  token: process.env.MAPLERAD_CLIENT_SECRET,
}
```

The SDK kit also supports other auth strategies such as `basic`, `apiKey`, `oauth2`, and `custom`.

### `headers`

- Type: `Record<string, string>`
- Required: No
- Description: Default headers applied to every request.

Adds default headers to every request.

```ts
headers: {
  'x-request-id': 'your-request-id',
  'x-client-name': 'your-service-name',
}
```

Use this for tracing, correlation, and integration-level metadata.

### `timeout`

- Type: `number`
- Required: No
- Description: Request timeout in milliseconds.

Sets the request timeout in milliseconds.

```ts
timeout: 15_000;
```

### `debugLevel`

- Type: `0 | 1 | 2 | 3`
- Required: No
- Description: HTTP debug verbosity.

Controls request and response debug verbosity. A typical production-friendly configuration sets this to `0`, which disables logging.

```ts
debugLevel: 0;
```

Increase this in local development only if you need to inspect HTTP behavior.

## Recommended Server-Side Setup

```ts
import { createClient } from 'maplerad-sdk';

export const maplerad = createClient({
  clientSecret: process.env.MAPLERAD_CLIENT_SECRET!,
  environment: process.env.NODE_ENV === 'production' ? 'live' : 'sandbox',
  timeout: 15_000,
  debugLevel: 0,
});
```

## Runtime Overrides

You can still override configuration at client construction time even if you keep defaults in `oapiex.config.js`:

```ts
import { createClient } from 'maplerad-sdk';

const sdk = createClient({
  environment: 'sandbox',
  timeout: 20_000,
  headers: {
    'x-request-id': crypto.randomUUID(),
  },
});
```

## Environment Variables

```bash
MAPLERAD_CLIENT_SECRET=your_client_secret_key
MAPLERAD_CLIENT_ID=your_client_id
MAPLERAD_ENCRYPTION_KEY=your_encryption_key
```

Do not ship your secret key to the browser. Keep the SDK behind your backend or trusted server runtime.

## Operational Notes

- Use `sandbox` by default for development and integration testing.
- Keep `debugLevel` low in production to avoid leaking sensitive request data into logs.
- Add request correlation headers in your service layer when calling transfer, wallet, or issuing endpoints.
- Treat `clientSecret` as a secret and load it from your process environment or a secret manager.

## Next Steps

- Review [Usage Patterns](/guide/usage-patterns) for practical initialization styles.
- Explore [API Overview](/api/overview) for product-area coverage.
