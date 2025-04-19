const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
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
    },
    devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',

    resolve: {
        extensions: ['.jsx', '.js'],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
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
            'process.env': {
                REACT_APP_YOUTUBE_API_KEY: JSON.stringify(process.env.REACT_APP_YOUTUBE_API_KEY)
            }
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
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.json$/,
                type: 'json',
            },
        ]
    },

    devServer: {
        port: 3000,
        historyApiFallback: true,
        hot: true,
        open: true,
        static: {
            directory: path.join(__dirname, 'public')
        },
        client: {
            logging: 'info',
            overlay: {
                errors: true,
                warnings: false,
            },
        },
    },
};