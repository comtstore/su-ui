// @ts-nocheck
const { baseConfig, baseOutput, basePlugins } = require('./rollup.config.base.js')
const terser = require('@rollup/plugin-terser')

module.exports = [
    {
        ...baseConfig,
        output: [
            ...baseOutput
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