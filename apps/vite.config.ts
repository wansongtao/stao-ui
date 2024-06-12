import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('../packages/components/src', import.meta.url)),
      '@utils': fileURLToPath(new URL('../packages/utils/src', import.meta.url))
    }
  },
  server: {
    open: true
  }
})
