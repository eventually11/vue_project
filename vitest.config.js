import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { configDefaults } from 'vitest/config'
import path from 'path'


export default defineConfig({
  testMatch: '**/*.spec.ts',
  plugins: [vue()],
  root: '.',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@unittest': path.resolve(__dirname, './test'),
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [...configDefaults.exclude, 'backup/**/*'],
    },
    exclude: [...configDefaults.exclude, 'backup/**/*'],

  }
})