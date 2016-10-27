var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var lessLoader = require('less-loader');

var autoprefix = '{browsers:["Android 2.3", "Android >= 4", "Chrome >= 20", "Firefox >= 24", "Explorer >= 8", "iOS >= 6", "Opera >= 12", "Safari >= 6"]}';
var lessLoaders = ['css-loader', 'autoprefixer-loader?' + autoprefix, 'less-loader'];

module.exports = {
    entry: [
      path.resolve(__dirname, 'src') + '/app/app.js',
      path.resolve(__dirname, 'src') + '/app/less/app.less'
    ],
    output: {
        path: path.resolve(__dirname, 'dist') + '/app',
        filename: 'bundle.js',
        publicPath: '/app/'
    },
    module: {
        loaders: [
            {
              test: /\.js$/,
              include: path.resolve(__dirname, 'src'),
              loader: 'babel-loader',
              query: {
                  presets: ['react', 'es2015']
              }
            },
            {
              test: /\.(png|woff|woff2|eot|ttf|svg)($|\?)/,
              loader: "url-loader?limit=100000"
            },
            {
              test: /\.jpg$/,
              loader: "file-loader"
            },
            {
              test: /\.less$/,
              loader: ExtractTextPlugin.extract('style-loader', lessLoaders.join('!'))
            }
        ]
    },
    plugins: [
      new ExtractTextPlugin("app.css")
    ]
};
