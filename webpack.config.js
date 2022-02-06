const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
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
                test: /\.(scss|css)$/,
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
            clean: true,
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                  from: path.resolve(__dirname, 'src/components/'),
                  to: path.resolve(__dirname, 'public'),
                },
            ],        
        }),
    ]
}