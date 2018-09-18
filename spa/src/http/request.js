import axios from 'axios'
import {httpUriPrefix} from '../../config/constant.js'

axios.defaults.baseURL = httpUriPrefix


export { axios }
