const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/js/xr/src/index.js',
  output: {
    path: path.resolve(__dirname, './../../src/js/xr/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: { electron: require('electron/package.json').version }
                }
              ],
              '@babel/preset-react'
            ],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.(s[ac]ss|css)$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.glsl$/i,
        use: [
          'raw-loader'
        ],
      }
    ]
  },
  node: {
    __dirname: false,
    __filename: false
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new webpack.ProvidePlugin({
      'THREE': 'three'
    }),
    new HtmlWebpackPlugin({
      templateContent: fs.readFileSync(path.resolve(__dirname, '../../src/js/xr/src/index.html'), 'utf8')
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/fonts/thicccboi', to: 'fonts/thicccboi' }
      ]
    })
  ]
}
