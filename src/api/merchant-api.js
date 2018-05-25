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
  merPondActiveList(page = 1, limit = 10, status = 1, exclude_has_apply = 1) {
    const url = `/api/alliances/alliance-activities`
    let data = {
      page,
      limit,
      status,
      exclude_has_apply
    }
    return request.get(url, data, true)
  },
  /**
   * 活动列表（商家活动列表）
   * @param data 状态
   * @returns {Promise.<*>}
   */
  merManageActiveList(data, loading = true) {
    const url = `/api/alliances/merchant/activities`
    return request.get(url, data, loading)
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
   * 商家优惠卷
   * @param data 状态
   * @returns {Promise.<*>}
   */
  merCouponList(data) {
    const url = `/api/alliances/merchant/coupons`
    return request.get(url, data, true)
  },
  /**
   * 商家优惠卷详情
   * @param data 状态
   * @returns {Promise.<*>}
   */
  merCouponDetails(id, data) {
    const url = `/api/coupons/promotions/${id}`
    return request.get(url, data, true)
  },
  /**
   * 商家报名提交和修改优惠卷
   * @param data 状态
   * @returns {Promise.<*>}
   */
  merAddCoupon(data) {
    const url = `/api/alliances/merchant/addcoupons`
    return request.post(url, data, true)
  },
  /**
   * 商家报名申请排队
   * @param data 状态
   * @returns {Promise.<*>}
   */
  merQueueUp(apply_id = 0) {
    let data = {
      apply_id
    }
    const url = `/api/alliances/merchant/queue-up`
    return request.post(url, data, true)
  },
  /**
   * 商家报名申请退款
   * @param data 状态
   * @returns {Promise.<*>}
   */
  merRefund(apply_id = 0) {
    let data = {
      apply_id
    }
    const url = `/api/alliances/merchant/refund`
    return request.post(url, data, true)
  },
  /**
   * 员工活动列表
   * @param data 状态
   * @returns {Promise.<*>}
   */
  merStaffList(data, loading = true) {
    const url = `/api/alliances/employees/activities`
    return request.get(url, data, loading)
  },
  /**
   * 员工活动二维码
   * @param data 状态
   * @returns {Promise.<*>}
   */
  merStaffActiveQrcode(id, data) {
    const url = `/api/alliances/employee/activity-qrcode/${id}`
    return request.get(url, data, true)
  },
  /**
     * 分销卡列表
   * @param data 状态
   * @returns {Promise.<*>}
   */
  merAllotList(data) {
    const url = `/api/alliances/allot-list`
    return request.get(url, data, true)
  },
  /**
     * 商家分配卡活动详情
   * @param data 状态
   * @returns {Promise.<*>}
   */
  merAllotDetail(id, data) {
    const url = `/api/alliances/merchant/activities/${id}`
    return request.get(url, data, true)
  },
  /**
   * 分销卡列表调整
   * @param data 状态
   * @returns {Promise.<*>}
   */
  merAllotStock(activity_alliance_id = 1, customer_id = 1, allot_count = 1, shop_id = 0) {
    let data = {
      activity_alliance_id,
      customer_id,
      allot_count,
      shop_id
    }
    const url = `/api/alliances/allot-stock`
    return request.post(url, data, true)
  },
  /**
   * 商家取消支付关闭报名订单
   * @param data 状态
   * @returns {Promise.<*>}
   */
  merCloseOrder(id, data) {
    const url = `/api/alliances/merchant/close-order/${id}`
    return request.get(url, data, true)
  },
  /**
   * 异业活动详情
   * @param data 状态
   * @returns {Promise.<*>}
   */
  merLinkDetails(id) {
    const url = `/api/alliances/shop-promotion/${id}`
    return request.get(url)
  },
  /**
   * 异业活动优惠券详情
   * @param data 状态
   * @returns {Promise.<*>}
   */
  merLinkCouponDetails(id) {
    const url = `/api/alliances/approved/${id}`
    return request.get(url)
  }
}
