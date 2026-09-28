import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  // O caminho exato do seu repositório no GitHub Pages
  base: '/TheLeadColectron-demo-/', 
  plugins: [
    react(),
    tailwindcss(), // <- Este é o plugin que vai fazer o visual voltar a funcionar
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
})
