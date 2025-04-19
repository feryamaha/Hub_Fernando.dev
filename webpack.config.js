const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
require('dotenv').config();

module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: process.env.NODE_ENV === 'production' ? '/Hub_Fernando.dev/' : '/',
        assetModuleFilename: 'assets/[hash][ext][query]'
    },
    devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',

    resolve: {
        extensions: ['.jsx', '.js'],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            favicon: './public/favicon.svg'
        }),
        new Dotenv({
            path: './.env',
            safe: false,
            systemvars: true,
            silent: false,
            defaults: false,
            expand: true
        }),
        new webpack.DefinePlugin({
            'process.env.REACT_APP_GOOGLE_API_KEY': JSON.stringify(process.env.REACT_APP_GOOGLE_API_KEY),
            'process.env.REACT_APP_GOOGLE_SEARCH_ENGINE_ID': JSON.stringify(process.env.REACT_APP_GOOGLE_SEARCH_ENGINE_ID),
            'process.env.REACT_APP_YOUTUBE_API_KEY': JSON.stringify(process.env.REACT_APP_YOUTUBE_API_KEY),
            'process.env.REACT_APP_API_URL': JSON.stringify(process.env.REACT_APP_API_URL)
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'public/icons',
                    to: 'icons',
                    globOptions: {
                        ignore: ['**/index.html']
                    }
                },
                {
                    from: 'public/data',
                    to: 'data',
                    globOptions: {
                        ignore: ['**/index.html']
                    }
                },
                {
                    from: 'src/assets',
                    to: 'assets',
                    globOptions: {
                        ignore: ['**/index.html']
                    }
                }
            ]
        }),
        ...(process.env.NODE_ENV === 'production' ? [new CleanWebpackPlugin()] : []),
    ],

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|webp)$/,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource'
            }
        ]
    },

    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 3000,
        hot: true,
        historyApiFallback: true,
    }
};