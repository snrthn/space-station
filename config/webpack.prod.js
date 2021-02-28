
let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
let { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = function () {
    return {
        mode: 'production',
        entry: path.resolve(__dirname, '../src/index'),
        output: {
            path: path.resolve(__dirname, '../dist'),
            filename: 'static/js/[name][contenthash:16].js'
        },
        devServer: {
            contentBase: path.resolve(__dirname, '../dist'),
            host: 'localhost',
            port: '8888',
            inline: true,
            open: true
        },
        devtool: 'source-map',
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
                    use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader', 'postcss-loader']
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
        resolve: {
            extensions: ['.js', '.json'],
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        },
        performance: {
            hints: false
        },
        optimization: {
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
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, '../static'),
                        to: 'static'
                    }
                ]
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '../index.html'),
                filename: 'index.html',
                inject: true
            }),
            new MiniCssExtractPlugin({
                filename: 'static/css/[contenthash:16].css'
            }),
            // 已被弃用 功能是分割代码 被 optimization.splitChunks 代替
            // new webpack.optimize.AggressiveSplittingPlugin({
            //     minSize: 100,
            //     maxSize: 5000,
            //     chunkOverhead: 0,
            //     entryChunkMultiplicator: 1
            // }),
            // new OptimizeCssAssetsWebpackPlugin(),
            new OptimizeCssAssetsWebpackPlugin({
                assetNameRegExp: /\.optimize\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }],
                },
                canPrint: true
            }),
            new CleanWebpackPlugin()
        ]
    }
};