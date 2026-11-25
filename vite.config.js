import { defineConfig } from 'vite'

const pagesBase = process.env.PAGES_BASE

export default defineConfig({
  base: pagesBase ? `${pagesBase.replace(/\/$/, '')}/` : '/',
})
