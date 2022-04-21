const path = require('path')
const name = 'N' // 标题
const port = process.env.port || process.env.npm_config_port || 2333 // 端口

module.exports = {
  chainWebpack: config => {
    config
      // 修改HtmlWebpackPlugin输出的titile
      .plugin('html')
      .tap(args => {
        args[0].title = name
        return args
      })
  },
  devServer: {
    host: '0.0.0.0',
    port: port,
    open: true, 
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      '/dev-api': {
        target: `http://localhost/api/blog`,
        ws: true, // 代理webscoket
        changeOrigin: true,
        pathRewrite: {
          ['^' + '/dev-api' ]: ''
        }
      }
      // [process.env.VUE_APP_BASE_API]: {
      //   target: `http://localhost/api/blog`,
      //   ws: true, // 代理webscoket
      //   changeOrigin: true,
      //   pathRewrite: {
      //     ['^' + process.env.VUE_APP_BASE_API]: ''
      //   }
      // }
    },
    disableHostCheck: true
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        'D:\\content\\p\\vanillanote-test\\src\\assets\\styles\\*.less',
      ]
    }
  }
}
