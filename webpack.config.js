const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const HtmlWebPackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        server: './server.js',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/', 
        filename: '[name].js'
    },
    target: 'node',
    node: {
        // Needed when working with express, or build fails!
        __dirname: false,  // if don't put this in, __dirname
        __filename: false, //  and __filename return blank or /
    },
    externals: [nodeExternals()],  // Need to avoid error when working with Express
    module: {
        rules: [
            {
                // Transpiles ES6-8 into ES5 
                test:/\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                // Loads the javascript into html template provided.
                // Entry point is set below in HtmlWebPackPlugin in Plugins
                test:/\.html$/,
                use: [{loader: "html-loader"}]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./index.html",
            filename: "./index.html",
            excludeChunks: [ 'server' ]
        })
    ]
}