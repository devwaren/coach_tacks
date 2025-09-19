import { defineConfig } from 'vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { TSFilebasedRouter } from '@devwareng/vanilla-ts';

// Only use router plugin in Node
const isNode = typeof process !== 'undefined' && process.versions?.node;

export default defineConfig({
    plugins: [
        tailwindcss(),
        ...(isNode ? [TSFilebasedRouter()] : []), // ✅ only add in Node
    ],
    resolve: {
        alias: { '@': path.resolve(__dirname, 'src') },
    },
    build: {
        rollupOptions: {
            external: [
                'fs',
                'fs/promises',
                'os',
                'stream',
                'events',
                'node:path',
                'node:fs/promises',
                'node:stream',
                'path'
            ],
        },
    },
});
