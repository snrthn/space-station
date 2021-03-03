'use strict'

let path = require('path');
let config = require('./')[process.env.TAG];
let CopyWebpackPlugin = require('copy-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let { CleanWebpackPlugin } = require('clean-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: path.resolve(__dirname, '../src/index'),
    module: {
        rules: [
            {
                test: /\.js$/i,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.(jpg|png|gif)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: config.assetsSubDirectory + '/images',
                        publicPath: config.assetsPublicPath + 'images',
                        name: '[contenthash:16].[ext]'
                    }
                }
            },
            {
                test: /\.(ttf|eot|fon|woff|woff2|otf|pfm|svg)/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: config.assetsSubDirectory + '/fonts',
                        publicPath: config.assetsPublicPath + '/fonts',
                        name: '[contenthash:16].[ext]'
                    }
                }
            }
        ]
    },
    optimization: {
        // 代码分割配置
        splitChunks: {
            chunks: 'all',
            minSize: 100,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: false,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 1,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
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
        }),
        // 将模块中的 css 文件分离并保存到 资源/css 目录下
        new MiniCssExtractPlugin({
            filename: config.assetsSubDirectory + '/css/[contenthash:16].css',
            chunkFilename: config.assetsSubDirectory + '/css/[id].css'
        }),
        // 使用 index.html 作为项目模板
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html'),
            subDir: config.assetsSubDirectory,
            filename: 'index.html',
            inject: true
        })
    ]
};