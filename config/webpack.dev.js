'use strict'
process.env.TAG = 'dev';

let path = require('path');
let portfinder = require('portfinder');
let { merge } = require('webpack-merge');
let handleOutMessage = require('./utils/clientOut');
let webpackBaseConfig = require('./webpack.base');
let ESLintPlugin = require('eslint-webpack-plugin');
let config = require('./')[process.env.TAG];

let HOST = process.env.HOST;
let PORT = process.env.PORT && Number(process.env.PORT);

let devServer = {
    static: {
        directory: path.resolve(__dirname, '../' + config.assetsRoot)
    },
    client: {
        logging: 'none'
    },
    hot: false,
    liveReload: true,
    watchFiles: ['static/**/*'],
    port: PORT || config.port,
    open: config.autoOpenBrowser,
    proxy: config.proxyTable
}

if (config.host) devServer.host = HOST || config.host;


let devConfig = merge(webpackBaseConfig, {
    // 模式
    mode: 'development',
    // 服务
    devServer,
    // 资源定位
    devtool: config.devtool,
    // 插件
    plugins: [].concat(config.useEslint ? [
        new ESLintPlugin({
            // fix: true, // 开启后，EsLint可修改原文件
            emitError: true,
            emitWarning: true
        })
    ] : []),
    // 统计
    stats: 'errors-only'
})


module.exports = new Promise((resolve, reject) => {

    // 判断当前端口号占用情况
    portfinder.basePort = devConfig.devServer.port;

    portfinder.getPort((err, port) => {

        if (err) {
            reject(err);
        } else {
            
            // 将新端口设置到全局，以便后期测试用例使用
            process.env.PORT = port;

            // 将新的端口号覆盖到配置中
            devConfig.devServer.port = port;

            // 处理并返回开发服务配置
            resolve(handleOutMessage(devConfig));
        }
    })
})