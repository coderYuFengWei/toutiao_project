const merge = require('webpack-merge');
const base = require('./webpack.base');

module.exports = merge(base,{
    mode:'development',
    
    devtool: "source-map",

    devServer: {
        port: 8000, // 默认端口是8080
        // stats:'error-only'     //只打印错误信息
    }

})