import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/remember': 'http://localhost:8000',
      '/recall': 'http://localhost:8000',
      '/forget': 'http://localhost:8000',
      '/improve': 'http://localhost:8000',
      '/stats': 'http://localhost:8000',
    }
  }
})