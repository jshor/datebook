const BabiliPlugin = require("babili-webpack-plugin")
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'datebook.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new BabiliPlugin()
  ],
  mode: 'development',
  devtool: 'eval-source-map'
}