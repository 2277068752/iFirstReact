const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
const config = require('../config/index')
module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  plugins: [
    new UglifyjsWebpackPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: 1,
      minSize: 0,
      cacheGroups: {
        framework: {
          test: 'framework',
          name: 'framework',
          enforce: true
        }
      }
    }
  }
})