var webpack = require('webpack')
var fs = require('fs')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
// var ManifestPlugin = require('webpack-manifest-plugin')
var SwRegisterWebpackPlugin = require('sw-register-webpack-plugin')
// var CleanWebpackPlugin = require('clean-webpack-plugin')
var config = {
    node: {
        fs: 'empty'
    },
    mode: 'development',
    devtool: "source-map",
    entry :[
        path.resolve(__dirname,"../src/index.js")
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'../')
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                loader: ['babel-loader'],
                exclude:[
                    path.resolve(__dirname, "./node_modules")
                ]
            },
            {
                test: /\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: "v2-pwa",
            template: path.resolve(__dirname,'../src/index.html')
        }),
        new SwRegisterWebpackPlugin({
            filePath: path.resolve(__dirname,'../sw.js')
        })
    ],
    devServer:{
        port: 7090,
        compress: false,
        hot: false,
        disableHostCheck: true,
        proxy:{
            "/test": {
                target: "http://127.0.0.1:3002/",
                changeOrigin: true,
                secure: false
            },
            "/api": {
                target: "https://www.v2ex.com/",
                changeOrigin: true,
                secure: false
            }
        }
    }
}

module.exports = config