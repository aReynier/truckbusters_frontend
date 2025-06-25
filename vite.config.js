import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    include: [
      'src/**/*.test.{js,jsx,ts,tsx}',
      'src/**/*.integration.test.{js,jsx,ts,tsx}',
    ],
    exclude: [
      '**/node_modules/**',
      '**/tests/**',
      'playwright.config.*',
      '**/*.e2e.spec.{js,jsx,ts,tsx}',
      '**/tests/e2e/**'              
    ]
  },
})
