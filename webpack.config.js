
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = function (env) {
    return {
        mode: env.development ? 'development' : (env.production ? 'production' : ''),
        entry: path.resolve(__dirname, 'src/index'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'static/js/bundle.js'
        },
        devServer: {
            contentBase: path.resolve(__dirname, 'dist'),
            host: 'localhost',
            port: '8888',
            inline: true,
            open: true
        },
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, 'static'),
                        to: 'static'
                    }
                ]
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'index.html'),
                filename: 'index.html',
                inject: true
            }),
            new CleanWebpackPlugin()
        ]
    }
};