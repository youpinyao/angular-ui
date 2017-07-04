var express = require('express');
var compression = require('compression');
var cookieParser = require('cookie-parser');
//获取配置文件
var config = require('./config/prod.env.js');

var app = express();
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//启动gzip压缩
app.use(compression());

//操作cookie的插件
app.use(cookieParser());
app.use(express.static('dist/example'));

global.config = config;

//自动将body请求数据格式转成json
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());

//HTTP Response Header
app.use(function (req, res, next) {
  res.setHeader('Cache-Control', 'private, no-store, no-cache, must-revalidate, max-age=0');
  res.setHeader('Content-Type', 'text/html; charset=UTF-8');
  res.setHeader('transfer-encoding', 'chunked');
  next();
});

var port = process.env.PORT ? process.env.PORT : config.port;
//监听端口
app.listen(port);
