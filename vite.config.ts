// vite.config.ts
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
    plugins: [tailwindcss()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    build: {
        outDir: 'dist/client',
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        const parts = id.split('node_modules/')[1].split('/')
                        const pkg = parts[0].startsWith('@') ? `${parts[0]}/${parts[1]}` : parts[0]
                        return `vendor-${pkg}`
                    }
                },
            },
        },
        ssrManifest: true,
    },
    ssr: {
        noExternal: true,
    },
})
