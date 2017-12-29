const path = require('path');
const webpack = require('webpack');
const config = require('./config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const modules = require('./module.config.js');
const pluginHappy = require('./happy.config.js');

const WebpackChunkHash = require('webpack-chunk-hash');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const uglifyPlugins = require('./uglify.config.js');

const moduleName = require('../../src/name.js');
const components = require('../../src/components.json');

let plugins = [

  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.HashedModuleIdsPlugin(),
  new WebpackChunkHash(),
  new ProgressBarPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),

];

const sourceMapPlugin = function (name) {
  return new webpack.SourceMapDevToolPlugin({
    filename: `${name}.map`,
    exclude: ['vendor.js'],
  });
};

const commonChunkPlugin = [
  // 输出公共模块
  new webpack.optimize.CommonsChunkPlugin({
    name: ['vendor'],
    minChunks(module) {
      // this assumes your vendor imports exist in the node_modules directory
      return module.context && (module.context.indexOf('node_modules') !== -1 || module.context.indexOf('add-to-vendor') !== -1);
    }
  }),
];

plugins = plugins.concat(pluginHappy);

const entry = {
  [moduleName]: path.join(__dirname, '../../src/index.js'),
};

const allEntry = {};

Object.keys(components).forEach(data => {
  allEntry[data] = path.join(__dirname, '../../src', components[data], 'index.js');
});

const output = function (p) {
  p = p || '';
  return {
    path: path.join(__dirname, `../../dist${p}`),
    filename: '[name].js',
  };
};

const outputMin = function (p) {
  p = p || '';
  return {
    path: path.join(__dirname, `../../dist${p}`),
    filename: '[name].min.js',
  };
};

module.exports = function () {
  return {
    all_uncompressed: {
      entry,
      output: output(),
      module: modules(true),
      plugins: plugins.concat([
        new ExtractTextPlugin('[name].css'),
        sourceMapPlugin('[name].js'),
      ]),
    },
    all_compressed: {
      entry,
      output: outputMin(),
      module: modules(),
      plugins: plugins.concat([
        new ExtractTextPlugin('[name].min.css'),
        uglifyPlugins,
        sourceMapPlugin('[name].min.js'),
      ]),
    },
    uncompressed: {
      entry: allEntry,
      output: output('/lib'),
      module: modules(true),
      plugins: plugins.concat([
        new ExtractTextPlugin('[name].css'),
        sourceMapPlugin('[name].js'),
      ]).concat(commonChunkPlugin),
    },
    compressed: {
      entry: allEntry,
      output: outputMin('/lib'),
      module: modules(),
      plugins: plugins.concat([
        new ExtractTextPlugin('[name].min.css'),
        uglifyPlugins,
        sourceMapPlugin('[name].min.js'),
      ]).concat(commonChunkPlugin),
    },
  };
};
