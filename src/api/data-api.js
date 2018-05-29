import request from 'common/js/request'

/**
 * 方法前缀名：data
 */
export default {
  /**
   * 可分钱的金额数
   * @param data
   * @returns {Promise.<*>}
   */
  dataAllotMoney (activity_alliance_id = 1, loading = true) {
    const url = `/api/alliances/money-manage/get-share-money`
    let data = {
      activity_alliance_id
    }
    return request.get(url, data, loading)
  },
  /**
   * 商家数据-商家榜
   * @param data
   * @returns {Promise.<*>}
   */
  dataSelfShop (activity_alliance_id = 1, page, loading = true) {
    const url = `/api/alliances/data/merchant-day-report`
    let data = {
      activity_alliance_id,
      page
    }
    return request.get(url, data, loading)
  },
  /**
   * 商家数据-商家日版-总数
   * @param data
   * @returns {Promise.<*>}
   */
  dataSelfShopAllData (activity_alliance_id = 1, loading = true) {
    const url = `/api/alliances/data/merchant-day-count-report`
    let data = {
      activity_alliance_id
    }
    return request.get(url, data, loading)
  },
  /**
   * 商家数据-商家总榜
   * @param data
   * @returns {Promise.<*>}
   */
  dataAllShop (activity_alliance_id = 1, page, loading = true) {
    const url = `/api/alliances/data/merchant-report`
    let data = {
      activity_alliance_id,
      page
    }
    return request.get(url, data, loading)
  },
  /**
   * 商家数据-员工榜-店榜
   * @param data
   * @returns {Promise.<*>}
   */
  dataSelfStaff (activity_alliance_id = 1, page, loading = true) {
    const url = `/api/alliances/data/employee-merchant-report`
    let data = {
      activity_alliance_id,
      page
    }
    return request.get(url, data, loading)
  },
  /**
   * 商家数据-员工榜-总榜
   * @param data
   * @returns {Promise.<*>}
   */
  dataAllStaff (activity_alliance_id = 1, loading = true) {
    const url = `/api/alliances/data/employee-all-report`
    let data = {
      activity_alliance_id
    }
    return request.get(url, data, loading)
  },
  /**
   * 商家分钱饼状图
   * @param data
   * @returns {Promise.<*>}
   */
  dataCake (activity_alliance_id = 1, loading = true) {
    const url = `/api/alliances/data/share-money-report`
    let data = {
      activity_alliance_id
    }
    return request.get(url, data, loading)
  },
  /**
   * 商家柱状图状图
   * @param data
   * @returns {Promise.<*>}
   */
  dataBar (activity_alliance_id = 1, loading = true) {
    const url = `/api/alliances/data/verification-report`
    let data = {
      activity_alliance_id
    }
    return request.get(url, data, loading)
  }
}
