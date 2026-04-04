---
layout: home

hero:
  name: 'Mapplerad SDK'
  text: Unofficial NodeJs SDK for Maplerad's API
  tagline: 'Typed access to the Mapplerad API with Node.js and TypeScript.'
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: API Reference
      link: /reference/api-reference

features:
  - title: Typed SDK surface
    details: Generated request and response types are exported from the package so you can build against the Mapplerad schema with autocomplete and compile-time checks.
  - title: Two client styles
    details: Use createClient for runtime-first usage or Core when you want an explicit class instance with the same API binder underneath.
  - title: Broad API coverage
    details: Customers, wallets, transfers, virtual accounts, bills, FX, crypto, issuing, subscriptions, and supporting lookup endpoints are exposed as grouped namespaces.
---

## Quick Start

::: code-group

```bash [pnpm]
pnpm add mapplerad-sdk
```

```bash [npm]
npm install mapplerad-sdk
```

```bash [yarn]
yarn add mapplerad-sdk
```

:::

```ts
import { createClient } from 'mapplerad-sdk';

const sdk = createClient({
  environment: 'sandbox',
  clientSecret: process.env.MAPLERAD_CLIENT_SECRET!,
});

const wallets = await sdk.api.wallets.list();
```

## What You Get

- A `createClient()` helper for quickly bootstrapping the SDK.
- A `Core` class if you prefer explicit instances.
- Generated API namespaces under `sdk.api.*`.
- Schema-derived request and response types exported from `Schema`.

Use the guide to get configured, then move to the reference section when you need the available namespaces and exported utilities.
