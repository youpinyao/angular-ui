const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const fs = require('fs');
const config = require('./config.js');

const themePath = path.resolve(__dirname, config.theme);
const themeContent = fs.readFileSync(themePath, {
  encoding: 'utf-8',
});


module.exports = function (isDev) {
  const exclude = isDev ? '/node_modules/' : '/all_modules/';
  let include = [
    path.join(__dirname, '../../node_modules/lightgallery.js'),
    path.join(__dirname, '../../node_modules/angular-datepicker-custom'),
    path.join(__dirname, '../../node_modules/ng-table'),
    path.join(__dirname, '../../src'),
    path.join(__dirname, '../../example'),
  ];

  if (!isDev) {
    include = undefined;
  }

  return {
    rules: [{
      test: /\.html$/,
      exclude,
      include,
      use: ['happypack/loader?id=html']
    }, {
      test: /\.(css|scss)$/,
      exclude,
      include,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            minimize: isDev !== true
          }
        }, {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
            plugins() {
              return [
                require('autoprefixer')({
                  browsers: [
                    '>1%',
                    'last 2 versions',
                    'Firefox ESR',
                    'not ie < 9', // doesn't support IE8 anyway
                  ]
                })
              ];
            }
          }
        }, 'resolve-url-loader', {
          loader: 'sass-loader',
          options: {
            importer(url, prev, done) {
              const preThemePath = path.resolve(__dirname, url);

              if (/theme/g.test(preThemePath) && config.theme) {
                done({
                  file: themePath,
                  contents: themeContent,
                });
              } else {
                done();
              }
            },
          },
        }]
      })
    }, {
      test: /\.js$/,
      exclude,
      include,
      use: ['happypack/loader?id=js']
    }, {
      test: /\.js$/,
      enforce: 'pre',
      loader: 'eslint-loader',
      exclude,
      include,
    }, {
      test: /\.(jpg|png|gif|woff|woff2|eot|ttf|svg|ico|mp3|mp4)$/,
      exclude,
      include,
      use: [{
        loader: 'url-loader',
        options: {
          name: 'assets/[name].[hash].[ext]',
          limit: 10000
        }
      }]
    }]
  };
};
