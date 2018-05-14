import request from 'common/js/request'

export default {
  /**
   * 获取用户token
   * @param data 用户授权
   * @returns {Promise.<*>}
   */
  userAuthorise(data) {
    const url = `/api/info/authorise`
    return request.post(url, data, true)
  }
}
