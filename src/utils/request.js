import axios from 'axios'
import Cookies from 'js-cookie'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { baseURL, authKey, bearer, csrfKey } from '@/utils/config'
import { getToken } from '@/utils/auth'

const csrfToken = Cookies.get('csrfToken')
if (!csrfToken) { axios.get('/') }

// create an axios instance
const service = axios.create({
  baseURL: baseURL, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    config.headers[csrfKey] = csrfToken || Cookies.get('csrfToken')
    const token = getToken()
    if (!config.url.includes('/login') && token) {
      config.headers[authKey] = `${bearer} ${token}`
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const { data } = response
    if (!data.status) {
      if (data.message.includes('token') || data.message.includes('非法')) {
        MessageBox.confirm(data.message + '，请重新登录', '重新登录', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
        return data
      }
      Message({
        message: data.message || '请求错误',
        type: 'error',
        duration: 5 * 1000
      })
    }
    return data
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
