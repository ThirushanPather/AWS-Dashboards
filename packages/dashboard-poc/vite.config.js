import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// DASHBOARD env var selects which entry to build (collections | credit | risk).
// Without it, the default index.html / dev server is used.
const dashboard = process.env.DASHBOARD

export default defineConfig({
  root: dashboard ? resolve(__dirname, dashboard) : __dirname,
  publicDir: resolve(__dirname, 'public'),
  plugins: [react(), tailwindcss()],
  // base './' makes asset paths relative so the build works from any S3 subfolder.
  base: dashboard ? './' : '/',
  build: {
    outDir: resolve(__dirname, dashboard ? `dist/${dashboard}` : 'dist'),
    emptyOutDir: true,
  },
})
