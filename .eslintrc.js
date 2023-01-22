// https://cn.eslint.org/docs/user-guide/configuring
module.exports = {
    root: true, //设置root后，将不会再往父目录找eslint配置文件
    env: { //设置env保证一些环境变量不会报错
        browser: true, //引入浏览器环境的全局变量
        node: true //引入Node.js环境的全局变量
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended", //应用推荐开启的规则
        "plugin:@typescript-eslint/eslint-recommended"
    ],
    // 添加规则集合
    plugins:[
        "react",
        "@typescript-eslint",
    ],
    parser: "@typescript-eslint/parser", //将typescript代码解释成eslint可以理解的esTree，否则Typescript语法无法识别和应用规则
    parserOptions: {
        ecmaVersion: '2019',
        sourceType: 'module', //文件是es模块
        ecmaFeatures: {
            impliedStrict: true, //开启严格模式
            jsx: true //开启jsx
        }
    },
    rules: {
        "react/prop-types": [ "off" ],
    },
    // 用于配置在某些文件中的规则检查
    overrides: []
} 