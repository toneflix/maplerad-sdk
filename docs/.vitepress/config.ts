import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/mapplerad-sdk/' : '/',
  title: 'Mapplerad SDK',
  description: 'TypeScript and Node.js SDK for working with the Mapplerad API.',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/overview' },
      { text: 'Examples', link: '/guide/examples' },
      { text: 'Reference', link: '/reference/types-and-utilities' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Configuration', link: '/guide/configuration' },
          { text: 'Usage Patterns', link: '/guide/usage-patterns' },
          { text: 'Examples', link: '/guide/examples' },
        ],
      },
      {
        text: 'API',
        items: [
          { text: 'Overview', link: '/api/overview' },
          { text: 'Customers and Identity', link: '/api/customers-and-identity' },
          { text: 'Wallets and Transfers', link: '/api/wallets-and-transfers' },
          { text: 'Virtual Accounts and Collections', link: '/api/virtual-accounts-and-collections' },
          { text: 'Bills and Utilities', link: '/api/bills-and-utilities' },
          { text: 'FX, Crypto, and USD', link: '/api/fx-crypto-and-usd' },
          { text: 'Issuing and Cards', link: '/api/issuing-and-cards' },
        ],
      },
      {
        text: 'Reference',
        items: [
          { text: 'Types and Utilities', link: '/reference/types-and-utilities' },
        ],
      },
    ],
    outline: {
      level: [2, 3],
      label: 'On this page',
    },
    search: {
      provider: 'local',
    },
  },
})
