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
  uctCreateActive (data, loading = true) {
    const url = `/api/alliances/alliance-activities`
    return request.post(url, data, loading)
  },
  /**
   * 活动修改
   * @param data 入参
   * @returns {Promise.<*>}
   */
  uctUpdateActive (data, loading = true) {
    const url = `/api/alliances/alliance-activities/${data.id}`
    return request.put(url, data, loading)
  },
  /**
   * 活动修改
   * @param data 入参
   * @returns {Promise.<*>}
   */
  uctGetActive (data, loading = true) {
    const url = `/api/alliances/alliance-activities/${data.id}`
    return request.get(url, data, loading)
  }
}
