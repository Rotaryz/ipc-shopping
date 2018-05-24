import request from 'common/js/request'

/**
 * 方法前缀名：umg
 */
export default {
  /**
   * 活动列表（联盟管理，商家活动池）
   * @param data 状态
   * @returns {Promise.<*>}
   */
  umgGetActiveList (data, loading = true) {
    const url = `/api/alliances/alliance-activities`
    return request.get(url, data, loading)
  },
  /**
   * 已通过审核列表排序（联盟管理，商家活动池）
   * @param data 状态
   * @returns {Promise.<*>}
   */
  umgSortList (data, loading = true) {
    const url = `/api/alliances/alliance-goods-sort`
    return request.post(url, data, loading)
  },
  /**
   * 盟主审核列表的排序列表（联盟管理，商家活动池）
   * @param data 状态
   * @returns {Promise.<*>}
   */
  umgGetCheckList (data, loading = true) {
    const url = `/api/alliances/alliance-goods-list/${data.id}`
    return request.get(url, data, loading)
  },
  /**
   * 盟主活动上架
   * @param data 状态
   * @returns {Promise.<*>}
   */
  umgActiveOnline (data, loading = true) {
    const url = `/api/alliances/online`
    return request.get(url, data, loading)
  }
}
