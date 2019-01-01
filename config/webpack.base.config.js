var webpack = require('webpack')
var fs = require('fs')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var WebpackDevServer = require('webpack-dev-server')
var ManifestPlugin = require('webpack-manifest-plugin')
var config = {
    node: {
        fs: 'empty'
    },
    mode: 'development',
    entry :[
        path.resolve(__dirname,"../src/index.js")
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'../dist/')
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
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            }
            // { 
            //     test: /\.html$/, 
            //     loader: "file-loader?name=[path][hash:8][name].[ext]!extract-loader!html-loader" 
            // }
            // {
            //     test: /\.jsx?$/,
            //     use:[
            //         // {
            //         //     loader: 'babel-loader',
            //         // },
            //         {options:{
            //             loader: 'babel-loader',
            //             query: {
            //                 presets: ['@babel/preset-react', '@babel/preset-es2015']
            //             }
            //         }}
            //     ],
            //     exclude:
            //     [
            //     path.resolve(__dirname, "./node_modules")
            //     ],
            // }
        //   {
        //       test: /\.scss$/,
        //       use: [
        //         MiniCssExtractPlugin.loader,
        //         "css-loader",
        //         {
        //           loader: "sass-loader",
        //           options: {
    
        //           }
        //         }
        //       ]
        //   },
        //   {
        //     test: /\.(gif|jpg|png)\??.*$/,
        //     use: [{
        //       loader:'url-loader',
        //       options:{
        //         limit: 1024,
        //         name: 'resource/[name].[ext]'
        //       }
        //     }]
        //   },
        //   {
        //       test: /\.(woff|svg|eot|ttf)\??.*$/,
        //       use:[
        //         {
        //           loader: 'url-loader',
        //           options:{
        //             limit:1024,
        //             name: "fonts/[name].[ext]"
        //           }
        //         }
        //       ]
        //   }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: "v2-pwa",
            template: path.resolve(__dirname,'../src/index.html')
        }),
        new ManifestPlugin({
            fileName: 'asset-manifest.json',
            publicPath: path.resolve(__dirname,'../dist/'),
            writeToFileEmit: true
            // basePath: path.resolve(__dirname,'../dist/')
        })
    ],
    devServer:{
        port: 7090,
        compress: true,
        contentBase: path.resolve(__dirname,"../dist/")
    }
}

module.exports = config