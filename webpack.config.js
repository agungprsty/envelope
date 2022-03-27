const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
    mode: 'development', // production
    entry: {
        main: path.resolve(__dirname, 'src/main.js'),
    },
    output: {
        path: path.resolve(__dirname, 'public/'),
        filename: '[name].[chunkhash].js',
        clean: true,
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, 'public/'),
        },
        compress: true,
        host: '0.0.0.0',
        port: 3010,
    }, 
    // Loaders
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false,
                        },
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },  
            {
                test: /\.(svg|ico|png|webp|jpg|gif|jpeg)$/,
                // loader: 'file-loader',
                type: 'asset/resource',
            },
        ]
    },

    // Plugins
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html',
            favicon: path.resolve(__dirname, 'src/image/favicon.ico'),
            clean: true,
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        })
    ]
}