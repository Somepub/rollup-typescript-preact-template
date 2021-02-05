import babel from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import serve from 'rollup-plugin-serve';
import analyze from 'rollup-plugin-analyzer'
import html from '@rollup/plugin-html';
import replace from '@rollup/plugin-replace';
import livereload from "rollup-plugin-livereload"
import styles from "rollup-plugin-styles";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';

const extensions = [
    '.js', '.jsx', '.ts', '.tsx',
];
const development = process.env.ROLLUP_WATCH;

export default {
    input: 'src/index.tsx',
    output: {
        dir: 'dist',
        format: 'cjs'
    },
    plugins: [
        typescript(),
        replace({
            'process.env.NODE_ENV': JSON.stringify( 'production' )
        }),
        nodeResolve({
            browser: true,
            extensions
        }),
        babel(),
        commonjs(),
        styles(),
        html({
            fileName: 'index.html',
            title: 'Rollup template',
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
                  <script type="module" src="index.js"></script>
                </body>
                </html>
                `;
            },
        }),
        serve({
            host: 'localhost',
            port: 3000,
            open: true,
            contentBase: ['dist'],
        }),
        livereload({ delay: 500, watch: 'dist' }),
        analyze()
    ]
};
