module.exports = {
  src: '../../example',
  host: 'localhost',
  port: '8686',
  publicPath: '../',
  path: '../../dist/example',
  theme: '../../example/scss/_theme.scss',
  entrys: [{
    html: './example/index.html',
    js: './example/js/app.js',
  }]
};
