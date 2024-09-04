import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: 'public',
  plugins: [vue()],
  assetsInclude: ['**/*.md'],
  build: {
    copyPublicDir: false, // don't copy src/public folder to the output
    minify: false,
    lib: {
      entry: "./src/index.ts",
      name: "vue3-dashboard",
      fileName: "vue3-dashboard",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled into your library
      external: [
        "vue",
        "view-ui-plus",

      ],
      output: {
        // Provide global variables to use in the UMD build for externalized deps
        globals: {
          vue: "Vue",
          "view-ui-plus": "ViewUIPlus",


        },
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
      "assets": "/assets",
      "public": "/public",
      "#components": "/components"
    }
  }
})
