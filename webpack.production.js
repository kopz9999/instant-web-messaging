var path = require('path');
var webpack = require('webpack');

var devFlagPlugin = new webpack.DefinePlugin({
  'process.env.NODE_ENV': '"production"',
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

module.exports = {
  entry: [
    './js/index.js'
  ],
  output: {
    library: 'webMessenger',
    libraryTarget: 'umd',
    path: path.join(__dirname, 'dist'),
    publicPath: '/static/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    devFlagPlugin,
  ],
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' },
      { test: /\.png$/, loader: 'url-loader?limit=20000&mimetype=image/png' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json'],
  }
};
