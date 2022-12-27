// vite.config.js
import { defineConfig } from 'vite'
import { loadParser } from './src/js/load-markdown-it'
import dns from 'dns'
dns.setDefaultResultOrder('verbatim')

const markdownIt = loadParser();

// console.log(plainText);

function test(s) {
  return s.toLowerCase;
}

export default defineConfig({
  target: 'es2022',
  // root: 'app',
  plugins: [
  ],
  server: {
    port : 3000,
  },
  // assetsInclude: ["**/*.md"]
})

