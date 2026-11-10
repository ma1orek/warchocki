import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  // build SSR (prerender) nie potrzebuje kopii public/ (ponad 200 MB filmów)
  build: { copyPublicDir: !isSsrBuild },
}))
