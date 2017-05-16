const path = require('path');
const webpack = require('webpack');
// const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const modules = require('./module.config.js');
const util = require('../util/util.js');
const config = require('./config.js');

function getPlugins(isDev) {
  const pluginHtmls = util.htmls(isDev);

  let plugins = [
    new webpack.ProvidePlugin({
      _: 'underscore'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new WebpackChunkHash(),
    new ProgressBarPlugin(),
    new webpack.NamedModulesPlugin(),

    // 输出 css
    new ExtractTextPlugin('css/[name].[hash].css'),
  ];

  plugins = plugins.concat(pluginHtmls);

  return plugins;
}

module.exports = function (isDev) {
  return {
    entry: util.entrys(isDev),
    output: {
      filename: 'js/[name].[hash].js',
      publicPath: config.publicPath,
      path: path.resolve(__dirname, config.path),
      sourceMapFilename: '[name].[hash].map'
    },
    resolve: {
      extensions: ['.ts', '.js', '.json'],
      modules: ['node_modules']
    },
    module: modules(isDev),
    plugins: getPlugins(isDev),
  };
};
