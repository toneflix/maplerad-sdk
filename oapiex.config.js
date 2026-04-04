import { defineConfig } from '@oapiex/sdk-kit'
/**
 * See https://toneflix.github.io/oapiex/reference/configuration for docs
 */
export default defineConfig({
  clientSecret: process.env.MAPLERAD_CLIENT_SECRET,
  environment: 'sandbox',
  debugLevel: 0,
})