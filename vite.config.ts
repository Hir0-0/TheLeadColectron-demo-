import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import path from 'path'

export default defineConfig({
  // O ponto antes da barra é obrigatório para ficheiros locais
  base: './', 
  plugins: [
    react(),
    tailwindcss(),
    // Força o Vite a colocar todo o CSS e JS dentro do HTML
    viteSingleFile({ removeViteModuleLoader: true }), 
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // Desativa a separação de código para garantir que tudo fica num ficheiro
    cssCodeSplit: false,
    assetsInlineLimit: 100000000,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  }
})
