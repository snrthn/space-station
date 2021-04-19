'use strict'
process.env.TAG = 'dev';

let path = require('path');
let portfinder = require('portfinder');
let { merge } = require('webpack-merge');
let webpackBaseConfig = require('./webpack.base');
let FriendlyErrorsPlugin = require('@soda/friendly-errors-webpack-plugin');
let config = require('./')[process.env.TAG];

let HOST = process.env.HOST;
let PORT = process.env.PORT && Number(process.env.PORT);

let devConfig = merge(webpackBaseConfig, {
    // 模式
    mode: 'development',
    // 服务
    devServer: {
        contentBase: path.resolve(__dirname, '../' + config.assetsRoot),
        host: HOST || config.host,
        port: PORT || config.port,
        open: config.autoOpenBrowser,
        proxy: config.proxyTable,
        clientLogLevel: 'none',
        inline: true,
        quiet: true
    },
    // 资源定位
    devtool: config.devtool,
    // 插件
    plugins: []
})


module.exports = new Promise((resolve, reject) => {

    // 判断当前端口号占用情况
    portfinder.basePort = process.env.PORT || config.port;

    portfinder.getPort((err, port) => {
        if (err) {
            reject(err);
        } else {
            // 将新端口设置到全局，以便后期测试用例使用
            process.env.PORT = port;

            // 将新的端口号覆盖到配置中
            devConfig.devServer.port = port;

            // 启动完成友好提示
            devConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`你的服务已经启动，请访问: http://${devConfig.devServer.host}:${port}`],
                }
            }))

            // 返回配置
            resolve(devConfig);
        }
    })
})