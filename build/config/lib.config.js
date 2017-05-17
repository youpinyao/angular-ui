const path = require('path');
const webpack = require('webpack');
const config = require('./config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const modules = require('./module.config.js');

const uglifyPlugins = require('./uglify.config.js');

const moduleName = require('../../src/name.js');
const components = require('../../src/components.json');

const plugins = [];

const entry = {
  [moduleName]: path.join(__dirname, '../../src/index.js'),
};

Object.keys(components).forEach(data => {
  entry[data] = path.join(__dirname, '../../src', components[data], 'index.js');
});

module.exports = function () {
  return {
    uncompressed: {
      entry,
      output: {
        path: path.join(__dirname, '../../lib'),
        filename: '[name].js',
      },
      module: modules(true),
      plugins: plugins.concat([
        new ExtractTextPlugin('[name].css'),
      ]),
    },
    compressed: {
      entry,
      output: {
        path: path.join(__dirname, '../../lib'),
        filename: '[name].min.js',
      },
      module: modules(),
      plugins: plugins.concat([
        new ExtractTextPlugin('[name].min.css'),
        uglifyPlugins,
      ]),
    },
  };
};
