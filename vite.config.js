import { defineConfig } from 'vite'
import { prismjsPlugin } from 'vite-plugin-prismjs'

export default defineConfig({
    plugins: [
        prismjsPlugin({
            languages: 'all',
            plugins: ['line-numbers'],
            css: true,
        }),
    ],
    build: {
        cssCodeSplit: false,
    },
    server: {
        host: '0.0.0.0',
        port: 4000,
    },
})
