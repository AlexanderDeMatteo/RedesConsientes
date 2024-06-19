const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development', // Set mode to 'production' for minified builds
  entry: './src/front/js/index.js', // Your existing entry point
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader', // Creates style nodes from JS strings
          'css-loader', // Translates CSS into CommonJS
          'postcss-loader', // Applies Tailwind CSS and other PostCSS plugins
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg|webp)$/,
        use: {
          loader: 'file-loader',
          options: { name: '[name].[ext]' },
        },
      },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: '4geeks.ico',
      template: 'template.html',
    }),
    new Dotenv({ safe: true, systemvars: true }),
  ],
  devServer: {
    hot: true, // Enable hot reloading
    open: true, // Open the browser automatically
  },
  resolve: {
    extensions: ['*', '.js'],
  },
};