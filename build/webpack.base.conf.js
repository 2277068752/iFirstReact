const path = require('path')
const merge = require('webpack-merge')
const DIST_PATH = path.resolve(__dirname, '../dist')
const APP_PATH = path.resolve(__dirname, '../app')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const ClearWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('../config/index.js')
// eslint校验
const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [path.resolve('src'), path.resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})
const baseWebpackConfig = {
  entry: {
    app: path.join(__dirname, '../app/index.js'),
    framework: ['react', 'react-dom'] // 非业务代码单独打包
  }, // 入口文件
  output: {
    filename: 'js/[name].[hash].js', // name代表entry对应的名字，hash代表整个app打包完之后根据内容加上hash，一旦整个文件内容发生变更，hash就会变化
    path: DIST_PATH, // 打包好之后的输出路径
    publicPath: ''
  }, // 编译后的输出
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /.jsx$/, //使用loader的目标文件。这里是.jsx
        loader: 'babel-loader'
      },
      {
        test: /\.js?$/, //使用loader的目标文件。这里是.js
        loader: 'babel-loader',
        include: APP_PATH,
        exclude: [
          path.join(__dirname, '../node_modules')  // 由于node_modules都是编译过的文件，这里我们不让babel去处理其下面的js文件
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader', // 回滚
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1 // 在css中使用@import引入其他文件
              }
            },
            { loader: 'postcss-loader' } //利用postcss-loader自动添加css前缀
          ],
          publicPath: '../' //解决css背景图的路径问题
        })
        // use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader', 'postcss-loader']
        })
        // use: ['style-loader', 'css-loader', 'less-loader'] // 编译顺序从右往左
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 20480,  //20k一下的转义为base64
            outputPath: 'images' //定义输出的图片文件夹
          }
        }]
      }
    ]
  }
}
module.exports = merge(baseWebpackConfig, {
  plugins: [
    new HTMLWebpackPlugin(), // 生成一个html页面，同时在webpack编译的时候。把我们所生成的entry都注入到这个html页面中,路径都是根据我们output配置的来走的
    new ClearWebpackPlugin(['../dist'], { allowExternal: true }), // 清理打包路径
    new ExtractTextPlugin({ filename: 'index.css' })
  ]
})