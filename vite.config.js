import { resolve } from 'node:path'
import { defineConfig, transformWithOxc } from 'vite'
import react from '@vitejs/plugin-react'

// Vite parses JSX only in .jsx/.tsx files. This plugin lets plain .js files in
// src/ contain JSX, so the project keeps the classic App.js / main.js naming.
function jsxInJsFiles() {
  return {
    name: 'jsx-in-js-files',
    enforce: 'pre',
    async transform(code, id) {
      if (!/\/src\/.*\.js$/.test(id.split('?')[0])) return null
      return transformWithOxc(code, id, { lang: 'jsx', jsx: { runtime: 'automatic' } })
    },
  }
}

export default defineConfig({
  plugins: [jsxInJsFiles(), react({ include: /\.(js|jsx)$/ })],
  build: {
    rollupOptions: {
      input: {
        // privacy/index.html rather than privacy.html so the built URL is
        // /privacy/ instead of /privacy.html.
        main: resolve(import.meta.dirname, 'index.html'),
        privacy: resolve(import.meta.dirname, 'privacy/index.html'),
      },
    },
  },
})
