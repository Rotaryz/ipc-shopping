import request from 'common/js/request'
/**
 * 方法前缀名：user
 */
export default {
  /**
   * 获取用户token
   * @param data 用户授权
   * @returns {Promise.<*>}
   */
  userAuthorise(data) {
    const url = `/api/authorise`
    return request.post(url, data, true)
  }
}
