'use strict'
process.env.TAG = 'stage';

let { merge } = require('webpack-merge');
let webpackBaseConfig = require('./webpack.base');
let config = require('./')[process.env.TAG];

let stageConfig = merge(webpackBaseConfig, {
    // 模式
    mode: 'development',
    // 输出
    output: {
        path: config.assetsRoot,
        filename: config.assetsSubDirectory + '/js/[name][contenthash:16].js'
    },
    // 性能
    performance: {
        hints: false
    }
});

if (config.productionSourceMap) {
    // 资源定位
    stageConfig.devtool = config.devtool;
}

module.exports = stageConfig;