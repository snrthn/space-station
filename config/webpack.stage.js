'use strict'
process.env.TAG = 'stage';

let path = require('path');
let webpack = require('webpack');
let { merge } = require('webpack-merge');
let webpackBaseConfig = require('./webpack.base');
let config = require('./')[process.env.TAG];

let stageConfig = merge(webpackBaseConfig, {
    // 模式
    mode: 'development',
    // 输出
    output: {
        path: path.resolve(__dirname, '../' + config.assetsRoot),
        filename: config.assetsSubDirectory + '/js/[name][contenthash:16].js'
    },
    // 性能
    performance: {
        hints: false
    },
    // 插件
    plugins: [
        // 注入全局静态变量
        new webpack.DefinePlugin({
            'process.env': require('./env/stage.env')
        })
    ]
});

if (config.productionSourceMap) {
    // 资源定位
    stageConfig.devtool = config.devtool;
}

module.exports = stageConfig;