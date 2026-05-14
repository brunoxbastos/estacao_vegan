import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/estacao_vegan/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
})