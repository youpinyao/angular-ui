const HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({
  size: 5
});

module.exports = [
  new HappyPack({
    id: 'js',
    threadPool: happyThreadPool,
    threads: 4,
    loaders: [{
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
  }),
  new HappyPack({
    id: 'html',
    threads: 4,
    threadPool: happyThreadPool,
    loaders: [{
      loader: 'html-loader',
      options: {
        interpolate: true,
        ignoreCustomFragments: [/\{\{.*?}}/],
        attrs: ['img:src', 'link:href', 'audio:src', 'video:src', 'script:src', 'div:data-src', 'img:data-src'],
        minimize: false
      }
    }]
  })
];
