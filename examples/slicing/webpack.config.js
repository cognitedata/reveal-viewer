const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['@babel/polyfill', './index.js'],
  devServer: {
    compress: true,
    contentBase: [path.join(__dirname, '..', '..', 'public')],
    stats: 'minimal',
    host: 'localhost',
    https: true,
    open: false,
    overlay: {
      warnings: false,
      errors: true,
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],
  mode: 'development',
};
