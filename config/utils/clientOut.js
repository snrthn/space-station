/**
 * @files 处理开发环境终端命令输出信息
 * @author yanghuning 2021.11.6
 */


let os = require('os');
let chalk = require('chalk');
let FriendlyErrorsPlugin = require('@soda/friendly-errors-webpack-plugin');

/**
 * 处理友好信息输出
 * @param {Object} obj 
 */
module.exports = function (devConfig) {

    // 查找一下局域网IP地址
    let curNetIp4 = '';
    let curNetIp6 = '';
    let netIpList = os.networkInterfaces().WLAN;
    let port = devConfig.devServer.port;
    
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
    
    return devConfig;
}