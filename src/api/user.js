import API from 'api'

export default {
  /**
   * 获取用户token
   * @param data 用户授权
   * @returns {Promise.<*>}
   */
  userAuthorise(data) {
    const url = `${API.api}/api/info/authorise`
    return API.post(url, data, true)
  }
}
