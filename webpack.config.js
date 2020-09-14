const path = require('path')

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.join(__dirname, './build/dist'),
    filename: 'datebook.js',
    library: 'datebook',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts']
  },
  mode: 'production'
}
