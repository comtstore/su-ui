// @ts-nocheck
const pkg = require('../package.json')
const eslint = require('@rollup/plugin-eslint')
const json = require('@rollup/plugin-json')
const path = require('path')
const { babel } = require('@rollup/plugin-babel')
const commonjs = require('@rollup/plugin-commonjs')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const typescript = require('rollup-plugin-typescript2')
const copy = require('rollup-plugin-copy')
const postcss = require('postcss')
const svgr = require('@svgr/rollup')

const sass = require('rollup-plugin-sass')
const alias = require('@rollup/plugin-alias')
const scssVariable = require('rollup-plugin-sass-variables')
const peerDepsExternal = require('rollup-plugin-peer-deps-external')
const { parseObject2Array } = require('./utils.js')
const exportJSToSassPlugin = require('./plugins/export-js-to-sass-plugin')
const postCssPlugins = require('../postcss.config').plugins

const GlobalStyles = require('../src/assets/styles')

const entry = './src/index.ts'

const aliasList = {
    '@components': path.resolve(__dirname, '../src/components'),
    '@src': path.resolve(__dirname, '../src'),
    '@common': path.resolve(__dirname, '../src/common'),
    '@managers': path.resolve(__dirname, '../src/managers'),
    'assets': path.resolve(__dirname, "../src/assets")
}

const stylesPath = path.resolve(__dirname, '../src/assets/styles')
const distPath = path.resolve(__dirname, '../dist')

const globalInsertStyles =  [
    `@import "${stylesPath}/global.scss";`,
    ...(Object.keys(GlobalStyles).map((key) => `$${key}: ${GlobalStyles[key]};`))
].join('\n')

const sassConfig = {
    output: true,
    options:{
        data: globalInsertStyles
    },
    processor: (css) => postcss(postCssPlugins)
        .process(css, { from: undefined })
        .then(res => res.css)
}

const babelConfig = {
    babelHelpers: 'bundled',
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    exclude: [
        '**/node_modules/**'
    ]
}

const basePlugins = [
    peerDepsExternal({
        includeDependencies: true
    }), //自动将package.json的peerDependencies作为external
    alias({
        entries: parseObject2Array(aliasList, 'find', 'replacement')
    }),
    json(), //处理json文件到es6 module
    scssVariable(),
    nodeResolve({
        preferBuiltins: true,
        dedupe: [ path.resolve(__dirname, '../src/assets/*') ]
    }), //解析node_modules中导入的模块
    svgr(),
    eslint(),
    typescript(),
    sass(sassConfig),
    commonjs(),
    babel(babelConfig),
    copy({
        targets: [
            { src: 'src/assets/', dest: 'dist/' },
        ]
    }),
    exportJSToSassPlugin({
        targets: [
            `${stylesPath}/box-shadow.js`,
            `${stylesPath}/font-size.js`,
            `${stylesPath}/text-color.js`,
            `${stylesPath}/theme.js`
        ],
        output: `${distPath}/assets/styles/globalVariables.scss`
    })
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
    globals: {}
}

module.exports = {
    basePlugins,
    baseOutput,
    baseConfig,
}