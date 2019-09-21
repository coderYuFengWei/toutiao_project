const path = require('path')

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    // entry: './src/index.js',
    entry: {
        main: './src/main.js'

    },
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve('dist')
    },

    optimization: {
        splitChunks: {
            chunks: 'all' // 提取所有文件的共同模块
        }
    },

    resolve: {
        alias: {
            // 1.以后@符号就是src目录
            '@': path.resolve(__dirname, "../src"),
        },
        // 2.省略导入模块时的后缀名。
        extensions: ['.js', '.json', '.vue']
    },

    module: {
        rules: [{
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "vue-style-loader",
                    use: ["css-loader"]
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "vue-style-loader",
                    use: ["css-loader", "less-loader"]
                })
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        publicPath: "./images/",
                        outputPath: "images"
                    }
                }]
            },

            {
                test: /\.vue$/,
                use: ['vue-loader']
            }
        ]

    },
    plugins: [
        new ExtractTextPlugin('style/style.css'),
        new HtmlWebpackPlugin({
            template: 'public/index.html'
        }),
        new CleanWebpackPlugin(),
        new VueLoaderPlugin()
    ]
}