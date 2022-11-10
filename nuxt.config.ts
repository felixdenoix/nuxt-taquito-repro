// https://v3.nuxtjs.org/api/configuration/nuxt.config
import path from 'path'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import inject from '@rollup/plugin-inject';

export default defineNuxtConfig({

  ssr: false,

  vite: {
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis',
        },
        plugins: [
          NodeGlobalsPolyfillPlugin({
            buffer: true
          })
        ]
      },
    },
    build: {
      target: "esnext",
      commonjsOptions: {
        transformMixedEsModules: true
      },
      rollupOptions: {
        plugins: [inject({ Buffer: ['buffer', 'Buffer'] })],
      },
    },
    resolve: {
      alias: {
        // dedupe @airgap/beacon-sdk
        "@airgap/beacon-sdk": path.resolve(
          path.resolve(),
          `./node_modules/@airgap/beacon-sdk/dist/esm/index.js`
        ),
        // polyfills
        "readable-stream": "vite-compatible-readable-stream",
        stream: "vite-compatible-readable-stream"
      }
    }
  }

})
