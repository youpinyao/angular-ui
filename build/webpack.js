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
};
let webpackConfig = configs[type];

switch (type) {
case 'dll':

  util.delDll();
  webpack(webpackConfig()).run(runCallback);
  console.log(chalk.green('\r\nbuild dll complete \r\n'));

  break;
case 'build':

  util.delDist();
  webpack(webpackConfig()).run((err, stats) => {
    if (runCallback(err, stats)) {
      require('./util/build.after.js')();
      console.log(chalk.green('\r\nbuild dist complete \r\n'));
    }
  });

  break;
case 'dev':
  {
    const dllCompiler = webpack(configs.dll());

    util.delDll();

    dllCompiler.run((err, stats) => {
      if (runCallback(err, stats)) {

        console.log(chalk.green('\r\nbuild dll complete \r\n'));

        webpackConfig = webpackConfig();
        const compiler = webpack(webpackConfig);

        // compiler.outputFileSystem = fs;

        compiler.run(runCallback);

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
    });
  }
  break;
default:
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
