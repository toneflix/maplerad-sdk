---
layout: home

hero:
  name: 'Mapplerad SDK'
  text: NodeJs SDK for Maplerad API
  tagline: 'Type-safe, modern SDK for integrating Mapplerad payments, collections, wallets, cards, and identity services into your Node.js applications.'
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: API Overview
      link: /api/overview

features:
  - icon: 🚀
    title: Broad API Coverage
    details: Customers, wallets, transfers, virtual accounts, bills, FX, crypto, issuing, subscriptions, and supporting lookup endpoints are available through one SDK.
  - icon: 🔒
    title: Type-Safe
    details: Generated request and response types are exported from the package so you can build against the Mapplerad schema with autocomplete and compile-time checks.
  - icon: 🎯
    title: Intuitive API
    details: Use createClient for quick runtime setup or Core when you want an explicit class instance with the same API binder underneath.
  - icon: 📦
    title: Lightweight Setup
    details: The included oapiex configuration can be as minimal as a client secret and environment while still allowing you to grow into advanced options later.
  - icon: 🛡️
    title: Configurable Auth
    details: The SDK kit supports bearer, apiKey, basic, oauth2, and custom authentication strategies through a consistent options object.
  - icon: 📖
    title: Context-Rich Docs
    details: The documentation explains what each API namespace is for, when to use it, and how the generated methods map to the underlying endpoints.
---

## Quick Start

### Installation

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

## Why Use This SDK?

This SDK is designed for teams that want a direct, typed integration with the Mapplerad API:

- TypeScript-first request and response models
- A consistent `sdk.api.*` surface across product areas
- Minimal setup for local development and test environments
- Enough low-level exports for teams that want to build wrappers or shared abstractions
- Generated JSDoc on the API classes that keeps the docs grounded in the source API description

## What You Get

- A `createClient()` helper for quickly bootstrapping the SDK.
- A `Core` class if you prefer explicit instances.
- Generated API namespaces under `sdk.api.*`.
- Schema-derived request and response types exported from `Schema`.

Use the guide to get configured, then move to the API section when you need namespace-level behavior and endpoint context.
