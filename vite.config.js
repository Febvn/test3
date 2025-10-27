import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // When deploying to GitHub Pages under a repository (not a user/org page),
  // set `base` to the repository name path so assets resolve correctly.
  base: '/UTS_PENGWEB_123140034_FebrianValentinoNugroho_RA1/',
  plugins: [react()],
})
