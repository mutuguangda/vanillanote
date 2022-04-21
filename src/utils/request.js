import axios from 'axios'
import NProgress from './nprogress'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_BASE_API,
  // 超时
  timeout: 10000,
  // 将请求数据转化为JSON
  transformRequest: [function (data) {
    return JSON.stringify(data)
  }],
})

service.interceptors.request.use(config => {
  NProgress.start()
  // 在最后必须 return config
  return config
})

service.interceptors.response.use(res => {
  NProgress.done()
  return res.data
})

export default service
