import request from 'common/js/request'

/**
 * 方法前缀名：uck
 */
export default {
  /**
   * 活动新建
   * @param data 入参
   * @returns {Promise.<*>}
   */
  uckGetCheckList(data, loading = true) {
    const url = `/api/alliances/check-list`
    return request.get(url, data, loading)
  }
}
