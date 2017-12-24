const path = require('path')
const { environment } = require('@rails/webpacker')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const postcssConfigPath = path.resolve(process.cwd(), '.postcssrc.yml')

environment.loaders.insert('stylesdd', {
  rules: [{
    test: /\.(scss|sass)$/i,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        'css-loader',
        {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: postcssConfigPath } }
        },
        {
          loader: 'sass-loader?sourceMap'
        }
      ]
    }),
    exclude: [/flexboxgrid/, /react-toolbox/]
  }, {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[local]--[hash:base64:5]'
          }
        },
        {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: postcssConfigPath } }
        }
      ]
    }),
    include: [/flexboxgrid/, /react-toolbox/]
  }]
}, { before: 'css' })

module.exports = environment
