import { defineConfig } from 'astro/config'
import { unified } from '@astrojs/markdown-remark'
import mdx from '@astrojs/mdx'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

// If the repo is ever renamed, these two lines are the only place to change.
// Repo named `<user>.github.io` -> base: '/'.  Any other name -> base: '/<repo>'.
const SITE = 'https://stacey-bubi.github.io'
const BASE = '/'

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  integrations: [mdx()],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex]
    }),
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' }
    }
  }
})
