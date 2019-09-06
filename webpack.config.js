/* eslint-disable */
const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    watch: true,
    devtool:'source-map',
    entry: './src/index.js',
    output: {
        filename: 'longdomap.markercluster-src.js',
        path: path.join(__dirname, 'dist')
    },
    module:{
        rules:[{
            test: /\.js$/,
            exclude: /(node_modules|dist)/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env', {modules: false}]]
                    }
                }
            ]
        },
        {
            enforce: 'pre',
            test: /\.js$/,
            exclude: /(node_modules|dist)/,
            loader: 'eslint-loader'
        }]
    }
}
