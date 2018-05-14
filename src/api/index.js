// 将所有的接口请求都通过这个统一输出
import { baseURL } from './config'
import request from 'common/js/request'
import user from './user'
import userIdConfig from 'common/js/user-id-config'

export default {
  ...baseURL,
  ...request,
  ...userIdConfig,
  ...user
}
