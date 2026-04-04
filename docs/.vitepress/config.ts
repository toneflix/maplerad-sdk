import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Mapplerad SDK',
  description: 'TypeScript and Node.js SDK for working with the Mapplerad API.',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Examples', link: '/guide/examples' },
      { text: 'Reference', link: '/reference/api-reference' },
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
        text: 'Reference',
        items: [
          { text: 'API Reference', link: '/reference/api-reference' },
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
