/*eslint-disable*/

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/script.js', // Entry point for the application
  },
  // devtool: 'inline-source-map',
  devServer: {
    static: './dist', // Serve static files from the 'dist' directory
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Use the index.html file as a template
    }),
  ],
  output: {
    filename: '[name].bundle.js', // Use the entry point name for the bundle filename
    path: path.resolve(__dirname, 'dist'), // Output to the 'dist' directory
    clean: true, // Clean the output directory before building
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'], // Process CSS files with 'style-loader' and 'css-loader'
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource', // Process image files as assets
      },
    ],
  },
};
