import axios from 'axios'

import { Message } from 'iview'
import router from '@/router'
import store from '@/store'

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    return {
      baseURL: this.baseUrl,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'token': ''
      }
    }
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      config.headers.token = store.state.user.token || null
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      const { data } = res
      if (data.code === 0) {
        return data.data
      } if (data.errCode === 4221) {
        router.push('/login')
        Message.error(`服务器内部错误,错误信息：${data.errMsg},错误码：${data.errCode}`)
        return Promise.reject(data)
      } else {
        Message.error(`服务器内部错误,错误信息：${data.errMsg},错误码：${data.errCode}`)
        return Promise.reject(data)
      }
    }, error => {
      console.log(error)
      this.destroy(url)
      let errorInfo = error.response
      const { data: { code, message }, status } = errorInfo
      console.log(errorInfo)
      // const { request: { statusText, status } } = JSON.parse(JSON.stringify(error))
      Message.error({
        content: `服务器内部错误,错误信息：${message},错误code：${code},错误码：${status}`,
        duration: 5
      })
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
