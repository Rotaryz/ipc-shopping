import request from 'common/js/request'

/**
 * 方法前缀名：uct
 */
export default {
  /**
   * 活动新建
   * @param data 入参
   * @returns {Promise.<*>}
   */
  uctCreateActive(data, loading = true) {
    const url = `/api/alliances/alliance-activities`
    return request.post(url, data, loading)
  }
}
