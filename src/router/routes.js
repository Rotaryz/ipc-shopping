module.exports = [
  {
    path: '/pages/loading/loading', // loading
    name: 'Loading',
    config: {
      navigationBarBackgroundColor: '#FFFFFF',
      navigationBarTextStyle: 'black'
    }
  },
  {
    path: '/pages/home/home', // 首页
    name: 'Home',
    config: {}
  },
  {
    path: '/pages/employee/employee', // 员工
    name: 'Employee',
    config: {
      navigationBarTitleText: '员工管理'
    }
  },
  {
    path: '/pages/example/example',
    name: 'Example',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: '示例'
    }
  }
]
