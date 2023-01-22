// @ts-nocheck
const { baseConfig, baseOutput, basePlugins } = require('./rollup.config.base.js')
const serve = require('rollup-plugin-serve')
const livereload = require('rollup-plugin-livereload')

module.exports =  [
    {
        ...baseConfig,
        output: [
            ...baseOutput
        ],
        plugins: [
            ...basePlugins,
            serve({
                contentBase: '',
                verbose: true,
                port: 8090
            }),
            livereload({
                watch: 'src'
            })
        ]
    },
    // dtsConfig
]