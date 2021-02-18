
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = function (env) {
    return {
        mode: 'development',
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
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.(jpg|png|gif)$/i,
                    use: {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'static/images',
                            name: '[contenthash:16].[ext]'
                        }
                    }
                },
                {
                    test: /\.(ttf|eot|fon|woff|woff2|otf|pfm)/i,
                    use: {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'static/fonts',
                            name: '[contenthash:16].[ext]'
                        }
                    }
                }
            ]
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
            new CleanWebpackPlugin()
        ]
    }
};