// vite.config.js
import path from 'path'
import { defineConfig } from 'vite'
// import { viteSingleFile } from 'vite-plugin-singlefile'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import svgLoader from 'vite-svg-loader'
import dns from 'dns'
dns.setDefaultResultOrder('verbatim')

export default defineConfig({
  build: {
    target: 'esnext'
  },
  rollupOptions: {
    rollupOptions: {
      input: {
        app: './src/index.js',
      },
    },
    output: {
      file: './dist/bundle.js',
    }
  },
  // root: 'app',
  plugins: [
    // viteSingleFile(),
    svgLoader({
      defaultImport: 'raw',
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'content',
          dest: './',
        },
      ],
    }),
  ],
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  // assetsInclude: ["**/*.md"]
})

