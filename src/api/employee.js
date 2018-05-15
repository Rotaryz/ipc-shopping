import request from 'common/js/request'
/**
 * 方法前缀名：emp
 */
export default {
  /**
   * 获取待处理员工列表
   * @param data
   * @returns {Promise.<*>}
   */
  empGetEmployeeList(data) {
    const url = `/api/alliances/employee/wait-index`
    return request.get(url, data, true)
  },
  /**
   * 获取接受员工列表 accept
   * @param data
   * @returns {Promise.<*>}
   */
  empGetAcceptList(data) {
    const url = `/api/alliances/employee/employee-message`
    return request.get(url, data, true)
  },
  /**
   * 审核员工 accept
   * @param data  1为通过，2为拒绝
   * @returns {Promise.<*>}
   */
  empAuditEmployee(data) {
    const url = `api/alliances/employee/employee-message/${data.id}`
    return request.get(url, data, true)
  },
  /**
   * 删除员工 accept
   * @param data
   * @returns {Promise.<*>}
   */
  empDel(data) {
    const url = `/api/alliances/employee/employee-message/${data.id}`
    return request.get(url, data, true)
  },
  /**
   * 添加员工二维码
   * @param data
   * @returns {Promise.<*>}
   */
  empAddCode(data) {
    const url = `/api/alliances/employee/add-employee-qrcode`
    return request.get(url, data, true)
  }
}
