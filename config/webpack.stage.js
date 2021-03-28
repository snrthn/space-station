'use strict'
process.env.TAG = 'stage';

let path = require('path');
let webpack = require('webpack');
let { merge } = require('webpack-merge');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let { CleanWebpackPlugin } = require('clean-webpack-plugin');
let webpackBaseConfig = require('./webpack.base');
let config = require('./')[process.env.TAG];
let buildPack = require('./build');

let stageConfig = merge(webpackBaseConfig, {
    // 模式
    mode: 'development',
    // 插件
    plugins: [
        // 清理打包根目录
        new CleanWebpackPlugin(),
        // 复制资源目录到目标根目录
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../static'),
                    to: config.assetsSubDirectory
                }
            ]
        })
    ]
});

if (config.productionSourceMap) {
    // 资源定位
    stageConfig.devtool = config.devtool;
}

// 开始打包
buildPack('测试环境', function (spinner, callBack) {
    webpack(stageConfig, function (err, stats) {
        spinner.stop();
        if (err) throw err;
        // 执行结束 开始回调
        if (callBack) callBack(err, stats);
    })
})