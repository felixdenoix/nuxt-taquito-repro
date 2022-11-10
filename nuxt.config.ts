// https://v3.nuxtjs.org/api/configuration/nuxt.config
import path from 'path'

export default defineNuxtConfig({

  ssr: false,

  vite: {
    define: {
      Buffer: Buffer,
      global: 'globalThis',
    },
    build: {
      target: "esnext",
      commonjsOptions: {
        transformMixedEsModules: true
      }
    },
    resolve: {
      alias: {
        // dedupe @airgap/beacon-sdk
        // I almost have no idea why it needs `cjs` on dev and `esm` on build, but this is how it works 🤷‍♂️
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
