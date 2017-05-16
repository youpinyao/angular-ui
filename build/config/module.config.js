const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const fs = require('fs');
const config = require('./config.js');

const themePath = path.resolve(__dirname, config.theme);
const themeContent = fs.readFileSync(themePath, {
  encoding: 'utf-8',
});


module.exports = function (isDev) {
  return {
    rules: [{
      test: /\.html$/,
      exclude: /(node_modules)/,
      use: [{
        loader: 'html-loader',
        options: {
          interpolate: true,
          ignoreCustomFragments: [/\{\{.*?}}/],
          attrs: ['img:src', 'link:href', 'audio:src', 'video:src', 'script:src', 'div:data-src'],
          minimize: false
        }
      }]
    }, {
      test: /\.(css|scss)$/,
      exclude: /(node_modules)/,
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
      exclude: isDev ? /(node_modules)/ : /(6666666666)/,
      use: [{
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: [
            ['es2015', 'stage-0']
          ],
          plugins: [
            'syntax-dynamic-import', ['transform-es2015-classes', {
              loose: true
            }],
            'transform-es2015-object-super',
            'transform-es3-property-literals',
            'transform-es3-member-expression-literals'
          ]
        }
      }]
    }, {
      test: /\.js$/,
      enforce: 'pre',
      loader: 'eslint-loader',
      exclude: /(node_modules|tools)/
    }, {
      test: /\.(jpg|png|gif|woff|woff2|eot|ttf|svg|ico|mp3|mp4)$/,
      exclude: /(node_modules)/,
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
