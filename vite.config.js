import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    root: 'src/client/',
    build: {
        outDir: resolve(__dirname, 'build'),
        emptyOutDir: true
    }
})