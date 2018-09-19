import {axios} from './request.js'
import {POST__LOGIN, GET__LOGIN_STATUS} from './url.js'

export function postLogin ({username, password}) {
  return axios({
    method: 'post',
    url: POST__LOGIN,
    data: {
      username,
      password
    }
  })
}

export function getLoginStatus () {
  return axios({
    url: GET__LOGIN_STATUS
  })
}
