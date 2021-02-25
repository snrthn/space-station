
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
let { CleanWebpackPlugin } = require('clean-webpack-plugin');
let webpack = require('webpack');

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
            new webpack.optimize.AggressiveSplittingPlugin({
                minSize: 50,
                maxSize: 200,
                chunkOverhead: 0,
                entryChunkMultiplicator: 1
            }),
            new OptimizeCssAssetsWebpackPlugin(),
            new CleanWebpackPlugin()
        ]
    }
};