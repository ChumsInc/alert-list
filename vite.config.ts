import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts';
import {resolve} from 'node:path'
import {cwd} from "node:process";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react({}),
        dts({
            // rollupTypes: true,
            // entryRoot: resolve(cwd(), 'src/index.tsx'),
            include: ['src'],
        })
    ],
    build: {
        lib: {
            entry: resolve(cwd(), 'src/index.tsx'),
            name: 'AlertList',
            // fileName: (format) => `index.${format}.js`,
            formats: ['es', 'cjs'],
        },
        emptyOutDir: true,
        copyPublicDir: false,
        rollupOptions: {
            external: ['react', 'react/jsx-runtime', 'react-dom', 'classnames', '@reduxjs/toolkit', 'numeral', 'react-bootstrap'],
            output: {
                globals:{
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react/jsx-runtime': 'jsxRuntime',
                    classnames: 'classNames',
                    '@reduxjs/toolkit': 'ReduxToolkit',
                    'numeral': 'numeral',
                    'react-bootstrap': 'ReactBootstrap',
                }
            }
        }
    }
})
