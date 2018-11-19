'use strict'
const path = require('path')

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: ['@babel/polyfill', './profile/app.js'],
  output: {
    path: path.resolve(__dirname, '../public/profile/'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.txt$/,
        loader: 'raw-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      }
    ]
  }
}