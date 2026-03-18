import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      react(),
      tailwindcss()
  ],
    server : {
      port: 5174,
        proxy: {
          '/oauth' : {
              target: 'https://myanimelist.net',
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/oauth/, '')
          },
            '/api' : {
              target : "https://api.myanimelist.net",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
})
