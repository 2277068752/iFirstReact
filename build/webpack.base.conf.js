const path = require('path')
const APP_PATH = path.resolve(__dirname, '../app')
const DIST_PATH = path.resolve(__dirname, '../dist')
const HTMLPlugin = require('html-webpack-plugin')
module.exports = {
  entry: {
    app: path.join(__dirname, '../app/index.js')
  }, // 入口文件
  output: {
    filename: '[name].[hash].js', // name代表entry对应的名字，hash代表整个app打包完之后根据内容加上hash，一旦整个文件内容发生变更，hash就会变化
    path: DIST_PATH, // 打包好之后的输出路径
    publicPath: ''
  }, // 编译后的输出
  module: {
    rules: [
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
      }
    ]
  },
  plugins: [
    new HTMLPlugin() // 生成一个html页面，同时在webpack编译的时候。把我们所生成的entry都注入到这个html页面中,路径都是根据我们output配置的来走的
  ]
}