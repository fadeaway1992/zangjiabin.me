import axios from 'axios'
import {httpUriPrefix} from '../../config/constant.js'
const Cookies = require('js-cookie')

axios.defaults.baseURL = httpUriPrefix
axios.defaults.headers.common['withCredentials'] = true
axios.interceptors.request.use(function (config) {
  const sid = Cookies.get('connect.sid')
  if (sid) {
    config.headers.Cookie = 'connect.sid=' + sid
  }
  console.log(config.headers.Cookie)
  return config
}, function (err) {
  return Promise.reject(err)
})

export { axios }
