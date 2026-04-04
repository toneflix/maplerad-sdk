---
outline: deep
---

# Configuration

## Overview

The SDK accepts configuration through the `InitOptions` object used by `createClient()` and `new Core()`. The current local generator config in this repository is based on bearer authentication and the Maplerad base URL for both sandbox and live environments.

## Configuration File

You can create an `oapiex.config.js` file at the root of your project to centralize SDK configuration. This file should export a default object that matches the `InitOptions` type.

```js
import { defineConfig } from '@oapiex/sdk-kit';

export default defineConfig({
  clientSecret: process.env.MAPLERAD_CLIENT_SECRET,
  environment: 'sandbox',
  debugLevel: 0,
});
```

## Configuration Fields

### `clientId`

Your API public key. Provide this when the upstream service expects client identification in addition to the auth strategy.

### `clientSecret`

Your API secret key. In the current repo setup, this is also used as the bearer token.

### `encryptionKey`

Your API encryption key. Keep this on the server side only.

### `environment`

Selects the active environment. Common values are `sandbox` and `live`.

```ts
const environment = process.env.NODE_ENV === 'production' ? 'live' : 'sandbox';
```

### `urls`

Overrides the base URL used for each environment.

```ts
urls: {
  sandbox: 'https://api.maplerad.com',
  live: 'https://api.maplerad.com',
}
```

This is useful if you need to point the SDK at a gateway, proxy, mock server, or future environment-specific endpoint.

### `auth`

Controls how requests are authenticated. The current repo configuration uses bearer auth:

```ts
auth: {
  type: 'bearer',
  token: process.env.CLIENT_SECRET,
}
```

The SDK kit also supports other auth strategies such as `basic`, `apiKey`, `oauth2`, and `custom`.

### `headers`

Adds default headers to every request.

```ts
headers: {
  'x-request-id': 'your-request-id',
  'x-client-name': 'your-service-name',
}
```

Use this for tracing, correlation, and integration-level metadata.

### `timeout`

Sets the request timeout in milliseconds.

```ts
timeout: 15_000;
```

### `debugLevel`

Controls request and response debug verbosity. The current project config sets this to `0`, which disables logging.

```ts
debugLevel: 0;
```

Increase this in local development only if you need to inspect HTTP behavior.

## Recommended Server-Side Setup

```ts
import { createClient } from 'mapplerad-sdk';

export const mapplerad = createClient({
  clientSecret: process.env.MAPLERAD_CLIENT_SECRET!,
  environment: process.env.NODE_ENV === 'production' ? 'live' : 'sandbox',
  timeout: 15_000,
  debugLevel: 0,
});
```

## Environment Variables

```bash
MAPLERAD_CLIENT_SECRET=your_client_secret_key
```

Do not ship your secret key to the browser. Keep the SDK behind your backend or trusted server runtime.

## Operational Notes

- Use `sandbox` by default for development and integration testing.
- Keep `debugLevel` low in production to avoid leaking sensitive request data into logs.
- Add request correlation headers in your service layer when calling transfer, wallet, or issuing endpoints.
- Treat `clientSecret` as a secret and load it from your process environment or a secret manager.
