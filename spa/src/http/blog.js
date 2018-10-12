import {axios} from './request.js'
import {POST__BLOG, GET__BLOG, GET__BLOG_DETAIL__FUNC, PUT__BLOG_DETAIL__FUNC, GET__BLOG_INDEX} from './url.js'

export function postBlog ({title, content, labels}) {
  return axios({
    method: 'post',
    url: POST__BLOG,
    data: {
      title,
      content,
      labels
    }
  })
}

export function getBlogs ({page}) {
  return axios({
    url: GET__BLOG,
    params: {
      page
    }
  })
}

export function updateOneBlog ({postId, title, content}) {
  return axios({
    method: 'put',
    url: PUT__BLOG_DETAIL__FUNC(postId),
    data: {
      title,
      body: content
    }
  })
}

export function getBlogDetail ({postId}) {
  return axios({
    url: GET__BLOG_DETAIL__FUNC(postId)
  })
}

export function getBlogIndex ({page}) {
  return axios({
    url: GET__BLOG_INDEX,
    params: {
      page
    }
  })
}