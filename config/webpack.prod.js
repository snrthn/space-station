let path = require('path');
let { merge } = require('webpack-merge');
let webpackBaseConfig = require('./webpack.base');
let CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
let { CleanWebpackPlugin } = require('clean-webpack-plugin');
let TerserJSPlugin = require('terser-webpack-plugin');

module.exports = merge(webpackBaseConfig, {
    // 模式
    mode: 'production',
    // 输出
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'static/js/[name][contenthash:16].js'
    },
    // 资源定位
    devtool: 'source-map',
    // 性能
    performance: {
        hints: false
    },
    // 优化
    optimization: {
        // 处理JS: 生产模式下过滤掉控制台内容
        minimizer: [
            new TerserJSPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true
                    }
                }
            })
        ]
    },
    plugins: [
        // 清理 dist 目录
        new CleanWebpackPlugin(),
        // 压缩分离出的 css 文件
        new CssMinimizerPlugin()
    ]
});