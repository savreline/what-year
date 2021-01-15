const path = require('path');

module.exports = {
  entry: {
    'public/bundle': './src/index.js',
    'public/server': './server.js',
    'tests/bundle': './tests/source.js'
  },
  output: {
    path: path.resolve(__dirname),
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
