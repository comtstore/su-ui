// @ts-nocheck
const { baseConfig, baseOutput, basePlugins } = require('./rollup.config.base.js')
const serve = require('rollup-plugin-serve')
const livereload = require('rollup-plugin-livereload')
const replace = require('@rollup/plugin-replace')

module.exports =  [
    {
        ...baseConfig,
        output: [
            ...baseOutput
        ],
        plugins: [
            ...basePlugins,
            replace({
                values: {
                    'process.env.NODE_ENV': '"development"'
                },
                preventAssignment: true
            }),
            serve({
                contentBase: 'dist',
                verbose: true,
                port: 8900
            }),
            livereload({
                watch: [ 'dist' ]
            })
        ]
    },
    // dtsConfig
]