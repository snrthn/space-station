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
    // 性能
    performance: {
        hints: false
    },
    // 插件
    plugins: []
});

if (config.productionSourceMap) {
    // 资源定位
    stageConfig.devtool = config.devtool;
}

module.exports = stageConfig;