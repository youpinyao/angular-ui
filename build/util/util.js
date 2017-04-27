const entrys = require('../config.js').entrys;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const del = require('delete');
const path = require('path');
const config = require('../config/config.js');

module.exports = {
  delDll() {
    del.sync(['.dll'], {
      force: true
    });
    console.log('\r\ndelete .dll complete\r\n');
  },
  delDist() {
    del.sync(['dist/example'], {
      force: true
    });
    console.log('\r\ndelete dist complete\r\n');
  },
  getName(p) {
    let name = p.split('/');

    name = name[name.length - 1].split('.')[0];

    return name;
  },
  htmls(isDev) {
    const plugins = [];

    entrys.forEach(v => {

      const htmlName = this.getName(v.html);
      const jsName = this.getName(v.js);
      const chunks = [jsName];

      if (isDev !== true) {
        chunks.push('vendor');
      }

      plugins.push(new HtmlWebpackPlugin({
        title: htmlName,
        minify: false,
        filename: `./${htmlName}.html`,
        template: v.html,
        chunks,
        inject: 'body', // true | 'head' | 'body' | false
      }));

    });

    return plugins;
  },
  entrys(isDev) {
    const entry = {};

    entrys.forEach(v => {

      const jsName = this.getName(v.js);

      entry[jsName] = [v.js];

      if (isDev) {
        entry[jsName] = entry[jsName].concat([
          'webpack/hot/dev-server',
          `webpack-dev-server/client?http://${config.host}:${config.port}/`,

        ]);
      }

    });

    return entry;

  }
};
