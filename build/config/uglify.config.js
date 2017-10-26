const webpack = require('webpack');

module.exports = new webpack.optimize.UglifyJsPlugin({
  sourceMap: true,
  beautify: false,
  comments: false,
  mangle: false,
  compress: {
    screw_ie8: false,
    warnings: false,
    drop_debugger: true,
    drop_console: true,
  },
  output: {
    screw_ie8: false,
  }
});
