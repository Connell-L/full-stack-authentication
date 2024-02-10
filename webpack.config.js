const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/main.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss', '.sass', '.less', '.styl', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.woff', '.woff2', '.ttf', '.eot', '.otf']
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
  devServer: {
    port: 3000,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
  },
  devtool: 'source-map',
};
