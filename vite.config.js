import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/mysrn.github.io/test-fe-agile-technica',
  build: {
    outDir: 'dist', 
  },
})
