let path = require('path');
let { merge } = require('webpack-merge');
let webpackBaseConfig = require('./webpack.base');
let { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(webpackBaseConfig, {
    // 模式
    mode: 'development',
    // 输出
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'static/js/[name][contenthash:16].js'
    },
    // 资源定位
    devtool: 'cheap-module-source-map',
    // 性能
    performance: {
        hints: false
    },
    plugins: [
        // 清理 dist 目录
        new CleanWebpackPlugin(),
    ]
});