const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const path = require('path');

const appTitle = 'Pizza Challenge';
const filePath = path.join(__dirname, 'src','index.js');
const PORT = '8080';

const config = {
  entry: ['babel-polyfill', filePath],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist', )
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: appTitle,
      template: path.join(__dirname, 'src', 'index.html')
    }),
    new ExtractTextPlugin('style.css')
  ],
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: "./images/[hash].[ext]"
            }
          }
        ]
      }
    ]
  },
  devServer: {
    compress: true,
    open: true,
    port: PORT
  }
}

module.exports = config;