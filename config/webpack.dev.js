'use strict'
process.env.TAG = 'dev';

let path = require('path');
let { merge } = require('webpack-merge');
let webpackBaseConfig = require('./webpack.base');
let config = require('./')[process.env.TAG];

module.exports = merge(webpackBaseConfig, {
    // 模式
    mode: 'development',
    // 服务
    devServer: {
        contentBase: config.assetsRoot,
        host: config.host,
        port: config.port,
        open: config.autoOpenBrowser,
        proxy: config.proxyTable,
        inline: true
    },
    // 资源定位
    devtool: config.devtool,
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