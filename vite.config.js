import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

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
    // Allow serving atlassian-connect.json at root
    middlewareMode: true,
    setupMiddlewares: (middlewares, devServer) => {
      const fs = require('fs');
      const path = require('path');
      devServer.app.get('/atlassian-connect.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(fs.readFileSync(path.resolve(__dirname, 'atlassian-connect.json')));
      });
      return middlewares;
    },
  },
})
