import request from 'common/js/request'
import wx from 'wx'
/**
 * 方法前缀名：emp
 */
export default {
  /**
   * 获取待处理员工列表
   * @param data
   * @returns {Promise.<*>}
   */
  empGetEmployeeList(data, loads) {
    const url = `/api/alliances/employee/wait-index`
    return request.get(url, data, loads)
  },
  /**
   * 获取接受员工列表 accept
   * @param data
   * @returns {Promise.<*>}
   */
  empGetAcceptList(data, loads) {
    const url = `/api/alliances/employee/employee-message`
    return request.get(url, data, loads)
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
    const url = `/api/alliances/employee/employee-message/${data.customer_id}`
    return request.delete(url, data)
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
   * 商家 / 员工 提现
   * @param data
   * @returns {Promise.<*>}
   */
  empSetWithdraw(data) {
    let type = wx.getStorageSync('userType')
    if (type !== 'customer') {
      type = 'merchant'
    }
    const url = `/api/alliances/employee/${type}-withdrawal`
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
  },
  /**
   * 商家 / 员工收入详情
   * @param  employee, merchant
   * @returns {Promise.<*>}
   */
  empAssetDetails(data) {
    let type = wx.getStorageSync('userType')
    if (type === 'customer') {
      type = 'employee'
    } else {
      type = 'merchant'
    }
    const url = `/api/alliances/money-manage/${type}-detail`
    return request.get(url)
  },
  /**
   * 商家 / 员工收入列表
   * @param employee, merchant
   * @returns {Promise.<*>}
   */
  empAssetList(data) {
    let type = wx.getStorageSync('userType')
    if (type === 'customer') {
      type = 'employee'
    } else {
      type = 'merchant'
    }
    const url = `/api/alliances/money-manage/${type}-log`
    return request.get(url, data)
  }
}
