
let path = require('path');
let autoprefixer = require('autoprefixer');

module.exports = function () {
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
                    use: ['style-loader', 'css-loader', 'postcss-loader']
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
                    test: /\.(ttf|eot|fon|woff|woff2|otf|pfm|svg)/i,
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
        resolve: {
            extensions: ['.js', '.json'],
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        },
        performance: {
            hints: false
        },
    }
};