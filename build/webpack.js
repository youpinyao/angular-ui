const type = process.argv[2];
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const chalk = require('chalk');
const util = require('./util/util.js');
// const MemoryFS = require('memory-fs');

// const fs = new MemoryFS();

const clearConsole = require('./util/clearConsole.js');

const configs = {
  build: require('./config/build.config.js'),
  dev: require('./config/dev.config.js'),
  dll: require('./config/dll.config.js'),
  lib: require('./config/lib.config.js'),
};
let webpackConfig = configs[type];

switch (type) {
case 'lib':

  util.delDist();
  buildLib();

  break;
case 'dll':

  util.delDll();
  webpack(webpackConfig()).run((err, stats) => {
    if (runCallback(err, stats)) {
      console.log(chalk.green('\r\nbuild dll complete \r\n'));
    }
  });

  break;
case 'build':

  util.delDist();
  webpack(webpackConfig()).run((err, stats) => {
    if (runCallback(err, stats)) {
      require('./util/build.after.js')();
      console.log(chalk.green('\r\nbuild dist complete \r\n'));

      buildLib();
    }
  });

  break;
case 'dev':
  {
    // const dllHasChange = util.compareDll(configs.dll().entry.vendor[0], configs.dll().output.path);

    // if (dllHasChange) {

    util.delDll();

    const dllCompiler = webpack(configs.dll());

    dllCompiler.run((err, stats) => {
      if (runCallback(err, stats)) {
        console.log(chalk.green('\r\nbuild dll complete \r\n'));
        runDev();
      }
    });
    // } else {
    //   runDev();
    // }
  }
  break;
default:
}

function buildLib() {
  const webpackConfig = configs.lib;

  console.log(chalk.green('\r\nbuild lib ing \r\n'));

  webpack(webpackConfig().all_uncompressed).run((err, stats) => {
    if (runCallback(err, stats)) {
      console.log(chalk.green('\r\nbuild lib all_uncompressed complete \r\n'));
    }
  });
  webpack(webpackConfig().all_compressed).run((err, stats) => {
    if (runCallback(err, stats)) {
      console.log(chalk.green('\r\nbuild lib all_compressed complete \r\n'));
    }
  });
  webpack(webpackConfig().uncompressed).run((err, stats) => {
    if (runCallback(err, stats)) {
      console.log(chalk.green('\r\nbuild lib uncompressed complete \r\n'));
    }
  });
  webpack(webpackConfig().compressed).run((err, stats) => {
    if (runCallback(err, stats)) {
      console.log(chalk.green('\r\nbuild lib compressed complete \r\n'));
    }
  });
}

function runDev() {
  webpackConfig = webpackConfig();
  const compiler = webpack(webpackConfig);
  let cDate = +new Date();

  // compiler.outputFileSystem = fs;

  compiler.run(runCallback);

  compiler.plugin('invalid', function () {
    clearConsole();
    cDate = +new Date();
    console.log(chalk.green('Compiling'));
  });

  // "done" event fires when Webpack has finished recompiling the bundle.
  // Whether or not you have warnings or errors, you will get this event.
  compiler.plugin('done', function (stats) {
    clearConsole();
    const ncDate = +new Date();
    console.log(chalk.green(`Compiled ${ncDate - cDate}ms`));
  });

  const devServer = new WebpackDevServer(compiler, webpackConfig.devServer);

  devServer.listen(webpackConfig.devServer.port, webpackConfig.devServer.host, function (serr) {
    if (serr) {
      console.log(serr);
      return;
    }
    clearConsole();
    console.log(chalk.cyan('\r\n\r\nStarting the development server...\r\n'));
  });
}


function runCallback(err, stats) {
  if (err) {
    console.error(chalk.red(err.stack || err));
    if (err.details) {
      console.error(chalk.red(err.details));
    }
    return false;
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    console.error(chalk.red(info.errors));
  }

  if (stats.hasWarnings()) {
    console.warn(chalk.yellow(info.warnings));
  }

  return true;
}
