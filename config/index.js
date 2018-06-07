const path = require('path')
module.exports = {
  dev: {
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    useEslint: true,
    showEslintErrorsInOverlay: false,
  },
  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),
    offlineApiUrl: 'http://localhost:8081',
    onlineApiUrl: 'http://localhost:8081',
    productionSourceMap: false
  }
}