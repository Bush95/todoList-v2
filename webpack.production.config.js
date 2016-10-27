var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var lessLoader = require('less-loader');
var webpackUglifyJsPlugin = require('webpack-uglify-js-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var purify = require("purifycss-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var autoprefix = '{browsers:["Android 2.3", "Android >= 4", "Chrome >= 20", "Firefox >= 24", "Explorer >= 8", "iOS >= 6", "Opera >= 12", "Safari >= 6"]}';
var lessLoaders = ['css-loader', 'autoprefixer-loader?' + autoprefix, 'less-loader'];

module.exports = {
    devtool: 'cheap-module-source-map',
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
      new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }}),
      new ExtractTextPlugin("app.css"),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: true },
        include: /\.min\.js$/
      }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.min\.css$/,
        cssProcessorOptions: { discardComments: { removeAll: true } }
      }),
      new purify({
          basePath: path.resolve(__dirname, 'src'),
          paths: [
              "*.html"
          ],
          purifyOptions: {
            minify: true
          }
      }),
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, 'src')+'/index.html',
          to: path.resolve(__dirname, 'dist')+'/index.html'
        },
        {
          from: path.resolve(__dirname, 'src')+'/app/images',
          to: path.resolve(__dirname, 'dist')+'/app/images'
        }
      ])
    ]
};
