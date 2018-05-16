import request from 'common/js/request'
/**
 * 方法前缀名：mer
 */
export default {
  /**
   * 活动列表（商家活动池）
   * @param data 状态
   * @returns {Promise.<*>}
   */
  merPondActiveList(page = 1, limit = 10, status = 1) {
    const url = `/api/alliances/alliance-activities`
    let data = {
      page,
      limit,
      status
    }
    return request.get(url, data, true)
  },
  /**
   * 活动列表（商家活动列表）
   * @param data 状态
   * @returns {Promise.<*>}
   */
  merManageActiveList(data, limit) {
    const url = `/api/alliances/merchant/activities`
    return request.get(url, data, true)
  },
  /**
   * 商家报名
   * @param data 状态
   * @returns {Promise.<*>}
   */
  merManageDetails(id, data) {
    const url = `/api/alliances/alliance-activities/${id}`
    return request.get(url, data, true)
  },
  /**
   * 商家报名下单
   * @param data 状态
   * @returns {Promise.<*>}
   */
  merApplyPay(count, activity_alliance_id = 0, code) {
    const url = `/api/alliances/merchant/create-order`
    let data = {
      count,
      activity_alliance_id,
      code
    }
    return request.post(url, data, true)
  },
  /**
   * 商家报名下单
   * @param data 状态
   * @returns {Promise.<*>}
   */
  merCouponList(data) {
    const url = `/api/alliances/merchant/coupons`
    return request.get(url, data, true)
  }
}
