var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/App.js',

  output: {
    path: __dirname,
    filename: 'app.js'
  },

  devtool: '#inline-source-map',
  node: {
    fs: 'empty'
  },
  externals: [
    { './cptable': 'var cptable' },
    {'./jszip': 'jszip'}
  ],
  devServer: {
    inline: true,
    port: 7777,
    historyApiFallback: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
            cacheDirectory: true,
            presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      }
    ]
  }
};
