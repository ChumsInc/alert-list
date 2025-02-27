import {merge} from 'webpack-merge';
import common from './webpack.common.mjs';
import path from 'node:path';
import process from 'node:process';

const localProxy = {
    target: 'http://localhost:8081',
    ignorePath: false,
    changeOrigin: true,
    secure: false,
};

export default merge(common, {
    entry: './test/index.tsx',
    mode: 'development',
    devServer: {
        allowedHosts: 'auto',
        static: {
            directory: path.join(process.cwd(), 'public'),
            serveIndex: true,
            watch: false,
        },
        hot: true,
        port: 3000,
        proxy: [
            {context: ['/api'], ...localProxy},
        ],
        watchFiles: [
            path.join(process.cwd(), 'src/**/*'),
            path.join(process.cwd(), 'test/**/*')
        ]
    },
    devtool: 'inline-source-map',
    plugins: []
});
