import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'skip-passenger-denied-possible.trycloudflare.com',
      'covers-map-digit-clouds.trycloudflare.com',
      'dom-tent-hull-run.trycloudflare.com'
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})