// vite.config.js
import { defineConfig } from 'vite'
import { plugin as mdPlugin } from 'vite-plugin-markdown';
import { loadParser } from './js/load-markdown-it'; 
import dns from 'dns'
dns.setDefaultResultOrder('verbatim')

const plainText = (await import('vite-plugin-virtual-plain-text')).default;
const markdownIt = loadParser();

// console.log(plainText);

export default defineConfig({
  plugins: [
    plainText(),
    mdPlugin({
      mode: ['html', 'toc'],
      markdownIt: markdownIt
    }),
  ],
  server: {
    port : 3000,
  },
  // assetsInclude: ["**/*.md"]
})

