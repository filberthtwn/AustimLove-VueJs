import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: '3001'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
    },
  },
  define: {
    'process.env': {}
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/assets/scss/custom.scss";`
      }
    }
  }
})
