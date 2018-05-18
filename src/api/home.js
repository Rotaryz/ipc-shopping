import request from 'common/js/request'

/**
 * 方法前缀名：home
 */

export default {
  /**
   * 联盟统计-明细
   * @param data 入参
   * @returns {Promise.<*>}
   */
  homeGetUnion(data, loading = true) {
    const url = `/api/alliances/data/leader-detail`
    return request.get(url, data, loading)
  },
  /**
   * 商家统计-明细
   * @param data 入参
   * @returns {Promise.<*>}
   */
  homeGetShop(data, loading = true) {
    const url = `/api/alliances/data/merchant-detail`
    return request.get(url, data, loading)
  },
  /**
   * 员工统计-明细
   * @param data 入参
   * @returns {Promise.<*>}
   */
  homeGetStaff(data, loading = true) {
    const url = `/api/alliances/data/employee-detail`
    return request.get(url, data, loading)
  },
  /**
   * 员工的销卡对比条数
   * @param data 入参
   * @returns {Promise.<*>}
   */
  homeGetStaffSale(data, loading = true) {
    const url = `/api/alliances/data/emploee-sale-comparison`
    return request.get(url, data, loading)
  },
  /**
   * 联盟活动公告
   * @param data 入参
   * @returns {Promise.<*>}
   */
  homeGetNotice(data, loading = true) {
    const url = `/api/alliances/data/notice`
    return request.get(url, data, loading)
  },
  /**
   * 获取全局数据
   * @param data 入参
   * @returns {Promise.<*>}
   */
  homeGetGlobalData(data, loading = true) {
    const url = `/api/alliances/data/get-global-data`
    return request.get(url, data, loading)
  },
  /**
   *  判断该员工在该商家的状态
   * @param data 入参
   * @returns {Promise.<*>}
   */
  homeCustomerStatus(data, loading = true) {
    const url = `/api/customer-status`
    return request.get(url, data, loading)
  }

}
