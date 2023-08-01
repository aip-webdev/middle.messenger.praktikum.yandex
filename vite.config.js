import { resolve } from 'path'
import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'
import checker from 'vite-plugin-checker'


export default defineConfig({
    plugins: [
        checker({
            typescript: true,
            eslint: {
                lintCommand: 'eslint ../"',
                dev: {
                    logLevel: ['error']
                }
            },
            stylelint: {
                lintCommand: 'stylelint "../**/*.scss',
                dev: {
                    logLevel: ['error']
                }
            }
        }),
        handlebars()
    ],
    root: 'src/client/',
    build: {
        outDir: resolve(__dirname, 'build'),
        emptyOutDir: true
    }
})
