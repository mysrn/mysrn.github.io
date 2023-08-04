import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({command}) => {
  const config = {
    plugins: [react()],
    base: '/test-fe-agile-technica/',
    build: {
      outDir: 'dist', 
    }
  }

  if(command !== 'dev') 
    config.base = '/test-fe-agile-technica/'

  return config
  
})
