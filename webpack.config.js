const path = require('path')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const plugins = [new MinifyPlugin()]

if (process.argv.includes('--analyze')) {
  plugins.push(new BundleAnalyzerPlugin())
}

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.join(__dirname, './build/dist'),      
    filename: 'datebook.js',      
    library: 'datebook',      
    libraryTarget: 'umd'
  },
  target: 'node',
  resolve: {
    extensions: ['.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: "awesome-typescript-loader"
      },
      {
        test: /\.ts$/,
        loader: "source-map-loader"
      },
    ]
  },
  plugins,
  mode: 'production'
}