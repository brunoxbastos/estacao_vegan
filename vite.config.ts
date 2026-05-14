import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/estacao_vegan/',
  build: {
    rollupOptions: {
      input: {
        main:     resolve(__dirname, 'index.html'),
        produtos: resolve(__dirname, 'produtos.html'),
        cesta:    resolve(__dirname, 'cesta.html'),
        login:    resolve(__dirname, 'login.html'),
      },
    },
  },
})