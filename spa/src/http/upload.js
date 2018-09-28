import {axios} from './request.js'
import {POST__UPLOAD_IMAGES} from './url.js'

export const uploadImages = function (formData) {
  return axios({
    method: 'post',
    url: POST__UPLOAD_IMAGES,
    headers: {'Content-Type': 'multipart/form-data'},
    data: formData
  })
}