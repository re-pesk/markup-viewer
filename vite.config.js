// vite.config.js
import { defineConfig } from 'vite'
import dns from 'dns'
dns.setDefaultResultOrder('verbatim')

export default defineConfig({
  build: {
    target: 'esnext'
  },
  // root: 'app',
  plugins: [
  ],
  server: {
    port : 3000,
  },
  // assetsInclude: ["**/*.md"]
})

