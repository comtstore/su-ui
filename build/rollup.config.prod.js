// @ts-nocheck
const { baseConfig, baseOutput, basePlugins } = require('./rollup.config.base.js')
const terser = require('@rollup/plugin-terser')
const pkg = require('../package.json')

module.exports = [
    {
        ...baseConfig,
        output: [
            ...baseOutput,
            {
                file: pkg['jsnext:main'],
                format: 'esm', //前端专用
            },
            {
                file: pkg.browser,
                format: 'umd', //通用打包方式，候补
                name: 'su'
            }
        ],
        plugins: [
            ...basePlugins,
            terser({
                format: {
                    comments: false
                }
            })
        ]
    }
]