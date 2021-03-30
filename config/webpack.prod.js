'use strict'
process.env.TAG = 'prod';

let path = require('path');
let webpack = require('webpack');
let { merge } = require('webpack-merge');
let webpackBaseConfig = require('./webpack.base');
let { CleanWebpackPlugin } = require('clean-webpack-plugin');
let CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
let TerserJSPlugin = require('terser-webpack-plugin');
let config = require('./')[process.env.TAG];
let buildPack = require('./build');

let prodConfig = merge(webpackBaseConfig, {
    // 模式
    mode: 'production',
    // 优化
    optimization: {
        // 处理JS: 生产模式下过滤掉控制台内容
        minimizer: [
            new TerserJSPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true
                    }
                }
            })
        ]
    },
    // 插件
    plugins: [
        // 清理打包根目录
        new CleanWebpackPlugin(),
        // 压缩分离出的 css 文件
        new CssMinimizerPlugin()
    ]
});

if (config.productionSourceMap) {
    // 资源定位
    prodConfig.devtool = config.devtool;
}

// 开始打包
buildPack('生产环境', function (spinner, callBack) {
    webpack(prodConfig, function (err, stats) {
        spinner.stop();
        if (err) throw err;
        // 执行结束 开始回调
        if (callBack) callBack(err, stats);
    })
})