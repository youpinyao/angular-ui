const webpack = require('webpack');

module.exports = new webpack.optimize.UglifyJsPlugin({
  sourceMap: true,
  beautify: false,
  comments: false,
  mangle: {
    screw_ie8: false,
    keep_fnames: false
  },
  compress: {
    screw_ie8: false,
    warnings: false
  },
  output: {
    screw_ie8: false
  }
});
