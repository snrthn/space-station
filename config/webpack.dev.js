'use strict'
process.env.TAG = 'dev';

let os = require('os');
let path = require('path');
let chalk = require('chalk');
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

            // 查找一下局域网IP地址
            let curNetIp = '';
            let netIpList = os.networkInterfaces().WLAN;
            
            if (netIpList) {                
                netIpList.map(item => {
                    if (item.family === 'IPv4') {
                        curNetIp = item.address;
                    }
                });
            }

            // 启动完成友好提示
            devConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`你的服务已经启动，请访问: 

- 本地 ${ chalk.blueBright('http://' + devConfig.devServer.host + ':' + port) }
- 网络 ${ curNetIp ? chalk.blueBright('http://' + curNetIp + ':' + port) : chalk.gray('unavailable') }

注意：这是开发环境未优化的编译模式
如果想编译测试版本，请运行 ${ chalk.cyanBright('npm run stage') }
如果想编译生产版本，请运行 ${ chalk.cyanBright('npm run build') }
                    `],
                }
            }))

            // 返回配置
            resolve(devConfig);
        }
    })
})