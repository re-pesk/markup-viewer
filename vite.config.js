// vite.config.js
import { defineConfig } from 'vite'
import { plugin as mdPlugin } from 'vite-plugin-markdown';
import { loadParser } from './js/load-markdown-it'; 
import dns from 'dns'
dns.setDefaultResultOrder('verbatim')

const plainText = (await import('vite-plugin-virtual-plain-text')).default;
const markdownIt = loadParser();

// console.log(plainText);

function test(s) {
  return s.toLowerCase;
}

export default defineConfig({
  target: 'es2022',
  // root: 'app',
  plugins: [
    plainText(),
    mdPlugin({
      mode: ['html', 'toc'],
      markdown: test,
      markdownIt: markdownIt
    }),
  ],
  server: {
    port : 3000,
  },
  // assetsInclude: ["**/*.md"]
})

