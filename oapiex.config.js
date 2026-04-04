import { defineConfig } from '@oapiex/sdk-kit'
/**
 * See https://toneflix.github.io/oapiex/reference/configuration for docs
 */
export default defineConfig({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  encryptionKey: process.env.ENCRYPTION_KEY,
  environment: 'sandbox',
  urls: {
    live: 'https://api.maplerad.com',
    sandbox: 'https://api.maplerad.com',
  },
  auth: {
    type: 'bearer',
    token: process.env.CLIENT_SECRET,
  },
  debugLevel: 0,
})