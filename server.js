var path = require('path');
var express = require('express');
var app = express();
var isDevelopment = (process.env.NODE_ENV !== 'production');
// Dev variables
var webpack = null;
var config = null;
var compiler = null;

app.use('/demo', express.static('demo'));
if (isDevelopment) {
  config = require('./webpack.config');
  webpack = require('webpack');
  compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    historyApiFallback: true,
    watchOptions: {
      poll: true
    }
  }));

  app.use(require('webpack-hot-middleware')(compiler));

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  app.listen(3000, function (err, result) {
    if (err) {
      console.log(err);
    }

    console.log('Listening at localhost:3000');
  });
} else {

  app.use('/static', express.static('dist'));

  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  app.listen(process.env.PORT || 8080, function (err) {
    if (err) { console.log(err) };
    console.log('Listening at localhost:8080');
  });
}
