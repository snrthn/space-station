'use strict'
process.env.TAG = 'dev';

let os = require('os');
let path = require('path');
let { merge } = require('webpack-merge');
let webpackBaseConfig = require('./webpack.base');
let config = require('./')[process.env.TAG];


let devServer = {
    static: {
        directory: path.resolve(__dirname, '../' + config.assetsRoot)
    },
    client: {
        logging: 'none'
    },
    port: config.port,
    open: config.autoOpenBrowser,
    proxy: config.proxyTable
}

if (config.host) devServer.host = config.host;


let devConfig = merge(webpackBaseConfig, {
    // 模式
    mode: 'development',
    // 服务
    devServer,
    // 资源定位
    devtool: config.devtool,
    // 插件
    plugins: []
})


module.exports = new Promise((resolve, reject) => {

    resolve(devConfig);

})