// 将所有的接口请求都通过这个统一输出
import user from './user'
import employee from './employee'
import UnionManage from './union-manage'
import MerchantActivity from './merchant-activity'
export default {
  ...user,
  ...employee,
  ...UnionManage,
  ...MerchantActivity
}
