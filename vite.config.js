import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Use PostCSS to run Tailwind; do not use @tailwindcss/vite plugin here (compatibility issues).
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
