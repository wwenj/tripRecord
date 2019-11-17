/** 请求拦截器 */
import axios from 'axios'
import { stringify } from 'qs' // 引入qs模块，用来序列化post类型的数据
import { Toast } from 'mand-mobile' // 引入mand弹出提示
import store from '../store/index.js'
let tmpTrip = store.state.trip

if (process.env.NODE_ENV === 'development') {
  // 开发环境会访问线上接口，如需访问本地服务器，改成localhost或自己服务器ip
  axios.defaults.baseURL = 'http://39.106.8.114:3000'
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://39.106.8.114:3000'
}
axios.defaults.timeout = 10000 // 请求超时设置
axios.defaults.withCredentials = false // 表示跨域请求时是否需要使用凭证,默认否
// 添加请求拦截器
// 先导入vuex,因为我们要使用到里面的状态对象
// vuex的路径根据自己的路径去写

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断vuex中是否存在token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    // const token = store.state.token;
    // token && (config.headers.Authorization = token);
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    return config
  },
  error => {
    Toast.failed('请求过程出错')
    console.log(error)
    return Promise.error(error)
  })

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  Toast.failed('响应过程出错')
  console.log(error)
  return Promise.reject(error)
})
var request = (options) => {
  // 每次请求传入当前登录用户id
  if (tmpTrip.user) {
    if (options.body) {
      options.body.userId = tmpTrip.user.userId
    }
    if (options.params) {
      options.params.userId = tmpTrip.user.userId
    }
  }
  // 表单传值参数格式化
  return axios.request({
    url: options.url,
    method: options.method,
    data: options.body,
    params: options.params
  }).then(response => {
    return response
  }, err => {
    Toast.failed(err.messge)
    throw err
  }).catch((error) => {
    Toast.failed('请求失败')
    throw error
  })
}
// http请求方式
export const http = {}
const methods = ['get', 'post', 'put', 'delete']
methods.forEach(method => {
  http[method] = (url, params = {}) => {
    if (method === 'get') {
      return request({ url, params, method })
    }
    return request({ url, body: stringify(params), method })
  }
})

export default function plugin (Vue) {
  if (plugin.installed) {
    return
  }
  plugin.installed = true
  Object.defineProperties(Vue.prototype, {
    $http: {
      get () {
        const obj = {
          get: http['get'],
          post: http['post'],
          put: http['put'],
          delete: http['delete']
        }
        return obj
      }
    }
  })
}
