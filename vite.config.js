import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // or use your IP address directly: '192.168.8.139'
    port: 5173
  },
  plugins: [react(),  tailwindcss()],
})
