module.exports = {
  host: '0.0.0.0',
  port: '8686',
  publicPath: '../',
  path: '../../dist/example',
  theme: '../../example/scss/_theme.scss',
  entrys: [{
    html: './example/index.html',
    js: './example/js/app.js',
  }, {
    html: './example/404.html',
    js: './example/js/404.js',
  }]
};
