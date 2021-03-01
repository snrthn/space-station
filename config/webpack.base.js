let path = require('path');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
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
                        outputPath: 'static/images',
                        publicPath: '../images',
                        name: '[contenthash:16].[ext]'
                    }
                }
            },
            {
                test: /\.(ttf|eot|fon|woff|woff2|otf|pfm|svg)/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'static/fonts',
                        publicPath: '../fonts',
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
        // 复制 static 目录到 dist 目录
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../static'),
                    to: 'static'
                }
            ]
        }),
        // 将模块中的 css 文件分离并保存到 static/css 目录下
        new MiniCssExtractPlugin({
            filename: 'static/css/[contenthash:16].css',
            chunkFilename: 'static/css/[id].css'
        }),
        // 使用 index.html 作为项目模板
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html'),
            filename: 'index.html',
            inject: true
        })
    ]
};