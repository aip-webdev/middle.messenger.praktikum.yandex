import { resolve } from 'path'
import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'

export default defineConfig({
    plugins: [handlebars()],
    root: 'src/client/',
    build: {
        outDir: resolve(__dirname, 'build'),
        emptyOutDir: true
    }
})
