// @ts-nocheck
const pkg = require('../package.json')
const eslint = require('@rollup/plugin-eslint')
const json = require('@rollup/plugin-json')
const path = require('path')
const { babel } = require('@rollup/plugin-babel')
const commonjs = require('@rollup/plugin-commonjs')
const resolve = require('@rollup/plugin-node-resolve')
const nodeResolve = resolve.nodeResolve
// const typescript = require('rollup-plugin-typescript2')
const postcss = require('postcss')
const postCssRollUpPlugin = require('rollup-plugin-postcss')
const svgr = require('@svgr/rollup')
const copy = require('rollup-plugin-copy')
const htmlTemplate = require('rollup-plugin-generate-html-template')
const peerDepsExternal = require('rollup-plugin-peer-deps-external')

const sass = require('rollup-plugin-sass')
const alias = require('@rollup/plugin-alias')
const scssVariable = require('rollup-plugin-sass-variables')
const { parseObject2Array } = require('./utils.js')
const postCssPlugins = require('../postcss.config').plugins

const entry = './src/index.jsx'

const aliasList = {
    '@components': path.resolve(__dirname, '../src/components'),
    '@src': path.resolve(__dirname, '../src'),
    '@assets': path.resolve(__dirname, "../src/assets"),
    "@dist": path.resolve(__dirname, "../dist"),
    "@ui": path.resolve(__dirname, "../src/ui/dist")
}

const stylesPath = path.resolve(__dirname, '../src/ui/dist/assets/styles')
// // const distPath = path.resolve(__dirname, '../dist')

const globalInsertStyles = `
@import "${aliasList["@ui"]}/assets/styles/global.scss";
@import "${aliasList["@ui"]}/assets/styles/globalVariables.scss";

`

const sassConfig = {
    output: true,
    options:{
        data: globalInsertStyles
    },
    processor: (css) => {
        return postcss(postCssPlugins)
        .process(css, { from: undefined })
        .then(res => res.css)
    }
}

const babelConfig = {
    babelHelpers: 'bundled',
    extensions: ['.js', '.jsx'],
    exclude: [
        'node_modules/**'
    ],
    configFile: path.resolve(__dirname, '../../.babelrc'),
    presets: ['@babel/preset-env', '@babel/preset-react', "@babel/preset-typescript"]
}

const basePlugins = [
    peerDepsExternal({
        includeDependencies: false
    }),
    alias({
        entries: parseObject2Array(aliasList, 'find', 'replacement')
    }),
    json(),
    scssVariable(),
    nodeResolve({
        preferBuiltins: true,
        dedupe: [ path.resolve(__dirname, '../src/assets/*') ]
    }),
    svgr(),
    eslint(),
    // postCssRollUpPlugin(),
    sass(sassConfig),
    commonjs(),
    babel(babelConfig),
    htmlTemplate({
        template: 'public/index.html',
        target: 'dist/index.html',
	}),
    copy({
        targets: [
            { src: 'src/ui/dist/index.esm.css', dest: 'dist/', rename: 'ui.esm.css' }
        ]
    }),
]

const baseOutput = [
    {
        file: pkg.main,
        format: 'esm',
    }, //前端使用时需要cjs转译
]

const baseConfig = {
    input: entry,
    output: [], // 输出
    plugins: [],
    externals: [],
    globals: {},
    watch: {
        include: [ 
            path.resolve(__dirname, '../src/**/*')
        ]
    },
    onwarn: function (warning) {
        if (warning.code === 'THIS_IS_UNDEFINED') {
			return;
		}
		console.error(warning.message);
	},
}

module.exports = {
    basePlugins,
    baseOutput,
    baseConfig,
}