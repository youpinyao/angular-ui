const path = require('path');
const fs = require('fs');
const webpack = require('webpack');


// const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const modules = require('./module.config.js');
const util = require('../util/util.js');
const config = require('./config.js');
const pluginHappy = require('./happy.config.js');

function getPlugins(isDev) {
  const pluginHtmls = util.htmls(isDev);

  let plugins = [
    new webpack.ProvidePlugin({
      _: 'underscore'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new WebpackChunkHash(),
    new ProgressBarPlugin(),
    new webpack.NamedModulesPlugin(),

    // 输出 css
    new ExtractTextPlugin('css/[name].[chunkhash].css'),
  ];

  plugins = plugins.concat(pluginHtmls);
  plugins = plugins.concat(pluginHappy);

  return plugins;
}

module.exports = function (isDev) {
  const hash = isDev ? 'hash' : 'chunkhash';

  return {
    cache: true,
    entry: util.entrys(isDev),
    output: {
      filename: `js/[name].[${hash}].js`,
      publicPath: config.publicPath,
      path: path.resolve(__dirname, config.path),
      sourceMapFilename: `[name].[${hash}].map`
    },
    resolve: {
      extensions: ['.ts', '.js', '.json'],
      modules: ['node_modules']
    },
    module: modules(isDev),
    plugins: getPlugins(isDev),
  };
};
