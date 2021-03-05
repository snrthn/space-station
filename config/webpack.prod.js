'use strict'
process.env.TAG = 'prod';

let path = require('path');
let webpack = require('webpack');
let { merge } = require('webpack-merge');
let webpackBaseConfig = require('./webpack.base');
let CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
let TerserJSPlugin = require('terser-webpack-plugin');
let config = require('./')[process.env.TAG];

let prodConfig = merge(webpackBaseConfig, {
    // 模式
    mode: 'production',
    // 输出
    output: {
        path: path.resolve(__dirname, '../' + config.assetsRoot),
        filename: config.assetsSubDirectory + '/js/[name][contenthash:16].js'
    },
    // 性能
    performance: {
        hints: false
    },
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
        // 压缩分离出的 css 文件
        new CssMinimizerPlugin()
    ]
});

if (config.productionSourceMap) {
    // 资源定位
    prodConfig.devtool = config.devtool;
}

module.exports = prodConfig;