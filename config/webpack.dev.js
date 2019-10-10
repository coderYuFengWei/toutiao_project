const merge = require('webpack-merge');
const base = require('./webpack.base');

module.exports = merge(base, {
    mode: 'development',

    devtool: "source-map",

    devServer: {
        // host: '0.0.0.0',
        port: 8000, // 默认端口是8080
        // stats:'error-only'     //只打印错误信息
    }

})