/*eslint-env node*/

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack';

const CLIENT = __dirname + '/../..';
const ROOT = CLIENT + '/..';

module.exports = {
  entry: {
    app: CLIENT + '/config/design/app',
    style: CLIENT + '/config/design/style'
  },
  output: {
    filename: '[name].js',
    path: CLIENT + '/build/design/assets'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'raw-loader!sass-loader')
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'raw-loader')
      }, {
        test: /\.js$/,
        loader: 'babel'
      }, {
        test: /\.json$/,
        loader: 'json'
      }, {
          test: /\.template\.html/,
          loader: 'react-templates-loader?targetVersion=0.14.0'
        }
    ]
  },
  sassLoader: {
    includePaths: [CLIENT, ROOT + '/node_modules']
  },
  plugins: [
    new ExtractTextPlugin('style.css', {
      allChunks: true
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],
  node: {
    fs: 'empty'
  },
  resolve: {
    alias: {
      api: CLIENT + '/api/' + process.env.NODE_ENV,
      config: CLIENT + '/config/' + process.env.NODE_ENV
    }
  }
}
