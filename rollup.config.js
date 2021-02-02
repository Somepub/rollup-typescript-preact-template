import babel from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import html from '@rollup/plugin-html';
import replace from '@rollup/plugin-replace';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const extensions = [
    '.js', '.jsx', '.ts', '.tsx',
];

export default {
    input: 'src/index.tsx',
    output: {
        dir: 'build',
        format: 'cjs'
    },
    plugins: [
        replace({
            'process.env.NODE_ENV': JSON.stringify( 'production' )
        }),
        peerDepsExternal(),
        typescript(),
        nodeResolve({
            browser: true,
            dedupe: ['react', 'react-dom'],
            extensions
        }),
        babel(),
        commonjs(),
        html({
            fileName: 'index.html',
            title: 'Rollup + TypeScript + React = ❤️',
            template: ({ title }) => {
                return `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="utf-8">
                  <title>${title}</title>
                  <link rel="stylesheet" href="index.css">
                </head>
                <body>
                  <div id="app"></div>
                  <script src="index.js"></script>
                </body>
                </html>
                `;
            },
        }),
        serve({
            host: 'localhost',
            port: 3000,
            open: true,
            contentBase: ['build'],
        }),
        livereload({
            watch: 'build',
        })
    ]
};
