import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import {resolve} from 'node:path'
import {cwd} from 'node:process'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), dts({include: ['src']})],
    resolve: {},
    build: {
        lib: {
            entry: resolve(cwd(), './src/index.ts'),
            name: 'AlertList',
            fileName: (format) => `index.${format}.js`
        },
        rollupOptions: {
            external: ['react', 'react/jsx-runtime', 'react-dom', 'classnames', '@emotion/styled'],
            output: {
                globals:{
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react/jsx-runtime': 'jsxRuntime',
                    classnames: 'classNames',
                    '@emotion/styled': 'styled'
                }
            }
        }
    }
})
