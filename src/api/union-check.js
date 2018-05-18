import request from 'common/js/request'

/**
 * 方法前缀名：uck
 */
export default {
  /**
   * 获取审查列表
   * @param data 入参
   * @returns {Promise.<*>}
   */
  uckGetCheckList(data, loading = true) {
    const url = `/api/alliances/check-list`
    return request.get(url, data, loading)
  },
  /**
   * 获取审查详情
   * @param data 入参
   * @returns {Promise.<*>}
   */
  uckGetCheckDetail(data, loading = true) {
    const url = `/api/alliances/check-detail/${data.id}`
    return request.get(url, data, loading)
  },
  /**
   * 盟主审核操作
   * @param data 入参
   * @returns {Promise.<*>}
   */
  uckCheckApply(data, loading = true) {
    const url = `/api/alliances/check-apply`
    return request.post(url, data, loading)
  }
}
