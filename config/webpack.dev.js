let path = require('path');
let { merge } = require('webpack-merge');
let webpackBaseConfig = require('./webpack.base');

module.exports = merge(webpackBaseConfig, {
    // 模式
    mode: 'development',
    // 服务
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        host: 'localhost',
        port: '8888',
        inline: true,
        open: true
    },
    // 资源定位
    devtool: 'source-map',
    // 解决方案
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    // 性能
    performance: {
        hints: false
    }
});