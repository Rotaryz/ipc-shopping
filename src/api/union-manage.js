import request from 'common/js/request'

export default {
  /**
   * 活动列表（联盟管理，商家活动池）
   * @param data 状态
   * @returns {Promise.<*>}
   */
  unionManageGetActiveList(data) {
    const url = `/api/alliances/alliance-activities`
    return request.get(url, data, true)
  }
}
