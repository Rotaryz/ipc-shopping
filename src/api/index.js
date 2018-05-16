// 将所有的接口请求都通过这个统一输出
import user from './user'
import employee from './employee'
import UnionManage from './union-manage'
import UnionCreate from './union-create'

export default {
  ...user,
  ...employee,
  ...UnionManage,
  ...UnionCreate
}
