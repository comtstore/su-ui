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
const peerDepsExternal = require('rollup-plugin-peer-deps-external')

const sass = require('rollup-plugin-sass')
const alias = require('@rollup/plugin-alias')
const scssVariable = require('rollup-plugin-sass-variables')
const { parseObject2Array } = require('./utils.js')
const exportJSToSassPlugin = require('./plugins/export-js-to-sass-plugin')
const postCssPlugins = require('../postcss.config').plugins

const GlobalStyles = require('../src/assets/styles')

const entry = './src/index.ts'

const aliasList = {
    '@components': path.resolve(__dirname, '../src/components'),
    '@doc/*': path.resolve(__dirname, '../src/doc/*'),
    '@src': path.resolve(__dirname, '../src'),
    '@common': path.resolve(__dirname, '../src/common'),
    '@managers': path.resolve(__dirname, '../src/managers'),
    '@assets': path.resolve(__dirname, "../src/assets"),
    "@dist": path.resolve(__dirname, "../dist")
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
        'node_modules/**'
    ],
    plugins: [
       ['@babel/plugin-proposal-decorators', { "version": "legacy" }]
    ],
    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescrip']
}

const basePlugins = [
    peerDepsExternal({
        includeDependencies: true
    }), //自动将package.json的peerDependencies作为external
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
    eslint({
        exclude: [/virtual:/, /node_modules/]
    }),
    typescript({
        check: false,
        exclude: [ 'node_modules/**', /.scss$/ ],
        include: 'src/**'
    }),
    process.env.NODE_ENV === 'sb' ? () => {} : sass(sassConfig), // storybook下不需要sass插件
    commonjs(),
    babel(babelConfig),
    copy({
        targets: [
            { src: 'src/assets/', dest: 'dist/' }
        ]
    }),
    copy({
        targets: [
            { src: 'dist/', dest: 'example/src/ui/' }
        ],
        hook: 'writeBundle'
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
    globalInsertStyles
}