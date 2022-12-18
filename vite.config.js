// vite.config.js
import { defineConfig } from 'vite'
import dns from 'dns'
dns.setDefaultResultOrder('verbatim')

const plainText = (await import('vite-plugin-virtual-plain-text')).default;

console.log(plainText);

export default defineConfig({
  plugins: [
    plainText(),
  ],
  server: {
    port : 3000,
  },
  // assetsInclude: ["**/*.md"]
})

