const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    'font-awesome-loader',
    'bootstrap-loader',
    './client/app'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    // loaders: [
    //   {
    //     test: /\.js$/,
    //     loaders: [ 'babel' ],
    //     exclude: /node_modules/,
    //     include: __dirname
    //   },
    //   {
    //     test: /\.scss$/,
    //     loaders: ["style", "css", "sass"],
    //     include: __dirname
    //   },
    //   {
    //     test: /\.css?$/,
    //     loaders: [ 'style', 'raw' ],
    //     include: __dirname
    //   },
    //   {
    //     test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    //     loader: "url-loader?limit=10000&mimetype=application/font-woff"
    //   },
    //   {
    //     test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    //     loader: "file-loader"
    //   }
    // ]
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]',
          'postcss',
        ],
      },
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css?modules&importLoaders=2&localIdentName=[name]__[local]__[hash:base64:5]',
          'postcss',
          'sass',
        ],
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url?limit=10000"
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: 'file'
      },
    ],
  },
  postcss: [autoprefixer],
}
