import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [],
    build: {
        cssCodeSplit: false,
    },
    server: {
        host: '0.0.0.0',
        port: 4000,
    },
})
