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
  empGetEmployeeList() {
    const url = `/api/alliances/employee/wait-index`
    return request.get(url)
  },
  /**
   * 获取接受员工列表 accept
   * @param data
   * @returns {Promise.<*>}
   */
  empGetAcceptList(data) {
    const url = `/api/alliances/employee/employee-message`
    return request.get(url, data)
  },
  /**
   * 审核员工 accept
   * @param data  1为通过，2为拒绝
   * @returns {Promise.<*>}
   */
  empAuditEmployee(data) {
    const url = `api/alliances/employee/employee-message/${data.id}`
    return request.put(url, data)
  },
  /**
   * 删除员工 accept
   * @param data
   * @returns {Promise.<*>}
   */
  empDel(data) {
    const url = `/api/alliances/employee/employee-message/${data.id}`
    return request.get(url, data)
  },
  /**
   * 添加员工二维码
   * @param data
   * @returns {Promise.<*>}
   */
  empAddCode(data) {
    const url = `/api/alliances/employee/add-employee-qrcode`
    return request.get(url, data, true)
  },
  /**
   * 提现查询
   * @param data
   * @returns {Promise.<*>}
   */
  empGetWithdraw() {
    const url = `/api/alliances/employee/withdrawal-info`
    return request.get(url)
  },
  /**
   * 商家提现
   * @param data
   * @returns {Promise.<*>}
   */
  empSetWithdrawShop(data) {
    const url = `/api/alliances/employee/merchant-withdrawal`
    return request.get(url, data)
  },
  /**
   * 员工提现
   * @param data
   * @returns {Promise.<*>}
   */
  empSetWithdraw(data) {
    const url = `/api/alliances/employee/customer-withdrawal`
    return request.get(url, data)
  },
  /**
   * 银行列表
   * @param data
   * @returns {Promise.<*>}
   */
  empBankList() {
    const url = `/api/alliances/employee/bank-card`
    return request.get(url)
  },
  /**
   * 添加银行卡
   * @param data
   * @returns {Promise.<*>}
   */
  empAddBank(data) {
    const url = `/api/alliances/employee/bank-cards`
    return request.post(url, data)
  },
  /**
   * 编辑银行卡
   * @param data
   * @returns {Promise.<*>}
   */
  empEditBank(data) {
    const url = `/api/alliances/employee/bank-cards/${data.id}`
    return request.put(url, data)
  }
}
