import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // 请求时间超过 5s 视为错误
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // 请求前处理
    if (store.getters.token) {
      // 为请求头添加 token
      config.headers['RB-Token'] = getToken()
    }
    return config
  },
  error => {
    // 错误处理
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * 如果您想获取http信息（例如标题或状态）
   * 请返回响应=> 响应
   */
  /**
   * 通过自定义代码确定请求状态
   * 这只是一个例子
   * 您也可以通过HTTP状态代码来判断状态
   */
  response => {
    const res = response.data
    // 如果自定义代码不是 1000，则将其判断为错误。
    if (res.code !== 1000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      console.log(res.code);
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 2555 || res.code === 2111 || res.code === 2444) {
        // to re-login
        MessageBox.confirm('登录信息已过期，请重新登录', '确认', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
