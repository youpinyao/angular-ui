const path = require('path');
const webpack = require('webpack');
const config = require('./config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const modules = require('./module.config.js');

const moduleName = require('../../src/name.js');

const plugins = [
  // 输出 css
  new ExtractTextPlugin('[name].css'),
];

module.exports = function () {
  return {
    entry: {
      [moduleName]: path.join(__dirname, '../../src/index.js'),
    },
    output: {
      path: path.join(__dirname, '../../lib'),
      filename: '[name].js',
    },
    module: modules(true),
    plugins,
  };
};
