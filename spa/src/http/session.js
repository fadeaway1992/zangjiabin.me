import {axios} from './request.js'
import {POST__LOGIN} from './url.js'

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
