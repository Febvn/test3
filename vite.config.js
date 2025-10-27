import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // For Vercel (and most hosting) serve from root. When deploying to
  // GitHub Pages you would set `base` to the repo path instead.
  base: '/',
  plugins: [react()],
})
