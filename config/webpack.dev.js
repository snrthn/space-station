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
        contentBase: path.resolve(__dirname, '../' + config.assetsRoot),
        host: config.host,
        port: config.port,
        open: config.autoOpenBrowser,
        proxy: config.proxyTable,
        inline: true
    },
    // 资源定位
    devtool: config.devtool,
    // 插件
    plugins: []
});