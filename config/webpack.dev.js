'use strict'
process.env.TAG = 'dev';

let os = require('os');
let path = require('path');
let chalk = require('chalk');
let portfinder = require('portfinder');
let { merge } = require('webpack-merge');
let webpackBaseConfig = require('./webpack.base');
let FriendlyErrorsPlugin = require('@soda/friendly-errors-webpack-plugin');
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

            // 查找一下局域网IP地址
            let curNetIp4 = '';
            let curNetIp6 = '';
            let netIpList = os.networkInterfaces().WLAN;
            
            if (netIpList) {                
                netIpList.map(item => {
                    if (item.family === 'IPv4') {
                        curNetIp4 = item.address;
                    } else if (item.family === 'IPv6') {
                        curNetIp6 = item.address;
                    }
                });
            }

            let TipsList = '';

            if (devConfig.devServer.host === '0.0.0.0') devConfig.devServer.host = undefined;

            if (devConfig.devServer.host) {
                TipsList = `- 本地 ${ chalk.cyan('http://' + devConfig.devServer.host + ':' + chalk.cyanBright(port)) }`;
            } else if (devConfig.devServer.host === undefined) {
                TipsList =  `- 本地IPv4 ${ chalk.cyan('http://localhost:' + chalk.cyanBright(port)) }
- 网络IPv4 ${ curNetIp4 ? chalk.cyan('http://' + curNetIp4 + ':' + chalk.cyanBright(port)) : chalk.gray('unavailable') }
- 网络IPv6 ${ curNetIp6 ? chalk.cyan('http://['+ curNetIp6 + ']:' + chalk.cyanBright(port)) : chalk.gray('unavailable') }`
            }

            // 启动完成友好提示
            devConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`你的服务已经启动，请访问: 

${TipsList}

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