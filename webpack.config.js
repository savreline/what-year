const path = require('path');

module.exports = {
  entry: {
    bundle: './src/index.js',
    server: './server.js'
  },
  output: {
    path: path.resolve('public'),
    filename: '[name].js',
  },
  target: 'node', // in order to ignore built-in modules like path, fs, etc. 
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
