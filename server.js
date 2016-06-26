'use strict'
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    router = require('./router'),
    webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    config = require('./webpack.config')

var port = process.env.PORT || 4000;

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded



app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🔥 Running on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})

router.initialize(app);
