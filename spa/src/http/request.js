import axios from 'axios'
import {httpUriPrefix} from '../../config/constant.js'

axios.defaults.baseURL = httpUriPrefix
axios.defaults.headers.common['withCredentials'] = true
axios.interceptors.request.use(function (config) {
  if (localStorage.token) {
    config.headers.token = localStorage.token
  }
  return config
}, function (err) {
  return Promise.reject(err)
})

export { axios }
