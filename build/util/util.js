const entrys = require('../config.js').entrys;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const del = require('delete');
const path = require('path');
const fs = require('fs');
const md5 = require('md5');
const config = require('../config/config.js');

module.exports = {
  compareDll(filePath, output) {
    let version = {
      hash: '',
    };
    const options = {
      encoding: 'utf-8',
    };
    const venderPath = path.join(output, 'version.json');

    if (fs.existsSync(venderPath)) {
      version = JSON.parse(fs.readFileSync(venderPath, options));
    } else {
      this.delDll();
      fs.mkdirSync('.dll');
    }
    const file = fs.readFileSync(filePath, options);
    const fileHash = md5(file);

    if (version.hash === fileHash) {
      return false;
    }
    version.hash = fileHash;
    fs.writeFileSync(venderPath, JSON.stringify(version), options);
    return true;
  },
  delDll() {
    del.sync(['.dll'], {
      force: true
    });
    console.log('\r\ndelete .dll complete\r\n');
  },
  delDist() {
    del.sync(['dist'], {
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
          `webpack-dev-server/client?http://${config.host}:${config.port}/`,
          'webpack/hot/dev-server',
        ]);
      }
    });

    return entry;
  }
};
