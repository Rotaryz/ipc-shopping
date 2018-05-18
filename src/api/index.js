// 将所有的接口请求都通过这个统一输出
import user from './user'
import employee from './employee'
import UnionManage from './union-manage'
import MerchantActivity from './merchant-api'
import UnionCreate from './union-create'
import UnionCheck from './union-check'
import dataApi from './data-api'

export default {
  ...user,
  ...employee,
  ...UnionManage,
  ...MerchantActivity,
  ...UnionCreate,
  ...UnionCreate,
  ...UnionCheck,
  ...dataApi
}
