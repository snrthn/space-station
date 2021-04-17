'use strict'

let path = require('path');
let webpack = require('webpack');
let config = require('./')[process.env.TAG];
let CopyWebpackPlugin = require('copy-webpack-plugin');
let { handleEnvConst } = require('./utils/handleTools');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, '../src/index'),
    // 输出
    output: {
        path: path.resolve(__dirname, '../' + config.assetsRoot),
        filename: config.assetsSubDirectory + '/js/[name][contenthash:16].js',
        environment: {
            // 是否在编译后的代码中使用箭头函数
            arrowFunction: false,
            // 是否在编译后的代码中使用支持 BigInt
            bigIntLiteral: false,
            // 是否在编译后的代码中使用 let 或 const 关键字
            const: false,
            // 是否在编译后的代码中使用角构赋值操作
            destructuring: false,
            // 是否在编译后的代码中使用 async import() 异步导入模块
            dynamicImport: false,
            // 是否在编译后的代码中使用 for ... of ... 语法 
            forOf: false,
            // 是否在编译后的代码中使用 import ... from ... 语法 
            module: false
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/i,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                'babel-preset-stage-0',
                                ['env', {
                                    modules: false,
                                    targets: {
                                        browsers: ["> 1%", "last 2 versions", "not ie <= 8"]
                                    }
                                }]
                            ]
                        }
                    }
                ].concat(config.useEslint ? { loader: 'eslint-loader' } : []),
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, {
                    loader: path.resolve(__dirname, 'utils/handleUrl'),
                    options: {
                        publicPath: config.assetsPublicPath,
                        dirPath: '../../'
                    }
                }, 'css-loader', 'postcss-loader'],
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {
                test: /\.(jpg|png|gif)$/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        publicPath: config.assetsPublicPath + config.assetsSubDirectory + '/images',
                        outputPath: config.assetsSubDirectory + '/images',
                        name: '[contenthash:16].[ext]',
                        esModule: false,
                        limit: 1000
                    }
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        publicPath: config.assetsPublicPath +  config.assetsSubDirectory + '/medias',
                        outputPath: config.assetsSubDirectory + '/medias',
                        name: '[contenthash:16].[ext]',
                        esModule: false,
                        limit: 1000
                    }
                }
            },
            {
                test: /\.(ttf|eot|fon|woff|woff2|otf|pfm|svg)/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        publicPath: config.assetsPublicPath +  config.assetsSubDirectory + '/fonts',
                        outputPath: config.assetsSubDirectory + '/fonts',
                        name: '[contenthash:16].[ext]',
                        esModule: false,
                        limit: 1000
                    }
                }
            }
        ]
    },
    // 解决方案
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@': path.resolve(__dirname, '../src')
        }
    },
    // 性能
    performance: {
        hints: false
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
        // 注入静态环境变量
        new webpack.DefinePlugin({
            'process.env': handleEnvConst(require('./env/' + process.env.TAG  + '.env'))
        }),
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
            publicPath: config.assetsPublicPath,
            assetsDir: config.assetsPublicPath + config.assetsSubDirectory,
            filename: 'index.html',
            inject: 'body'
        })
    ]
};