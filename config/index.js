/**
 * @files 主配置文件
 * @author yanghuning
 */

// DO SOMETHING

module.exports = {

    // 开发环境配置
    dev: {

        // 主机IP
        host: '127.0.0.1',

        // 端口
        port: '8888',

        // 自动打开浏览器
        autoOpenBrowser: true,

        // 服务器根目录
        assetsRoot: 'dist',

        // 资源目录
        assetsSubDirectory: 'static',

        // 公共资源
        assetsPublicPath: '../',

        // 代理
        proxyTable: {},

        // 资源定位
        devtool: 'source-map',

        // 开启ESlint
        useEslint: false

    },

    // 测试环境配置
    stage: {

        // 打包根目录
        assetsRoot: 'dist',

        // 资源目录
        assetsSubDirectory: 'static',

        // 公共资源
        assetsPublicPath: '../',

        // 是否开启资源定位
        productionSourceMap: true,

        // 资源定位
        devtool: 'cheap-module-source-map'

    },

    // 生产环境配置
    prod: {

        // 打包根目录
        assetsRoot: 'dist',

        // 资源目录
        assetsSubDirectory: 'static',

        // 公共资源
        assetsPublicPath: '../',

        // 是否开启资源定位
        productionSourceMap: true,

        // 资源定位
        devtool: 'source-map'
        
    }

}