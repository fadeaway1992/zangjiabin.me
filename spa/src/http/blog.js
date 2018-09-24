import {axios} from './request.js'
import {POST__BLOG} from './url.js'

export function postBlog ({title, content}) {
  return axios({
    method: 'post',
    url: POST__BLOG,
    data: {
      title,
      content
    }
  })
}