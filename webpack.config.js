const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var APP_DIR = path.resolve(__dirname, './dist');
var BUILD_DIR = path.resolve(__dirname, './src');

module.exports = {
  mode: 'development',
  entry: BUILD_DIR + '/controller.js',
  output: {
    path: APP_DIR,
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      cache: false,
      minify: true
    })
  ],
  watch: true,
  module: {
    rules: [
      {test: /\.(s*)css$/, use: [
        {
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader',
          options: {
            includePaths: ["styles/private/style.scss", "styles/public/style.css"]
        }
      }
      ]},
      {test: /\.js$/, loader: 'babel-loader', exclude: /(node_modules)/, query: {cacheDirectory: true, presets: ['env', 'es2015']} },
      {test: /\.(png|jpg|gif|svg)$/, use: [{loader: 'url-loader', options: {limit: 15000, name: 'images/[name].[ext]'}}]},
      {test: /\.html$/, loader: 'raw', exclude: /(node_modules)/}
    ]
  }
};
