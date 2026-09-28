// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // Adicione esta linha:
    base: '/TheLeadColectron-demo-/', // ⚠️ Substitua 'TheLeadColectron' pelo nome exato do seu repositório no GitHub.
})