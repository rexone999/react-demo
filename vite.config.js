import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        connect: resolve(__dirname, 'atlassian-connect.json'),
      },
    },
  },
  server: {
    middlewareMode: true,
    setupMiddlewares: (middlewares, devServer) => {
      devServer.app.get('/atlassian-connect.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.end(fs.readFileSync(resolve(__dirname, 'atlassian-connect.json')))
      })
      return middlewares
    },
  },
  preview: {
    host: '0.0.0.0', // Required for Render
    port: process.env.PORT || 4173, // Use dynamic port Render provides
    allowedHosts: ['https://react-demo-1-dhe1.onrender.com'] // ⬅️ Replace with your actual Render subdomain
  }
})
